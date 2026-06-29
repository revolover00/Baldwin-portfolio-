import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "./components/Header";
import Home from "./components/Home";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";
import Splash from "./components/Splash";
import Ferrofluid from "./components/Ferrofluid";
import FloatingTechIcons from "./components/FloatingTechIcons";
import CustomCursor from "./components/CustomCursor";
import SEO from "./components/SEO";
import { Store } from "./store";
import Lenis from "lenis";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash || "#home";
    if (hash.startsWith("#project/")) return { tab: "project", projectId: hash.substring(9) };
    return { tab: "home", projectId: "" };
  });

  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash || "#home";
    if (hash.startsWith("#project/")) return "work";
    return hash.replace("#", "") || "home";
  });
  const lenisRef = useRef<Lenis | null>(null);
  const isProgrammaticScrollRef = useRef<string | null>(null);

  // Pre-load work projects immediately so that they are loaded on any page
  useEffect(() => {
    Store.getProjects().catch((err) => {
      if (import.meta.env.DEV) {
        console.warn("Could not pre-load projects:", err);
      }
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";
      if (hash.startsWith("#project/")) {
        setRoute({ tab: "project", projectId: hash.substring(9) });
      } else {
        const tabName = hash.replace("#", "") || "home";
        if (route.tab === "project") {
          setRoute({ tab: "home", projectId: "" });
        }
        setActiveTab(tabName);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    if (!window.location.hash) {
      window.location.hash = "#home";
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [route.tab]);

  const navigateToRoute = (targetHash: string) => {
    if (targetHash.startsWith("#project/")) {
      const pId = targetHash.substring(9);
      setRoute({ tab: "project", projectId: pId });
      window.location.hash = targetHash;
      isProgrammaticScrollRef.current = null; // reset lock
      return;
    }

    const tab = targetHash.replace("#", "") || "home";
    setActiveTab(tab);
    isProgrammaticScrollRef.current = tab; // lock interactions
    
    if (route.tab === "project") {
      setRoute({ tab: "home", projectId: "" });
    }
    
    window.location.hash = targetHash;

    const startTime = Date.now();
    const tryScroll = () => {
      const element = document.getElementById(tab);
      if (element) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(element, {
            duration: 1.2,
            offset: -80,
            immediate: false,
            onComplete: () => {
              if (isProgrammaticScrollRef.current === tab) {
                isProgrammaticScrollRef.current = null;
              }
            }
          });
        } else {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          if (isProgrammaticScrollRef.current === tab) {
            isProgrammaticScrollRef.current = null;
          }
        }
      } else if (Date.now() - startTime < 2000) {
        requestAnimationFrame(tryScroll);
      } else {
        if (isProgrammaticScrollRef.current === tab) {
          isProgrammaticScrollRef.current = null;
        }
      }
    };

    setTimeout(tryScroll, 30);
  };

  useEffect(() => {
    // Instantiate Lenis for liquid-smooth momentum navigation physics
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1.0 : 1.0, 
      touchMultiplier: isMobile ? 1.5 : 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Reset scroll progress CSS variable
    document.documentElement.style.setProperty("--scroll-progress", "0");

    lenis.on("scroll", (e) => {
      // Map progress smoothly into CSS custom property for render-free 120fps progress monitoring
      document.documentElement.style.setProperty("--scroll-progress", `${e.progress}`);
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
    };
  }, []);

  // Sync scroll to top or target hash on mount
  useEffect(() => {
    if (showSplash) return;

    if (route.tab === "project") {
      isProgrammaticScrollRef.current = null;
      // Scroll directly to absolute top (0)
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      // Reinforce top positioning after intermediate transition frame layout calculation
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }, 80);
      return () => clearTimeout(timer);
    } else {
      const initialHash = window.location.hash.replace("#", "");
      if (initialHash && ["home", "work", "about", "quote"].includes(initialHash)) {
        if (isProgrammaticScrollRef.current) {
          return;
        }
        isProgrammaticScrollRef.current = initialHash;
        const startTime = Date.now();
        const trySyncScroll = () => {
          const el = document.getElementById(initialHash);
          if (el) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el, { duration: 0.1, offset: -80, immediate: true });
              setTimeout(() => {
                isProgrammaticScrollRef.current = null;
              }, 150);
            } else {
              const yOffset = -80;
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y });
              isProgrammaticScrollRef.current = null;
            }
          } else if (Date.now() - startTime < 2000) {
            requestAnimationFrame(trySyncScroll);
          } else {
            isProgrammaticScrollRef.current = null;
          }
        };
        // Launch after minor initial delay
        const timer = setTimeout(trySyncScroll, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [showSplash, route.tab, route.projectId]);

  // Viewport Intersection Observer to highlight Header nav dynamically during scrolling
  useEffect(() => {
    if (route.tab === "project") return;

    const sections = ["home", "work", "about", "quote"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -40% 0px", // Trigger when center focus passes
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Ignore scroll viewport intersections if we are undergoing a programmatic navigation scroll
      if (isProgrammaticScrollRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveTab(sectionId);
          window.history.replaceState(null, "", `#${sectionId}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const timer = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [route.tab]);

  return (
    <div 
      className="min-h-screen text-[#ECE6F4] relative flex flex-col overflow-x-hidden pb-16 selection:bg-[#CC00FF]/20 selection:text-white"
      style={{
        backgroundColor: "#06010A",
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
    >
      <SEO />
      <AnimatePresence>
        {showSplash && (
          <Splash key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen relative flex flex-col w-full">
        {/* Global Particle Noise Overlay */}
        <svg className="pointer-events-none fixed isolate z-[99999] opacity-[0.03] mix-blend-overlay w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <CustomCursor />

            {/* Sophisticated, muted radial background glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(140,90,250,0.08),transparent)] pointer-events-none -z-20" />
            <div className="absolute top-[80vh] right-0 w-[60vw] h-[60vh] bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.03),transparent_70%)] pointer-events-none -z-20" />

            {/* Subtle global grid lines overlay for depth */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.008] -z-20 animate-fade-in" 
              style={{
                backgroundImage: `radial-gradient(#ECE6F4 1px, transparent 1px)`,
                backgroundSize: "32px 32px"
              }}
            />

            {/* Custom Ferrofluid interactive background shader */}
            <div 
              style={{ 
                width: '105vw', 
                height: '105vh', 
                position: 'fixed', 
                top: '-2vh',
                left: '-2vw',
                overflow: 'hidden', 
                zIndex: 0,
                opacity: route.tab === "project" ? 0.85 : 0.70,
                pointerEvents: 'none',
                transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              {!shouldReduceMotion && (
                <Ferrofluid
                  colors={['#8B5CF6', '#C084FC', '#F3E8FF']}
                  speed={0.4}
                  scale={1.5}
                  turbulence={0.9}
                  fluidity={0.12}
                  rimWidth={0.25}
                  sharpness={2.2}
                  shimmer={1.2}
                  glow={1.8}
                  flowDirection="down"
                  opacity={1}
                  mouseInteraction
                  mouseStrength={1}
                  mouseRadius={0.35}
                  paused={showSplash}
                />
              )}
            </div>

            {/* Ambient floating tech-stack logos */}
            <FloatingTechIcons />

            {/* Render header targeting the dynamically monitored active tab */}
            <Header 
              currentTab={route.tab === "project" ? "work" : activeTab} 
              onNavigate={navigateToRoute} 
              showSplash={showSplash} 
            />

            {/* Primary Content Container */}
            <div className="flex-grow relative z-10 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${route.tab}-${route.projectId}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut"
                  }}
                  className="w-full h-full"
                >
                  {route.tab !== "project" ? (
                    <div className="flex flex-col w-full relative">
                      <Home onNavigate={navigateToRoute} showSplash={showSplash} />
                      
                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                      </div>

                      <Work onNavigate={navigateToRoute} />

                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                      </div>

                      <About />

                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                      </div>

                      <Testimonials />

                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                      </div>

                      <Contact />
                    </div>
                  ) : (
                    <ProjectDetail projectId={route.projectId} onNavigate={navigateToRoute} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>


      </div>
    </div>
  );
}

