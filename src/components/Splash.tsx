import { useEffect } from "react";
import { motion } from "motion/react";

interface SplashProps {
  onComplete: () => void;
  key?: string;
}

export default function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    // Automatically transition to the app after 2.8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 overflow-hidden select-none pointer-events-none"
    >
      {/* 1. Slowly fading solid dark background */}
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Exquisite luxury slow fade
        className="absolute inset-0 bg-[#0A0010] z-0 pointer-events-auto"
      />

      {/* 2. Ambient background glows - fading out on exit */}
      <motion.div 
        initial={{ opacity: 0.15 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none z-0"
        style={{
          backgroundColor: "#CC00FF",
          bottom: "10%",
          right: "10%"
        }}
      />

      {/* 3. Core content container */}
      <div className="flex flex-col items-center justify-center max-w-sm w-full text-center z-10">
        
        {/* Animated logo mask container styled with Shared Element Transition */}
        <motion.div
          layoutId="header-logo"
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ 
            opacity: [1, 0.8, 0],
            scale: 0.15, // Scale down to match the header logo scale
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
          }}
          transition={{ 
            duration: 1.5, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 mb-8 flex items-center justify-center"
        >
          <img 
            src="/logo.webp" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10"
          />
        </motion.div>

        {/* Minimalist modern progress bar - fades out quickly on exit */}
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-32 h-[1.5px] bg-purple-950/40 rounded-full overflow-hidden mt-12 mx-auto relative"
        >
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#CC00FF] to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
