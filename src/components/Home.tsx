import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, MessageSquare, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

interface HomeProps {
  onNavigate: (route: string) => void;
  showSplash?: boolean;
}

interface Snippet {
  id: number;
  text: string;
  x: number; // percentage left (e.g. 10 to 90)
  duration: number; // seconds
  delay: number; // seconds
  fontSize: number; // px
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
}

export default function Home({ onNavigate, showSplash }: HomeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  // Programmatic autoplay attempt for highest iframe and mobile compatibility
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force loading and playing explicitly with guaranteed muted state
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      
      const playVideo = () => {
        video.play().catch((err) => {
          console.warn("Autoplay was blocked or deferred:", err);
        });
      };

      // Play immediately
      playVideo();

      // Listeners for any interaction to override autoplay restrictions
      const resumePlay = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        document.removeEventListener("click", resumePlay);
        document.removeEventListener("touchstart", resumePlay);
        document.removeEventListener("keydown", resumePlay);
        document.removeEventListener("scroll", resumePlay);
      };

      document.addEventListener("click", resumePlay);
      document.addEventListener("touchstart", resumePlay);
      document.addEventListener("keydown", resumePlay);
      document.addEventListener("scroll", resumePlay);

      return () => {
        document.removeEventListener("click", resumePlay);
        document.removeEventListener("touchstart", resumePlay);
        document.removeEventListener("keydown", resumePlay);
        document.removeEventListener("scroll", resumePlay);
      };
    }
  }, []);

  // Sync and resume background video play when splash screen is dismissed
  useEffect(() => {
    if (!showSplash) {
      const video = videoRef.current;
      if (video) {
        video.play().catch(() => {});
      }
    }
  }, [showSplash]);

  // Generate code fragments once on load
  useEffect(() => {
    const rawSnippets = [
      "<React.Fragment />",
      "const app = express();",
      "npm install",
      "git commit -m 'init'",
      "interface Props {}",
      "export default",
      "useEffect(() => {}, [])",
      "const [state, setState] = useState()",
      "import { motion } from 'motion/react'",
      "type VoidFn = () => void;",
      "boxShadow: '0 0 30px rgba(204,0,255,0.1)'",
      "process.env.GEMINI_API_KEY",
      "scale: [1, 1.1, 1]"
    ];

    const generated = rawSnippets.map((text, idx) => ({
      id: idx,
      text,
      x: 5 + (idx * 13) % 90, // distributed layout
      duration: 15 + (idx * 4) % 15, // speed variance
      delay: (idx * 2) % 12, // staggered delay
      fontSize: 11 + (idx % 3) // 11px to 13px
    }));

    setSnippets(generated);
  }, []);

  // HTML5 Canvas interactive embers particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let embers: Ember[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = [
      "rgba(204, 0, 255, ", // Accent neon purple
      "rgba(123, 47, 190, ", // Primary glow purple
      "rgba(147, 51, 234, "  // Violet
    ];

    const spawnEmber = () => {
      if (embers.length > 45) return;
      const rColor = colors[Math.floor(Math.random() * colors.length)];
      embers.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 1 + Math.random() * 3,
        speedY: -(0.5 + Math.random() * 1.5),
        opacity: 0.1 + Math.random() * 0.5,
        fadeSpeed: 0.001 + Math.random() * 0.003,
        color: rColor
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new embers randomly
      if (Math.random() < 0.15) {
        spawnEmber();
      }

      embers.forEach((ember, idx) => {
        ember.y += ember.speedY;
        ember.opacity -= ember.fadeSpeed;

        // horizontal wander
        ember.x += Math.sin(ember.y / 30) * 0.3;

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${ember.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(204, 0, 255, 0.4)";
        ctx.fill();

        // Remove out-of-screen or fully transparent embers
        if (ember.y < -10 || ember.opacity <= 0) {
          embers.splice(idx, 1);
        }
      });

      ctx.shadowBlur = 0; // reset shadow blurring
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-[#ECE6F4] flex flex-col justify-start overflow-hidden pb-24 select-none">
      
      {/* 1. EMBERS SPARK DECK CANVAS */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
      />

      {/* 2. DRIFTING MONOSPACE CODE SNIPPETS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        {snippets.map((snip) => (
          <motion.div
            key={snip.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.15, 0.15, 0] 
            }}
            transition={{
              duration: snip.duration,
              delay: snip.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute font-mono pointer-events-none"
            style={{
              left: `${snip.x}%`,
              fontSize: `${snip.fontSize}px`,
              color: "rgba(236, 230, 244, 0.12)",
              textShadow: "0 0 8px rgba(204, 0, 255, 0.15)"
            }}
          >
            {snip.text}
          </motion.div>
        ))}
      </div>

      {/* 3. RESPONSIVE ATMOSPHERE ORBS */}
      {/* Centered pulsing soft violet orb */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.16, 0.12],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[350px] sm:h-[800px] rounded-full blur-[140px] pointer-events-none z-[1]"
        style={{
          backgroundColor: "#7B2FBE",
        }}
      />

      {/* Fixed bottom-left magenta orb */}
      <div 
        className="absolute bottom-[-100px] left-[-100px] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none z-[1] opacity-[0.08]"
        style={{
          backgroundColor: "#CC00FF",
        }}
      />

      {/* 4. VIDEO HERO BACKGROUND SYSTEM (Absolute positioned behind content) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-[#0A0010]">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover opacity-45 transition-opacity duration-1000 ease-in-out font-sans"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 5. HERO FOREGROUND CONTENT CANVAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="pt-[140px] md:pt-[160px] pb-12 max-w-3xl text-left">
          
          {/* LARGE MAIN HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mb-6"
          >
            <h1 
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#E8D5F5] leading-[1.1]"
              style={{
                textShadow: "0 4px 16px rgba(0, 0, 0, 0.95), 0 2px 4px rgba(0, 0, 0, 0.9)"
              }}
            >
              Hi I'm{" "}
              <span 
                className="inline-block bg-gradient-to-r from-[#CC00FF] via-[#7B2FBE] to-[#FF3366] bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 2px 25px rgba(204, 0, 255, 0.9)) drop-shadow(0 0 8px rgba(255, 51, 102, 0.6))"
                }}
              >
                Baldwin
              </span>
            </h1>

            {/* Glowing Purple Laser Sword decoration */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={showSplash ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.2 }}
              className="my-6 flex items-center justify-start origin-left relative"
            >
              <svg 
                width="450" 
                height="40" 
                viewBox="0 0 450 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_20px_rgba(204,0,255,0.95)] max-w-full"
              >
                <defs>
                  <linearGradient id="purpleSwordBladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7B2FBE" />
                    <stop offset="25%" stopColor="#CC00FF" />
                    <stop offset="65%" stopColor="#E8D5F5" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                  <filter id="swordGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Pommel */}
                <circle cx="13" cy="20" r="5.5" fill="#501880" stroke="#E8D5F5" strokeWidth="1" />
                <circle cx="13" cy="20" r="2" fill="#CC00FF" />
                
                {/* Grip Handle */}
                <rect x="18.5" y="17.5" width="32" height="5" rx="1.5" fill="#2E0E4E" stroke="#A78BCA" strokeWidth="1" />
                <line x1="265" y1="0" x2="265" y2="0" /> {/* dummy anchor */}
                <line x1="26" y1="17.5" x2="26" y2="22.5" stroke="#E8D5F5" strokeWidth="1" />
                <line x1="34" y1="17.5" x2="34" y2="22.5" stroke="#E8D5F5" strokeWidth="1" />
                <line x1="42" y1="17.5" x2="42" y2="22.5" stroke="#E8D5F5" strokeWidth="1" />

                {/* Handguard / Wings */}
                <path d="M 50.5 6 Q 54.5 20 50.5 34 C 50.5 34 54.5 34 58.5 26 L 58.5 14 C 54.5 6 50.5 6 50.5 6 Z" fill="#501880" stroke="#E8D5F5" strokeWidth="1" />
                <circle cx="53" cy="20" r="4" fill="#CC00FF" />

                {/* Cyberpunk aura light below the blade */}
                <path 
                  d="M 58.5 12 L 415 12 L 440 20 L 415 28 L 58.5 28 Z" 
                  fill="#CC00FF" 
                  opacity="0.65" 
                  filter="url(#swordGlow)"
                />

                {/* High quality glowing blade core */}
                <path 
                  d="M 58.5 14.5 L 412 14.5 L 435 20 L 412 25.5 L 58.5 25.5 Z" 
                  fill="url(#purpleSwordBladeGrad)" 
                />
                
                {/* White laser beam core center shining line */}
                <line x1="61.5" y1="20" x2="410" y2="20" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
              </svg>
            </motion.div>
          </motion.div>

          {/* DETAIL SUBHEADING */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-[#A78BCA] max-w-2xl mb-10"
            style={{
              textShadow: "0 3px 14px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9)"
            }}
          >
            Building immersive digital experiences, interactive web applications, and visually stunning interfaces. Blending design with advanced frontend architecture.
          </motion.p>

          {/* CALL-TO-ACTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="flex flex-row flex-wrap gap-4 items-center"
          >
            {/* View work button */}
            <button
              onClick={() => onNavigate("#work")}
              className="px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer flex items-center space-x-2 group"
              style={{
                backgroundColor: "#E8D5F5",
                color: "#0A0010"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(232, 213, 245, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#E8D5F5";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>View Work</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Contact button */}
            <button
              onClick={() => onNavigate("#contact")}
              className="px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border hover:scale-[1.02] cursor-pointer flex items-center space-x-2 backdrop-blur-md"
              style={{
                backgroundColor: "rgba(232, 213, 245, 0.12)",
                borderColor: "rgba(232, 213, 245, 0.4)",
                color: "#FFFFFF",
                boxShadow: "inset 0 0 20px rgba(232, 213, 245, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(232, 213, 245, 0.25)";
                e.currentTarget.style.borderColor = "rgba(204, 0, 255, 0.6)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(204, 0, 255, 0.3), inset 0 0 20px rgba(232, 213, 245, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(232, 213, 245, 0.12)";
                e.currentTarget.style.borderColor = "rgba(232, 213, 245, 0.4)";
                e.currentTarget.style.boxShadow = "inset 0 0 20px rgba(232, 213, 245, 0.05)";
              }}
            >
              <span>Contact Me</span>
              <MessageSquare size={15} />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
