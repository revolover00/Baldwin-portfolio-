import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // High-performance direct motion values that bypass React render cycles completely!
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs on-top of motion values for ultra-fluid movement
  const springX = useSpring(mouseX, { stiffness: 850, damping: 32, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 850, damping: 32, mass: 0.1 });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const updateMousePosition = (e: MouseEvent) => {
      // Updates the motion values directly, triggering 0 react component renders!
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isDesktop]);

  // Don't render on mobile to save performance
  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: isHovering ? 1.25 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 32,
        mass: 0.1,
      }}
    >
      <div 
        className="absolute transition-transform duration-300 ease-out"
        style={{
          width: "64px",
          height: "64px",
          left: "-32px",
          top: "-64px",
          transformOrigin: "32px 64px",
          transform: isHovering 
            ? "rotate(-155deg) scale(1.1)" 
            : "rotate(-140deg)",
        }}
      >
        <img 
          src="/2312.png" 
          alt="Sword Cursor" 
          className="w-full h-full object-contain"
          style={{
            filter: isHovering 
              ? "drop-shadow(0 0 12px rgba(204,0,255,0.95)) drop-shadow(0 0 4px rgba(204,0,255,0.73))" 
              : "drop-shadow(0 0 6px rgba(204,0,255,0.65))"
          }}
        />
      </div>

      {/* Embedded interactive sparkle under the pointer tip */}
      <div 
        className="absolute rounded-full bg-[#CC00FF] transition-all duration-300"
        style={{
          width: isHovering ? "6px" : "3px",
          height: isHovering ? "6px" : "3px",
          left: isHovering ? "-3px" : "-1.5px",
          top: isHovering ? "-3px" : "-1.5px",
          boxShadow: "0 0 10px #CC00FF, 0 0 4px #E8D5F5",
          opacity: isHovering ? 1 : 0.6,
        }}
      />
    </motion.div>
  );
}
