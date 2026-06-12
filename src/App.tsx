import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Home from "./components/Home";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";
import Splash from "./components/Splash";
import Ferrofluid from "./components/Ferrofluid";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Store } from "./store";
import Lenis from "lenis";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash || "#home";
    if (hash === "#home" || hash === "#") return { tab: "home", projectId: "" };
    if (hash === "#about") return { tab: "about", projectId: "" };
    if (hash === "#contact") return { tab: "contact", projectId: "" };
    if (hash === "#work") return { tab: "work", projectId: "" };
    if (hash.startsWith("#project/")) return { tab: "project", projectId: hash.substring(9) };
    return { tab: "home", projectId: "" };
  });

  // Pre-load work projects immediately so that they are loaded on any page
  useEffect(() => {
    Store.getProjects().catch((err) => {
      console.warn("Could not pre-load projects:", err);
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";
      if (hash === "#home" || hash === "#") {
        setRoute({ tab: "home", projectId: "" });
      } else if (hash === "#work") {
        setRoute({ tab: "work", projectId: "" });
      } else if (hash === "#about") {
        setRoute({ tab: "about", projectId: "" });
      } else if (hash === "#contact") {
        setRoute({ tab: "contact", projectId: "" });
      } else if (hash.startsWith("#project/")) {
        setRoute({ tab: "project", projectId: hash.substring(9) });
      } else {
        setRoute({ tab: "home", projectId: "" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Sync hash initially if empty
    if (!window.location.hash) {
      window.location.hash = "#home";
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToRoute = (targetHash: string) => {
    window.location.hash = targetHash;
  };

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis for liquid-smooth momentum navigation physics
    const lenis = new Lenis({
      duration: 1.3, // Weighted luxury deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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

  // Sync scroll to top instantly on page transitions, then resize Lenis to new layout heights
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      document.documentElement.style.setProperty("--scroll-progress", "0");
      
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
      }, 350); // slight offset allowing transitions to finish mounting
      return () => clearTimeout(timer);
    }
  }, [route]);

  return (
    <div 
      className="min-h-screen text-[#ECE6F4] relative flex flex-col overflow-x-hidden pb-16 selection:bg-purple-500/30 selection:text-[#ECE6F4]"
      style={{
        backgroundColor: "#0A0010",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <AnimatePresence>
        {showSplash && (
          <Splash key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen relative flex flex-col w-full">
            {/* Structural background elements: Global dynamic grid backplane - only for Home page */}
            {route.tab === "home" && (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(123,47,190,0.15),rgba(10,0,16,0))] pointer-events-none -z-20" />
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.015] -z-20" 
                  style={{
                    backgroundImage: `radial-gradient(#ECE6F4 1px, transparent 1px)`,
                    backgroundSize: "24px 24px"
                  }}
                />
              </>
            )}

            {/* Custom Ferrofluid interactive background shader for inner subpages */}
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                position: 'absolute', 
                overflow: 'hidden', 
                pointerEvents: 'none', 
                zIndex: 0,
                opacity: route.tab !== "home" ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <Ferrofluid
                colors={['#8B5CF6', '#C084FC', '#F3E8FF']}
                speed={0.5}
                scale={1.6}
                turbulence={1}
                fluidity={0.1}
                rimWidth={0.2}
                sharpness={2.5}
                shimmer={1.35}
                glow={2}
                flowDirection="down"
                opacity={1}
                mouseInteraction
                mouseStrength={1}
                mouseRadius={0.35}
                paused={route.tab === "home"}
              />
            </div>

            {/* Render header if not in deep full project screen or keep it global */}
            <Header currentTab={route.tab} onNavigate={navigateToRoute} showSplash={showSplash} />

            {/* Primary content router with smooth 3D book page-flip transitions for pages and luxurious zoom-in for project details */}
            <div 
              className="flex-grow relative z-10 w-full" 
              style={
                route.tab !== "project" 
                  ? { perspective: "2500px", transformStyle: "preserve-3d" } 
                  : undefined
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${route.tab}-${route.projectId}`}
                  initial={
                    route.tab === "project"
                      ? { opacity: 0, scale: 0.5, rotateY: 0, x: 0 }
                      : { opacity: 0, rotateY: 12, x: 25, scale: 0.98 }
                  }
                  animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                  exit={
                    route.tab === "project"
                      ? { opacity: 0, scale: 0.5, rotateY: 0, x: 0 }
                      : { opacity: 0, rotateY: -12, x: -25, scale: 0.98 }
                  }
                  transition={
                    route.tab === "project"
                      ? {
                          duration: 0.75,
                          ease: [0.16, 1, 0.3, 1] // Immersive high-end cinematic ease
                        }
                      : {
                          duration: 0.75,
                          ease: [0.16, 1, 0.3, 1], // Exquisite custom liquid-smooth ease-out
                          rotateY: { type: "spring", stiffness: 50, damping: 16 } // Soft, weighted book cover inertia
                        }
                  }
                  style={
                    route.tab === "project"
                      ? {
                          transformOrigin: "center center"
                        }
                      : {
                          transformOrigin: "center center",
                          backfaceVisibility: "hidden",
                          transformStyle: "preserve-3d",
                        }
                  }
                  className="w-full h-full"
                >
                  {route.tab === "home" && <Home onNavigate={navigateToRoute} showSplash={showSplash} />}
                  {route.tab === "work" && <Work onNavigate={navigateToRoute} />}
                  {route.tab === "about" && <About />}
                  {route.tab === "contact" && <Contact />}
                  {route.tab === "project" && (
                    <ProjectDetail projectId={route.projectId} onNavigate={navigateToRoute} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fixed to Bottom of Page layout-friendly Premium Footer */}
            <footer 
              className="fixed bottom-0 left-0 right-0 z-40 py-4 backdrop-blur-md border-t text-xs relative"
              style={{
                borderColor: "rgba(123, 47, 190, 0.15)",
                backgroundColor: "rgba(10, 0, 16, 0.85)"
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6B4F8A]">
                
                {/* Left Column: Social Media Trigger Icons */}
                <div className="flex items-center space-x-6">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-[#E8D5F5] transition-colors duration-200"
                    aria-label="X (Twitter)"
                  >
                    <Twitter size={15} />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-[#E8D5F5] transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={15} />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-[#E8D5F5] transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram size={15} />
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-[#E8D5F5] transition-colors duration-200"
                    aria-label="YouTube"
                  >
                    <Youtube size={15} />
                  </a>
                </div>

                {/* Right Column: Copyright and policy channels */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="font-mono text-[10px] tracking-wider uppercase">
                    © {new Date().getFullYear()} Baldwin Portfolio. MIT
                  </div>
                  <span className="text-[#6B4F8A]/30 hidden sm:inline">•</span>
                  <div className="flex space-x-3 text-[10px] font-mono tracking-wider uppercase">
                    <span className="hover:text-[#E8D5F5] transition-colors cursor-pointer">Privacy</span>
                    <span>/</span>
                    <span className="hover:text-[#E8D5F5] transition-colors cursor-pointer">Terms</span>
                  </div>
                </div>

              </div>
            </footer>
      </div>
    </div>
  );
}

