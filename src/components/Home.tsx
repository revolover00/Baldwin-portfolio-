import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HomeProps {
  onNavigate: (route: string) => void;
  showSplash?: boolean;
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
  const [typedLength, setTypedLength] = useState(0);
  const { t, language } = useLanguage();
  const fullTitle = t("home_name");
  const baseText = t("home_welcome");

  // Premium typewriter effect
  useEffect(() => {
    setTypedLength(0);
    if (showSplash) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      let current = 0;
      intervalId = setInterval(() => {
        current++;
        setTypedLength(current);
        if (current >= fullTitle.length) {
          clearInterval(intervalId);
        }
      }, 80);
    }, 400);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [showSplash, language, fullTitle]);

  // HTML5 Canvas interactive embers particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let embers: Ember[] = [];
    let lastTime = performance.now();

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
      const isMobile = window.innerWidth < 768;
      const maxEmbers = isMobile ? 30 : 50; 
      if (embers.length > maxEmbers) return; 
      const rColor = colors[Math.floor(Math.random() * colors.length)];
      embers.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 1 + Math.random() * (isMobile ? 1.5 : 2.5),
        speedY: -(0.04 + Math.random() * (isMobile ? 0.08 : 0.12)), // Scaled for delta
        opacity: 0.15 + Math.random() * 0.45,
        fadeSpeed: 0.0001 + Math.random() * 0.0002, // Scaled for delta
        color: rColor
      });
    };

    const draw = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const isMobile = window.innerWidth < 768;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new embers based on actual time elapsed to keep frequency consistent
      if (Math.random() < (isMobile ? 0.012 : 0.02) * delta) {
        spawnEmber();
      }

      embers.forEach((ember, idx) => {
        ember.y += ember.speedY * delta;
        ember.opacity -= ember.fadeSpeed * delta;

        // horizontal wander based on time
        ember.x += Math.sin(ember.y / 30) * 0.02 * delta;

        // HIGH PERFORMANCE GLOW EFFECT
        if (!isMobile) {
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(204, 0, 255, ${ember.opacity * 0.15})`;
          ctx.fill();
        }

        // Core bright ember
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${ember.opacity})`;
        ctx.fill();

        // Remove out-of-screen or fully transparent embers
        if (ember.y < -20 || ember.opacity <= 0) {
          embers.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="home" className="relative min-h-screen text-[#ECE6F4] flex flex-col justify-center items-center overflow-x-hidden selection:bg-[#CC00FF]/20 selection:text-white">
      
      {/* Premium ambient particle canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      {/* Hero Foreground Content Canvas */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex flex-col items-center justify-center py-12 sm:py-20">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8 max-w-3xl">
          
          {/* Main Hero Title */}
          <motion.h1 
            className="text-3xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05]"
            style={{
              fontFamily: language === "ar" ? "'Badeen Display', 'Alexandria', 'Cairo', sans-serif" : "'Syne', sans-serif",
              fontWeight: 900
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
              className={`inline-block w-[2.5px] h-[0.8em] align-middle bg-[#CC00FF] ml-1 sm:ml-2 ${
                typedLength < fullTitle.length ? "animate-pulse" : "animate-[ping_1.2s_infinite_normal_both] opacity-80"
              }`}
            />
          </motion.h1>

          {/* Subtitle description with elegant line height */}
          <motion.p
            className="text-xs sm:text-lg md:text-xl font-light leading-relaxed text-[#A78BCA] max-w-2xl px-4 sm:px-0"
            style={{
              fontFamily: language === "ar" ? "'Alyamama', sans-serif" : "inherit"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {t("home_subtitle")}
          </motion.p>

          {/* Call-to-actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="flex flex-row flex-wrap gap-3 sm:gap-4 items-center justify-center mt-1"
          >
            {/* Get a Quote / Primary (now transparent) */}
            <motion.button
              whileHover={{ 
                scale: 1.03, 
                backgroundColor: "rgba(232, 213, 245, 0.18)", 
                borderColor: "rgba(204, 0, 255, 0.6)", 
                boxShadow: "0 0 35px rgba(204, 0, 255, 0.35)"
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => {
                // Pre-fill subject via hash params or local state depending on logic; for now deep-link
                onNavigate("#quote");
                setTimeout(() => {
                  const subjectField = document.getElementById("subject") as HTMLInputElement;
                  if (subjectField) {
                     subjectField.value = "Consultation / Book a Call";
                  }
                }, 100);
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border cursor-pointer flex items-center space-x-2 backdrop-blur-md bg-white/5 border-white/20 text-white"
            >
              <span>{t("home_btn_quote")}</span>
              <MessageSquare size={12} className="text-[#CC00FF]" />
            </motion.button>

            {/* View selected work */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(232, 213, 245, 0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => onNavigate("#work")}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center space-x-2 bg-white text-[#06010A]"
            >
              <span>{t("home_btn_work")}</span>
              <ArrowRight size={12} />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
