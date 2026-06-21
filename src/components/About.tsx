import React, { useState, useEffect, useRef } from "react";
import { motion, animate, useInView } from "motion/react";
import ProfileCard from "./ProfileCard";
import Process from "./Process";
import { 
  Code2, 
  Database, 
  Wrench, 
  Rocket, 
  Cpu, 
  BarChart3,
  Linkedin,
  Youtube,
  Twitter,
  Github,
  Share2,
  Atom,
  Layers,
  Palette,
  Zap,
  Flame,
  Server,
  Globe,
  GitBranch,
  Brain,
  Sparkles,
  Shield,
  Workflow,
  Eye,
  FileCode,
  Video,
  Compass,
  Cloud,
  Tv,
  RefreshCw,
  Lock
} from "lucide-react";

// Helper function to return beautiful custom icons with themed colors for technical skills/tools
const getSkillIcon = (name: string) => {
  const iconSize = 13;
  switch (name.toLowerCase()) {
    // Frameworks & Libraries
    case "react":
      return <Atom size={iconSize} className="text-[#61DAFB]" />;
    case "typescript":
      return <Layers size={iconSize} className="text-[#3178C6]" />;
    case "tailwindcss":
      return <Palette size={iconSize} className="text-[#38BDF8]" />;
    case "framer motion":
      return <Zap size={iconSize} className="text-[#E10098]" />;
    case "vite":
      return <Flame size={iconSize} className="text-[#646CFF]" />;
    case "supabase":
      return <Database size={iconSize} className="text-[#3ECF8E]" />;
    case "postgresql":
      return <Server size={iconSize} className="text-[#336791]" />;
    case "rest apis":
      return <Globe size={iconSize} className="text-[#0FF0FC]" />;
    case "git & github":
      return <GitBranch size={iconSize} className="text-[#F05032]" />;
    case "vercel":
      return <Globe size={iconSize} className="text-[#FFFFFF]" />;
    case "lovable ai":
      return <Brain size={iconSize} className="text-[#FF80B5]" />;
    case "google ai studio":
      return <Sparkles size={iconSize} className="text-[#FFD700]" />;

    // Advanced Competencies & Professional Skills
    case "frontend development":
      return <Code2 size={iconSize} className="text-[#38BDF8]" />;
    case "full-stack development":
      return <Server size={iconSize} className="text-[#A855F7]" />;
    case "type-safe programming":
      return <Shield size={iconSize} className="text-[#3178C6]" />;
    case "ui/ux design":
      return <Eye size={iconSize} className="text-[#F43F5E]" />;
    case "performance optimization":
      return <Zap size={iconSize} className="text-[#EAB308]" />;
    case "state management":
      return <Workflow size={iconSize} className="text-[#10B981]" />;
    case "data fetching":
      return <Globe size={iconSize} className="text-[#06B6D4]" />;
    case "ai integration":
      return <Brain size={iconSize} className="text-[#EC4899]" />;
    case "local document processing":
      return <FileCode size={iconSize} className="text-[#F97316]" />;
    case "security & encryption":
      return <Lock size={iconSize} className="text-[#EF4444]" />;
    case "media generation":
      return <Video size={iconSize} className="text-[#8B5CF6]" />;
    case "graphics manipulation":
      return <Palette size={iconSize} className="text-[#6366F1]" />;
    case "form validation & management":
      return <Wrench size={iconSize} className="text-[#14B8A6]" />;
    case "progressive web apps (pwa)":
      return <Compass size={iconSize} className="text-[#3B82F6]" />;
    case "webgl graphics":
      return <Tv size={iconSize} className="text-[#84CC16]" />;
    case "server-side rendering (ssr)":
      return <RefreshCw size={iconSize} className="text-[#22C55E]" />;
    case "static site generation":
      return <Layers size={iconSize} className="text-[#A855F7]" />;
    case "cloud integration":
      return <Cloud size={iconSize} className="text-[#0EA5E9]" />;
    case "database management":
      return <Database size={iconSize} className="text-[#64748B]" />;
    case "real-time applications":
      return <Cpu size={iconSize} className="text-[#F43F5E]" />;

    default:
      return <Cpu size={iconSize} className="text-[#A78BCA]" />;
  }
};

