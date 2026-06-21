import { useEffect } from "react";
import { motion } from "motion/react";

interface SplashProps {
  onComplete: () => void;
  key?: string;
}

export default function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    // Faster transition on mobile for better perceived speed
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const splashTime = isMobile ? 1800 : 2500;
    const timer = setTimeout(() => {
      onComplete();
    }, splashTime);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 overflow-hidden select-none pointer-events-none"
    >
      {/* 1. Underlying animated liquid blobs for glass effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] lg:w-[50vw] lg:h-[50vw] max-w-[600px] max-h-[600px] bg-[#CC00FF]/30 rounded-full blur-[80px] sm:blur-[100px] animate-[pulse_6s_ease-in-out_infinite] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[120vw] h-[120vw] lg:w-[60vw] lg:h-[60vw] max-w-[700px] max-h-[700px] bg-[#7B2FBE]/30 rounded-full blur-[90px] sm:blur-[120px] animate-[pulse_8s_ease-in-out_infinite_1s] mix-blend-screen" />
        <div className="absolute top-[30%] left-[20%] w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw] max-w-[400px] max-h-[400px] bg-[#4B00D1]/20 rounded-full blur-[70px] sm:blur-[90px] animate-[pulse_10s_ease-in-out_infinite_2s] mix-blend-screen" />
      </motion.div>

      {/* 2. Frosted Liquid Glass overlay */}
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#0A0010]/30 z-0 pointer-events-auto"
        style={{
          WebkitBackdropFilter: "blur(50px)",
          backdropFilter: "blur(50px)",
          border: "1px solid rgba(204, 0, 255, 0.08)",
          boxShadow: "inset 0 0 100px rgba(123, 47, 190, 0.2)"
        }}
      />

      {/* 3. Core content container */}
      <div className="flex flex-col items-center justify-center max-w-sm w-full text-center z-10">
        
        {/* Animated logo container - layoutId transition to header */}
        <motion.div
          layoutId="header-logo"
          initial={{ opacity: 0, scale: 0.8, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative w-40 h-40 sm:w-56 sm:h-56 mb-8 flex items-center justify-center"
        >
          <img 
            src="/logo.webp" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10"
            style={{ filter: "drop-shadow(0 0 20px rgba(204, 0, 255, 0.4))" }}
          />
        </motion.div>

        {/* Minimalist modern progress bar - fades out quickly on exit */}
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-32 h-[1.5px] bg-purple-950/40 rounded-full overflow-hidden mt-12 mx-auto relative backdrop-blur-md"
        >
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#E8D5F5] to-transparent shadow-[0_0_8px_#CC00FF]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
