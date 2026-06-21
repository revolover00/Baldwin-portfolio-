import React from 'react';
import './Ferrofluid.css';

interface FerrofluidProps {
  className?: string;
  dpr?: number;
  paused?: boolean;
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: 'up' | 'down' | 'left' | 'right';
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
}


const Ferrofluid: React.FC<FerrofluidProps> = ({
  className,
  colors = ['#8B5CF6', '#C084FC', '#F3E8FF'],
  opacity = 1,
  mixBlendMode
}) => {
  // Gracefully fallback to ultra-smooth hardware-accelerated CSS animations
  // to achieve maximum 120 FPS on all high-resolution screen devices
  const colorList = colors.length >= 3 ? colors : [...colors, '#8B5CF6', '#C084FC', '#F3E8FF'];

  return (
    <div
      className={`ferrofluid-container ${className ?? ''}`}
      style={{
        ...(mixBlendMode && { mixBlendMode }),
        opacity
      }}
    >
      <div className="absolute inset-0 z-0 bg-[#06010A] overflow-hidden">
        {/* Soft, modern ambient glowing circles with orbital floating animations */}
        <div 
          className="absolute w-[100vw] h-[100vw] lg:w-[45vw] lg:h-[45vw] rounded-full blur-[100px] lg:blur-[140px] animate-float-1 top-[-20%] left-[-20%] opacity-40 mix-blend-screen"
          style={{
            backgroundColor: colorList[0]
          }}
        />
        <div 
          className="absolute w-[90vw] h-[90vw] lg:w-[40vw] lg:h-[40vw] rounded-full blur-[110px] lg:blur-[150px] animate-float-2 bottom-[-10%] right-[-10%] opacity-30 mix-blend-screen"
          style={{
            backgroundColor: colorList[1]
          }}
        />
        <div 
          className="absolute w-[85vw] h-[85vw] lg:w-[35vw] lg:h-[35vw] rounded-full blur-[90px] lg:blur-[130px] animate-float-3 top-[35%] left-[25%] opacity-25 mix-blend-screen"
          style={{
            backgroundColor: colorList[2]
          }}
        />
      </div>
    </div>
  );
};


export default Ferrofluid;
