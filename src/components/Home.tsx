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
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [typedLength, setTypedLength] = useState(0);
  const fullTitle = "Hi, I'm Baldwin";
  const baseText = "Hi, I'm ";

  // Premium typewriter effect
  useEffect(() => {
    if (showSplash) {
      setTypedLength(0);
      return;
    }

    const startTimeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setTypedLength(current);
        if (current >= fullTitle.length) {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(startTimeout);
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
      if (embers.length > 25) return; // Highly optimized: Limit max active embers to 25
      const rColor = colors[Math.floor(Math.random() * colors.length)];
      embers.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 1 + Math.random() * 2.5,
        speedY: -(0.4 + Math.random() * 1.2),
        opacity: 0.15 + Math.random() * 0.45,
        fadeSpeed: 0.001 + Math.random() * 0.002,
        color: rColor
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new embers randomly
      if (Math.random() < 0.12) {
        spawnEmber();
      }

      embers.forEach((ember, idx) => {
        ember.y += ember.speedY;
        ember.opacity -= ember.fadeSpeed;

        // horizontal wander
        ember.x += Math.sin(ember.y / 30) * 0.25;

        // HIGH PERFORMANCE GLOW EFFECT: Use hardware-accelerated dual overlapping arc fills
        // Instead of extremely slow and laggy CPU-bound ctx.shadowBlur!
        
        // Outer soft glow aura
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204, 0, 255, ${ember.opacity * 0.15})`;
        ctx.fill();

        // Core bright ember
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${ember.opacity})`;
        ctx.fill();

        // Remove out-of-screen or fully transparent embers
        if (ember.y < -10 || ember.opacity <= 0) {
          embers.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="home" className="relative min-h-screen text-[#ECE6F4] flex flex-col justify-center items-center overflow-x-hidden selection:bg-[#CC00FF]/20 selection:text-white select-none">
      
      {/* Premium ambient particle canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      {/* Hero Foreground Content Canvas */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex flex-col items-center justify-center py-20">
        <div className="flex flex-col items-center text-center gap-8 max-w-3xl">
          
          {/* Main Hero Title */}
          <motion.h1 
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.05]"
            style={{
              fontFamily: "'Syne', sans-serif"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {fullTitle.slice(0, Math.min(typedLength, baseText.length))}
            {typedLength > baseText.length && (
              <span className="bg-gradient-to-r from-white via-[#E8D5F5] to-[#C084FC] bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(192,132,252,0.15)]">
                {fullTitle.slice(baseText.length, typedLength)}
              </span>
            )}
            <span 
              className={`inline-block w-[3px] h-[0.8em] align-middle bg-[#CC00FF] ml-1 sm:ml-2 ${
                typedLength < fullTitle.length ? "animate-pulse" : "animate-[ping_1.2s_infinite_normal_both] opacity-80"
              }`}
            />
          </motion.h1>

          {/* Subtitle description with elegant line height */}
          <motion.p
            className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#A78BCA] max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            Building immersive digital experiences, interactive web applications, and visually stunning interfaces. Blending high-end design with advanced frontend craft.
          </motion.p>

          {/* Call-to-actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="flex flex-row flex-wrap gap-4 items-center justify-center mt-2"
          >
            {/* View selected work */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(232, 213, 245, 0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => onNavigate("#work")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center space-x-2 bg-white text-[#06010A]"
            >
              <span>View Selected Work</span>
              <ArrowRight size={13} />
            </motion.button>

            {/* Contact button */}
            <motion.button
              whileHover={{ 
                scale: 1.03, 
                backgroundColor: "rgba(232, 213, 245, 0.18)", 
                borderColor: "rgba(192, 132, 252, 0.6)", 
                boxShadow: "0 0 30px rgba(192, 132, 252, 0.15)"
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => onNavigate("#contact")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all border cursor-pointer flex items-center space-x-2 backdrop-blur-md bg-white/5 border-white/20 text-white"
            >
              <span>Contact Me</span>
              <MessageSquare size={13} />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
