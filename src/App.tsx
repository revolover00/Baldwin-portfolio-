import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Header from "./components/Header";
import Home from "./components/Home";
import Work from "./components/Work";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";
import Splash from "./components/Splash";
import Ferrofluid from "./components/Ferrofluid";
import CustomCursor from "./components/CustomCursor";
import { Twitter, Linkedin, Youtube, Github } from "lucide-react";
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

  // Pre-load work projects immediately so that they are loaded on any page
  useEffect(() => {
    Store.getProjects().catch((err) => {
      console.warn("Could not pre-load projects:", err);
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
      return;
    }

    const tab = targetHash.replace("#", "") || "home";
    
    if (route.tab === "project") {
      setRoute({ tab: "home", projectId: "" });
      window.location.hash = targetHash;
      
      setTimeout(() => {
        const element = document.getElementById(tab);
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element, {
            duration: 1.4,
            offset: -80,
          });
        }
      }, 150);
    } else {
      window.location.hash = targetHash;
      const element = document.getElementById(tab);
      if (element && lenisRef.current) {
        lenisRef.current.scrollTo(element, {
          duration: 1.4,
          offset: -80,
        });
      }
    }
  };

  useEffect(() => {
    // Instantiate Lenis for liquid-smooth momentum navigation physics
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.3, // Faster on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1.0, // Subtler on touch
      touchMultiplier: isMobile ? 1.4 : 1.5,
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
    if (!showSplash && route.tab !== "project") {
      const initialHash = window.location.hash.replace("#", "");
      if (initialHash && ["home", "work", "about", "quote"].includes(initialHash)) {
        const timer = setTimeout(() => {
          const el = document.getElementById(initialHash);
          if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el, { duration: 0.1, offset: -80, immediate: true });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [showSplash, route.tab]);

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
                width: '100%', 
                height: '100%', 
                position: 'absolute', 
                overflow: 'hidden', 
                zIndex: 0,
                opacity: route.tab === "project" ? 0.85 : 0.25,
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
                  initial={
                    route.tab === "project"
                      ? { opacity: 0, scale: 0.95 }
                      : { opacity: 0 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    route.tab === "project"
                      ? { opacity: 0, scale: 0.95 }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-full h-full"
                >
                  {route.tab !== "project" ? (
                    <div className="flex flex-col w-full relative">
                      <Home onNavigate={navigateToRoute} showSplash={showSplash} />
                      
                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC00FF]/40 blur-[1px] animate-pulse" />
                      </div>

                      <Work onNavigate={navigateToRoute} />

                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC00FF]/40 blur-[1px] animate-pulse" />
                      </div>

                      <Process />

                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC00FF]/40 blur-[1px] animate-pulse" />
                      </div>

                      <About />

                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC00FF]/40 blur-[1px] animate-pulse" />
                      </div>

                      <Testimonials />

                      {/* Atmospheric separator */}
                      <div className="w-full h-24 sm:h-32 relative flex items-center justify-center pointer-events-none opacity-60">
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#7B2FBE]/30 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC00FF]/40 blur-[1px] animate-pulse" />
                      </div>

                      <Contact />
                    </div>
                  ) : (
                    <ProjectDetail projectId={route.projectId} onNavigate={navigateToRoute} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fixed to Bottom Premium Footer */}
            <footer 
              className="py-8 border-t text-xs relative z-40"
              style={{
                borderColor: "rgba(123, 47, 190, 0.12)",
                backgroundColor: "rgba(6, 1, 10, 0.9)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)"
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6">
                
                {/* Logo Section - Large, clear and suitable */}
                <div 
                  onClick={() => navigateToRoute("#home")}
                  className="flex flex-col items-center space-y-4 group cursor-pointer select-none py-4"
                >
                  <div className="h-28 sm:h-36 md:h-40 flex items-center justify-center">
                    <img 
                      src="/logo.webp" 
                      alt="Baldwin Portfolio Logo" 
                      className="h-28 sm:h-36 md:h-40 w-auto object-contain transition-all duration-300 group-hover:scale-[1.04] filter drop-shadow-[0_0_30px_rgba(204,0,255,0.25)]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.getElementById("footer-logo-fallback");
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    {/* Fallback typography with glowing text */}
                    <div 
                      id="footer-logo-fallback" 
                      className="hidden flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 md:gap-5"
                    >
                      <span className="text-5xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-wider text-[#CC00FF] [text-shadow:0_0_30px_rgba(204,0,255,0.7)]">
                        B
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display tracking-[0.4em] sm:tracking-[0.5em] text-[#E8D5F5] uppercase">
                        BALDWIN
                      </span>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#A78BCA]/50 font-mono text-center">
                    Creative Developer & Architect
                  </span>
                </div>

                {/* Separator line */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#CC00FF]/10 to-transparent my-1" />

                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 text-[#A78BCA]/60">
                  {/* Left Column: Social Links */}
                  <div className="flex items-center space-x-3">
                    <a 
                      href="https://github.com/revolover00/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2.5 rounded-lg border border-transparent hover:border-[#CC00FF]/30 hover:bg-[#CC00FF]/10 text-[#A78BCA]/80 hover:text-white transition-all duration-300 pointer-events-auto"
                      aria-label="GitHub"
                    >
                      <Github size={16} />
                    </a>
                    <a 
                      href="https://x.com/revo_codes" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2.5 rounded-lg border border-transparent hover:border-[#CC00FF]/30 hover:bg-[#CC00FF]/10 text-[#A78BCA]/80 hover:text-white transition-all duration-300 pointer-events-auto"
                      aria-label="X (Twitter)"
                    >
                      <Twitter size={16} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/revo-code-6181283b5" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2.5 rounded-lg border border-transparent hover:border-[#CC00FF]/30 hover:bg-[#CC00FF]/10 text-[#A78BCA]/80 hover:text-white transition-all duration-300 pointer-events-auto"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a 
                      href="https://www.youtube.com/@Revo-code" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2.5 rounded-lg border border-transparent hover:border-[#CC00FF]/30 hover:bg-[#CC00FF]/10 text-[#A78BCA]/80 hover:text-white transition-all duration-300 pointer-events-auto"
                      aria-label="YouTube"
                    >
                      <Youtube size={16} />
                    </a>
                  </div>

                  {/* Right Column: Copyright */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-[#A78BCA]/60">
                      © {new Date().getFullYear()} Baldwin Portfolio. All rights reserved.
                    </div>
                    <span className="text-[#A78BCA]/20 hidden sm:inline">•</span>
                    <div className="flex space-x-3 text-[10px] font-mono tracking-wider uppercase text-[#A78BCA]/45">
                      <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                      <span>/</span>
                      <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                    </div>
                  </div>
                </div>

              </div>
            </footer>
      </div>
    </div>
  );
}

