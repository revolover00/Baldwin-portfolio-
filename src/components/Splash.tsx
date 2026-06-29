import { useEffect } from "react";
import { motion } from "framer-motion";

interface SplashProps {
  onComplete: () => void;
  key?: string;
}

export default function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    // Exactly 6 seconds of premium ambient intro experience as requested
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-[#06010A] flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none"
      style={{ willChange: "opacity, transform" }}
    >
      {/* 1. Embedded Premium Glowing CSS styles for perfect liquid horizontal gooey dots animation */}
      <style>{`
        .linear-gooey-container {
          position: relative;
          filter: url(#goo);
          width: 140px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .liquid-dot {
          position: absolute;
          top: 11px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          /* Semi-transparent metallic smoky silver core */
          background: linear-gradient(135deg, rgba(245, 247, 250, 0.82) 0%, rgba(188, 197, 207, 0.55) 45%, rgba(120, 131, 145, 0.45) 100%);
          /* Crisp, smooth premium glossy black glossy rim */
          border: 1.8px solid rgba(12, 12, 15, 0.95);
          /* Shimmering specular reflection and high-gloss 3D bezel effect */
          box-shadow: 
            inset 0 1.5px 2px rgba(255, 255, 255, 0.85),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.65),
            0 0 12px rgba(0, 0, 0, 0.85);
          animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
        }

        .liquid-dot:nth-child(1) {
          left: 15px;
          animation: gooey-grow 0.95s infinite;
        }

        .liquid-dot:nth-child(2) {
          left: 15px;
          animation: gooey-slide 0.95s infinite;
        }

        .liquid-dot:nth-child(3) {
          left: 50px;
          animation: gooey-slide 0.95s infinite;
        }

        .liquid-dot:nth-child(4) {
          left: 85px;
          animation: gooey-shrink 0.95s infinite;
        }

        @keyframes gooey-grow {
          0% { transform: scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes gooey-shrink {
          0% { transform: scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }

        @keyframes gooey-slide {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(35px, 0, 0); }
        }
      `}</style>

      {/* 2. Soft atmospheric background blobs backing the main container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0 }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ willChange: "opacity" }}
      >
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] lg:w-[50vw] lg:h-[50vw] max-w-[600px] max-h-[600px] bg-[#CC00FF]/22 rounded-full blur-[80px] sm:blur-[100px] animate-[pulse_6s_ease-in-out_infinite] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[120vw] h-[120vw] lg:w-[60vw] lg:h-[60vw] max-w-[700px] max-h-[700px] bg-[#7B2FBE]/22 rounded-full blur-[90px] sm:blur-[120px] animate-[pulse_8s_ease-in-out_infinite_1s] mix-blend-screen" />
        <div className="absolute top-[30%] left-[20%] w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw] max-w-[400px] max-h-[400px] bg-[#4B00D1]/12 rounded-full blur-[70px] sm:blur-[90px] animate-[pulse_10s_ease-in-out_infinite_2s] mix-blend-screen" />
      </motion.div>

      {/* 3. Dark luxury vignette boundary */}
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="absolute inset-0 bg-[#0A0010]/20 z-0 pointer-events-auto"
        style={{
          border: "1px solid rgba(204, 0, 255, 0.05)",
          boxShadow: "inset 0 0 100px rgba(123, 47, 190, 0.15)",
          willChange: "opacity"
        }}
      />

      {/* 4. Responsive content layout */}
      <div className="flex flex-col items-center justify-center max-w-sm w-full text-center z-10 gap-3">
        
        {/* Animated logo entry */}
        <motion.div
          layoutId="header-logo"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative w-40 h-40 sm:w-56 sm:h-56 mb-2 flex items-center justify-center"
          style={{ willChange: "transform, opacity" }}
        >
          <img 
            src="/logo.webp" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10"
            style={{ filter: "drop-shadow(0 0 20px rgba(204, 0, 255, 0.35))" }}
          />
        </motion.div>

        {/* 5. Liquid standard filter setup to handle the gooey merger */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="goo">
              {/* Higher precision blur & contrast coordinates to prevent pixel fringe pixelation on smaller circles */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 19 -8" 
                result="goo" 
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* 6. Main High-Fidelity exact loader wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex items-center justify-center py-6 mt-2"
        >
          {/* Silver ambient blur back glow */}
          <div className="absolute w-44 h-24 bg-[#E0E6ED]/12 blur-3xl rounded-full pointer-events-none animate-pulse" />

          {/* Core loader container executing the exact fluid linear dots concept */}
          <div className="linear-gooey-container relative z-10">
            <div className="liquid-dot" />
            <div className="liquid-dot" />
            <div className="liquid-dot" />
            <div className="liquid-dot" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