// Premium count-up counter executing flawlessly when scrolled into view
function CountUp({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });
  const parsed = value.match(/^([^\d]*)(\d+)([^\d]*)$/);

  useEffect(() => {
    if (!isInView || !parsed) return;
    const target = parseInt(parsed[2], 10);
    
    // Ensure we start strictly at 0
    setCount(0);
    
    let animationFrameId: number;
    const delayTimer = setTimeout(() => {
      const startTime = performance.now();
      const duration = 1500; // 1.5 seconds of high-performance smooth counting

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Exquisite easeOutQuart ease for a premium decelerating count-up
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * target));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(tick);
        } else {
          setCount(target); // Force exactly the target number to settle beautifully
        }
      };

      animationFrameId = requestAnimationFrame(tick);
    }, 150);

    return () => {
      clearTimeout(delayTimer);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value]);

  if (!parsed) {
    return <span>{value}</span>;
  }

  const prefix = parsed[1];
  const suffix = parsed[3];

  return (
    <span ref={elementRef} className="tabular-nums inline-block font-mono">
      {prefix}
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}

export default function About() {
  const [githubRepos, setGithubRepos] = useState<string>("24+");

  useEffect(() => {
    fetch("https://api.github.com/users/revo-code")
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos) {
          setGithubRepos(`${data.public_repos}+`);
        }
      })
      .catch(() => {});
  }, []);

  const skillCategories = [
    {
      title: "Frontend Architecture",
      icon: <Code2 size={18} style={{ color: "#CC00FF" }} />,
      skills: ["React", "TypeScript", "Frontend Development", "UI/UX Design", "Progressive Web Apps (PWA)", "Form Validation & Management"]
    },
    {
      title: "Backend & Reliability",
      icon: <Server size={18} style={{ color: "#CC00FF" }} />,
      skills: ["Full-Stack Development", "TypeScript", "Type-Safe Programming", "Server-Side Rendering (SSR)", "Static Site Generation", "Git & GitHub"]
    },
    {
      title: "Data & Cloud Systems",
      icon: <Database size={18} style={{ color: "#CC00FF" }} />,
      skills: ["Database Management", "Cloud Integration", "Supabase", "PostgreSQL", "REST APIs", "Data Fetching", "Vercel"]
    },
    {
      title: "Intelligent & Real-time",
      icon: <Brain size={18} style={{ color: "#CC00FF" }} />,
      skills: ["AI Integration", "Real-time Applications", "Local Document Processing", "Google AI Studio", "Lovable AI"]
    },
    {
      title: "Security & Performance",
      icon: <Shield size={18} style={{ color: "#CC00FF" }} />,
      skills: ["Security & Encryption", "Performance Optimization", "State Management"]
    },
    {
      title: "Graphics & Media",
      icon: <Tv size={18} style={{ color: "#CC00FF" }} />,
      skills: ["WebGL Graphics", "Media Generation", "Graphics Manipulation", "Framer Motion", "TailwindCSS", "Vite"]
    }
  ];

  const stats = [
    { label: "GitHub Repos", value: githubRepos },
    { label: "Primary Stack", value: "TypeScript" },
    { label: "Deployments", value: "Vercel" },
    { label: "Approach", value: "AI-powered builds" }
  ];

  return (
    <div 
      id="about" 
      className="relative min-h-screen px-4 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:px-8 max-w-7xl mx-auto z-10 selection:bg-[#CC00FF]/20 selection:text-white"
    >
      {/* Decorative localized purple/violet blur orbs */}
      <div className="absolute top-10 right-10 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-purple-500/10 blur-2xl sm:blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-violet-500/10 blur-2xl sm:blur-3xl pointer-events-none -z-10" />

      <div className="space-y-12 sm:space-y-16">
        
        {/* Section 1 — Identity (With ProfileCard & Process) */}
        <section className="space-y-12 lg:space-y-16">
          {/* Identity Header Text */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-left space-y-4 sm:space-y-6 max-w-3xl"
          >
            {/* Title badge with pulsing magenta dot */}
            <div 
              className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full border text-[9px] sm:text-xs font-mono tracking-wider uppercase mb-1 sm:mb-2"
              style={{
                backgroundColor: "rgba(123, 47, 190, 0.1)",
                borderColor: "rgba(204, 0, 255, 0.2)",
                color: "#E8D5F5"
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC00FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#CC00FF]"></span>
              </span>
              <span>Architect</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5.5xl font-black tracking-tight select-none [text-shadow:0_0_30px_rgba(204,0,255,0.4)]" style={{ color: "#E8D5F5" }}>
              Baldwin Portfolio
            </h2>
            
            <p 
              className="text-xs sm:text-base sm:text-lg leading-relaxed text-[#A78BCA]"
            >
              I build full-stack web experiences using the latest AI tools. From idea to deployment — fast, clean, and professional.
            </p>
          </motion.div>

          {/* Side-by-Side on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mt-6 sm:mt-12 lg:mt-16">
            {/* Baldwin's Photo (Profile Card) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <ProfileCard />
            </div>

            {/* How I Work Process */}
            <div className="lg:col-span-8 w-full">
              <Process />
            </div>
          </div>
        </section>

        {/* Social Channels Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-1.5 sm:p-2.5 rounded-xl flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}>
              <Share2 size={16} className="sm:w-5 sm:h-5" style={{ color: "#CC00FF" }} />
            </div>
            <h3 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "#E8D5F5" }}>
              Social Channels
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <motion.a 
              href="https://github.com/revolover00/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                boxShadow: "0 22px 50px -10px rgba(204, 0, 255, 0.32), 0 0 20px 2px rgba(204, 0, 255, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              className="p-5 sm:p-8 rounded-xl sm:rounded-2xl gothic-card flex flex-col items-center justify-center text-center group/card cursor-pointer"
            >
              <div className="p-3 sm:p-5 rounded-full mb-3 sm:mb-4 transition-all duration-500 group-hover/card:scale-105 z-20" style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>
                <Github size={28} className="sm:w-11 sm:h-11" style={{ color: "#ffffff" }} />
              </div>
              <h4 className="font-bold text-xs sm:text-lg tracking-wide z-20 transition-colors duration-300 group-hover/card:text-white" style={{ color: "#E8D5F5" }}>
                GitHub
              </h4>
              <p className="text-[10px] sm:text-sm mt-1 z-20 hidden sm:block" style={{ color: "#A78BCA" }}>
                Explore open source
              </p>

              {/* Radiant inner floating neon glow effect that activates smoothly on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.15)_0%,transparent_75%)] pointer-events-none z-10"
              />

              {/* Decorative premium hover border highlight with animated magenta/purple outline */}
              <div className="absolute inset-0 border border-white/0 group-hover/card:border-[#CC00FF]/30 rounded-2xl transition-colors pointer-events-none duration-500 z-30" />
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/revo-code-6181283b5"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                boxShadow: "0 22px 50px -10px rgba(204, 0, 255, 0.32), 0 0 20px 2px rgba(204, 0, 255, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              className="p-5 sm:p-8 rounded-xl sm:rounded-2xl gothic-card flex flex-col items-center justify-center text-center group/card cursor-pointer"
            >
              <div className="p-3 sm:p-5 rounded-full mb-3 sm:mb-4 transition-all duration-500 group-hover/card:scale-105 z-20" style={{ backgroundColor: "rgba(0, 119, 181, 0.1)" }}>
                <Linkedin size={28} className="sm:w-11 sm:h-11" style={{ color: "#0077B5" }} />
              </div>
              <h4 className="font-bold text-xs sm:text-lg tracking-wide z-20 transition-colors duration-300 group-hover/card:text-white" style={{ color: "#E8D5F5" }}>
                LinkedIn
              </h4>
              <p className="text-[10px] sm:text-sm mt-1 z-20 hidden sm:block" style={{ color: "#A78BCA" }}>
                Connect professionally
              </p>

              {/* Radiant inner floating neon glow effect that activates smoothly on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.15)_0%,transparent_75%)] pointer-events-none z-10"
              />

              {/* Decorative premium hover border highlight with animated magenta/purple outline */}
              <div className="absolute inset-0 border border-white/0 group-hover/card:border-[#CC00FF]/30 rounded-2xl transition-colors pointer-events-none duration-500 z-30" />
            </motion.a>

            <motion.a 
              href="https://www.youtube.com/@Revo-code"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                boxShadow: "0 22px 50px -10px rgba(204, 0, 255, 0.32), 0 0 20px 2px rgba(204, 0, 255, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              className="p-5 sm:p-8 rounded-xl sm:rounded-2xl gothic-card flex flex-col items-center justify-center text-center group/card cursor-pointer"
            >
              <div className="p-3 sm:p-5 rounded-full mb-3 sm:mb-4 transition-all duration-500 group-hover/card:scale-105 z-20" style={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }}>
                <Youtube size={28} className="sm:w-11 sm:h-11" style={{ color: "#FF0000" }} />
              </div>
              <h4 className="font-bold text-xs sm:text-lg tracking-wide z-20 transition-colors duration-300 group-hover/card:text-white" style={{ color: "#E8D5F5" }}>
                YouTube
              </h4>
              <p className="text-[10px] sm:text-sm mt-1 z-20 hidden sm:block" style={{ color: "#A78BCA" }}>
                Subscribe now
              </p>

              {/* Radiant inner floating neon glow effect that activates smoothly on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.15)_0%,transparent_75%)] pointer-events-none z-10"
              />

              {/* Decorative premium hover border highlight with animated magenta/purple outline */}
              <div className="absolute inset-0 border border-white/0 group-hover/card:border-[#CC00FF]/30 rounded-2xl transition-colors pointer-events-none duration-500 z-30" />
            </motion.a>

            <motion.a 
              href="https://x.com/revo_codes"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                boxShadow: "0 22px 50px -10px rgba(204, 0, 255, 0.32), 0 0 20px 2px rgba(204, 0, 255, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              className="p-5 sm:p-8 rounded-xl sm:rounded-2xl gothic-card flex flex-col items-center justify-center text-center group/card cursor-pointer"
            >
              <div className="p-3 sm:p-5 rounded-full mb-3 sm:mb-4 transition-all duration-500 group-hover/card:scale-105 z-20" style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
                <Twitter size={28} className="sm:w-11 sm:h-11" style={{ color: "#E8D5F5" }} />
              </div>
              <h4 className="font-bold text-xs sm:text-lg tracking-wide z-20 transition-colors duration-300 group-hover/card:text-white" style={{ color: "#E8D5F5" }}>
                X / Twitter
              </h4>
              <p className="text-[10px] sm:text-sm mt-1 z-20 hidden sm:block" style={{ color: "#A78BCA" }}>
                Follow me
              </p>

              {/* Radiant inner floating neon glow effect that activates smoothly on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.15)_0%,transparent_75%)] pointer-events-none z-10"
              />

              {/* Decorative premium hover border highlight with animated magenta/purple outline */}
              <div className="absolute inset-0 border border-white/0 group-hover/card:border-[#CC00FF]/30 rounded-2xl transition-colors pointer-events-none duration-500 z-30" />
            </motion.a>
          </div>
        </motion.section>

        {/* Section 2 — Skills */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-1.5 sm:p-2.5 rounded-xl flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}>
              <Cpu size={16} className="sm:w-5 sm:h-5" style={{ color: "#CC00FF" }} />
            </div>
            <h3 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "#E8D5F5" }}>
              Core Technical Skills
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      staggerChildren: 0.1,
                      delayChildren: 0.1
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -6,
                  boxShadow: "0 22px 50px -10px rgba(204, 0, 255, 0.3), 0 0 20px 2px rgba(204, 0, 255, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl gothic-card cursor-pointer select-none group/card"
              >
                <div className="flex items-center space-x-2.5 mb-3 sm:mb-4 z-20 relative">
                  {React.cloneElement(category.icon as React.ReactElement, { size: 14, className: "sm:w-4.5 sm:h-4.5" })}
                  <h4 className="font-bold text-[10px] sm:text-sm tracking-wide uppercase" style={{ color: "#E8D5F5" }}>
                    {category.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2.5 z-20 relative">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span 
                      key={sIdx}
                      variants={{
                        hidden: { opacity: 0, scale: 0.75, y: 12 },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          transition: { 
                            type: "spring", 
                            stiffness: 150, 
                            damping: 12 
                          } 
                        }
                      }}
                      className="px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-medium border inline-flex items-center space-x-1.5 sm:space-x-2 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#CC00FF]/40 transition-colors duration-200 cursor-pointer"
                      style={{
                        borderColor: "rgba(192, 132, 252, 0.15)",
                        color: "#E8D5F5"
                      }}
                    >
                      {getSkillIcon(skill)}
                      <span>{skill}</span>
                    </motion.span>
                  ))}
                </div>

                {/* Radiant inner floating neon glow effect that activates smoothly on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.12)_0%,transparent_75%)] pointer-events-none z-10"
                />

                {/* Decorative premium hover border highlight with animated magenta/purple outline */}
                <div className="absolute inset-0 border border-white/0 group-hover/card:border-[#CC00FF]/30 rounded-2xl transition-colors pointer-events-none duration-500 z-30" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4 — Stats */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}>
              <BarChart3 size={20} style={{ color: "#CC00FF" }} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight flex flex-wrap" style={{ color: "#E8D5F5" }}>
              {"Metrics & Info".split(" ").map((word, wordIdx) => (
                <motion.span
                  key={wordIdx}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: wordIdx * 0.1 } 
                    }
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h3>
          </div>

          <motion.div 
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.94 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 110, 
                      damping: 16 
                    } 
                  },
                }}
                whileHover={{ 
                  scale: 1.04, 
                  y: -6, 
                  boxShadow: "0 22px 50px -10px rgba(204, 0, 255, 0.3), 0 0 20px 2px rgba(204, 0, 255, 0.15)" 
                }}
                whileTap={{ scale: 0.98 }}
                className="p-5 rounded-2xl border flex flex-col justify-center h-28 cursor-pointer select-none group/card relative overflow-hidden transition-all duration-500 ease-out"
                style={{
                  backgroundColor: "rgba(123, 47, 190, 0.08)",
                  borderColor: "rgba(123, 47, 190, 0.25)"
                }}
              >
                <div className="z-20 relative">
                  <motion.span 
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
                    }}
                    className="text-xs font-medium tracking-wide uppercase mb-1 block" 
                    style={{ color: "#A78BCA" }}
                  >
                    {stat.label}
                  </motion.span>
                  <motion.span 
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.15 } }
                    }}
                    className="text-lg md:text-xl font-black tracking-tight block" 
                    style={{ color: "#E8D5F5" }}
                  >
                    {stat.value.match(/\d+/) ? (
                      <CountUp value={stat.value} />
                    ) : (
                      stat.value
                    )}
                  </motion.span>
                </div>

                {/* Radiant inner floating neon glow effect that activates smoothly on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.12)_0%,transparent_75%)] pointer-events-none z-10"
                />

                {/* Decorative premium hover border highlight with animated magenta/purple outline */}
                <div className="absolute inset-0 border border-white/0 group-hover/card:border-[#CC00FF]/30 rounded-2xl transition-colors pointer-events-none duration-500 z-30" />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Section 5 — Mission */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden p-[1.5px] select-none border border-[#CC00FF]/15"
          style={{
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            backgroundColor: "rgba(10, 0, 16, 0.96)"
          }}
        >
          {/* Subtle static ambient gradient for design depth with 0 frame performance cost */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#CC00FF]/10 via-transparent to-[#7B2FBE]/10 opacity-60 pointer-events-none" />

          {/* Actual Card content acting as inner mask */}
          <div 
            className="p-8 rounded-[15px] relative"
            style={{
              zIndex: 1,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}>
                <Rocket size={28} style={{ color: "#CC00FF" }} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1" style={{ color: "#E8D5F5" }}>Our Mission</h4>
                <p className="text-base leading-relaxed" style={{ color: "#A78BCA" }}>
                  Building <span className="font-semibold text-white">Baldwin</span> — a web services brand focused on delivering professional, AI-powered digital products at an exceptional speed.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
