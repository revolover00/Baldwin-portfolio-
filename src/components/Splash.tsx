import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SplashProps {
  onComplete: () => void;
  key?: string;
}

export default function Splash({ onComplete }: SplashProps) {
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Automatically transition to the app after 2.8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 overflow-hidden select-none"
      style={{
        backgroundColor: "#0A0010"
      }}
    >
      {/* Decorative ambient background glows - outer only, none under the mask */}
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-[0.15] pointer-events-none"
        style={{
          backgroundColor: "#CC00FF",
          bottom: "10%",
          right: "10%"
        }}
      />

      <div className="flex flex-col items-center justify-center max-w-sm w-full text-center z-10">
        {/* Animated logo container - clean with no glow under the mask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 mb-8 flex items-center justify-center"
        >
          <img 
            src="/logo.webp" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10"
            onLoad={() => setLogoLoaded(true)}
          />
        </motion.div>

        {/* Dynamic, minimalist modern progress bar */}
        <div className="w-32 h-[1.5px] bg-purple-950/40 rounded-full overflow-hidden mt-12 mx-auto relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#CC00FF] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
