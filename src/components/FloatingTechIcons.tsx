import { useMemo, useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiSupabase,
  SiVite,
  SiPostgresql,
  SiGithub,
  SiVercel,
  SiGit,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiNextdotjs,
  SiGooglegemini,
  SiDocker,
  SiPython,
  SiOpenai,
  SiFigma,
  SiSass,
} from "react-icons/si";

// Exact brand colors maintained from About.tsx
const TECH_ICONS = [
  { Icon: SiReact, color: "#61DAFB" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiTailwindcss, color: "#38BDF8" },
  { Icon: SiFramer, color: "#E10098" },
  { Icon: SiSupabase, color: "#3ECF8E" },
  { Icon: SiVite, color: "#646CFF" },
  { Icon: SiPostgresql, color: "#336791" },
  { Icon: SiGithub, color: "#FFFFFF" },
  { Icon: SiVercel, color: "#FFFFFF" },
  { Icon: SiGit, color: "#F05032" },
  { Icon: SiNodedotjs, color: "#339933" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiHtml5, color: "#E34F26" },
  { Icon: SiNextdotjs, color: "#FFFFFF" },
  { Icon: SiGooglegemini, color: "#FFD700" },
  { Icon: SiDocker, color: "#2496ED" },
  { Icon: SiPython, color: "#3776AB" },
  { Icon: SiOpenai, color: "#19C37D" },
  { Icon: SiFigma, color: "#F24E1E" },
  { Icon: SiSass, color: "#CC6699" },
] as const;

interface FloatingIcon {
  key: number;
  Icon: (typeof TECH_ICONS)[number]["Icon"];
  color: string;
  size: number;
  startXVw: number;
  startYVh: number;
  
  // Drift vectors
  amplitudeX: number;
  amplitudeY: number;
  speedX: number;
  speedY: number;
  phaseX: number;
  phaseY: number;
  
  // Rotation details
  rotSpeed: number;
  rotPhase: number;
  maxRotation: number;
  
  // Reactive state properties
  targetPush?: { x: number; y: number };
  currentPush?: { x: number; y: number };
}

function buildIcons(count: number): FloatingIcon[] {
  return Array.from({ length: count }, (_, i) => {
    const base = TECH_ICONS[i % TECH_ICONS.length];
    return {
      key: i,
      Icon: base.Icon,
      color: base.color,
      size: 18 + Math.random() * 14, // 18px - 32px
      startXVw: Math.random() * 100,
      startYVh: Math.random() * 100,
      
      // Fine-grained natural sinewave drifting
      amplitudeX: 20 + Math.random() * 40, // 20px to 60px drift
      amplitudeY: 25 + Math.random() * 45, // 25px to 70px drift
      speedX: 0.0004 + Math.random() * 0.0006,
      speedY: 0.0003 + Math.random() * 0.0005,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      
      rotSpeed: 0.0002 + Math.random() * 0.0004,
      rotPhase: Math.random() * Math.PI * 2,
      maxRotation: 15 + Math.random() * 15, // Max rotation degrees
    };
  });
}

export default function FloatingTechIcons() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -2000, y: -2000 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const icons = useMemo(() => buildIcons(isMobile ? 12 : 28), [isMobile]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Synchronize latest scroll positioning quickly
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    let animationId: number;

    const tick = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const currentScroll = scrollRef.current;
      const scrollOffsetVh = (currentScroll / h) * 100;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      containerRefs.current.forEach((el, index) => {
        if (!el) return;
        const icon = icons[index];
        if (!icon) return;

        // Centralized drift physics via sine/cosine waves mapped to high-precision timestamp
        const driftX = Math.sin(time * icon.speedX + icon.phaseX) * icon.amplitudeX;
        const driftY = Math.cos(time * icon.speedY + icon.phaseY) * icon.amplitudeY;
        const rotation = Math.sin(time * icon.rotSpeed + icon.rotPhase) * icon.maxRotation;

        // Custom layered parallax speed factor
        const speed = 0.15 + (index % 4) * 0.12;
        const scrolledYVh = icon.startYVh - scrollOffsetVh * speed;

        // Smooth wrapping layout to ensure icons repeat cleanly infinitely
        const wrappedYVh = (((scrolledYVh + 25) % 150) + 150) % 150 - 25;

        // Calculate absolute pixel coordinates for mouse hover tests
        const ix = (icon.startXVw / 100) * w + driftX;
        const iy = (wrappedYVh / 100) * h + driftY;

        const dx = mx - ix;
        const dy = my - iy;
        const distance = Math.hypot(dx, dy);

        const radius = isMobile ? 100 : 200;
        let scale = 1;
        let opacity = 0.12;
        let shadowEffect = "";

        // Track icon-specific target push values for smooth lerp
        if (!icon.targetPush) {
          icon.targetPush = { x: 0, y: 0 };
          icon.currentPush = { x: 0, y: 0 };
        }

        if (distance < radius) {
          const force = (radius - distance) / radius; // 0 to 1

          // Gentle escape vector pushing icons away from cursor position beautifully
          icon.targetPush.x = (dx / (distance || 1)) * (isMobile ? -14 : -32) * force;
          icon.targetPush.y = (dy / (distance || 1)) * (isMobile ? -14 : -32) * force;

          scale = 1 + force * 0.4;
          opacity = 0.12 + force * 0.35;
          shadowEffect = `drop-shadow(0 0 ${6 * force}px ${icon.color})`;
        } else {
          icon.targetPush.x = 0;
          icon.targetPush.y = 0;
        }

        // Apply ultra-smooth lerp for the push vector (0.1 factor for high precision)
        icon.currentPush.x += (icon.targetPush.x - icon.currentPush.x) * 0.1;
        icon.currentPush.y += (icon.targetPush.y - icon.currentPush.y) * 0.1;

        // Apply everything inside a SINGLE composite-only 3D transform that gets pushed directly to GPU
        const finalX = driftX + icon.currentPush.x;
        const finalY = driftY + icon.currentPush.y;

        el.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        el.style.top = `${wrappedYVh}vh`; // Keep top updates contained to layout-safe wrapped ranges
        el.style.opacity = `${opacity}`;
        el.style.filter = shadowEffect || "none";
      });

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [icons, shouldReduceMotion, isMobile]);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {icons.map(({ key, Icon, color, size, startXVw }) => (
        <div
          key={key}
          ref={(el) => {
            containerRefs.current[key] = el;
          }}
          className="absolute"
          style={{
            left: `${startXVw}vw`,
            color,
            willChange: "transform, opacity, filter",
            display: "inline-block",
          }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  );
}
