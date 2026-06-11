import React from "react";
import { motion } from "motion/react";
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
  Share2
} from "lucide-react";

export default function About() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 size={18} style={{ color: "#CC00FF" }} />,
      skills: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite"]
    },
    {
      title: "Backend & Database",
      icon: <Database size={18} style={{ color: "#CC00FF" }} />,
      skills: ["Supabase", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench size={18} style={{ color: "#CC00FF" }} />,
      skills: ["Git & GitHub", "Vercel", "Lovable AI", "Google AI Studio"]
    }
  ];

  const stats = [
    { label: "GitHub Repos", value: "17+" },
    { label: "Primary Stack", value: "TypeScript" },
    { label: "Deployments", value: "Vercel" },
    { label: "Approach", value: "AI-powered builds" }
  ];

  return (
    <div 
      id="about-page" 
      className="relative min-h-screen px-4 pt-[110px] md:pt-[130px] pb-24 md:px-8 max-w-5xl mx-auto z-10 selection:bg-[#CC00FF]/30 selection:text-[#E8D5F5]"
    >
      {/* Decorative localized purple/violet blur orbs */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="space-y-16">
        
        {/* Section 1 — Identity */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left max-w-3xl"
        >
          {/* Title badge with pulsing magenta dot */}
          <div 
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-mono tracking-wider uppercase"
            style={{
              backgroundColor: "rgba(123, 47, 190, 0.1)",
              borderColor: "rgba(204, 0, 255, 0.2)",
              color: "#E8D5F5"
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC00FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CC00FF]"></span>
            </span>
            <span>Vibe Coder</span>
          </div>

          <h2 className="text-4xl md:text-5.5xl font-black tracking-tight mb-4 select-none [text-shadow:0_0_30px_rgba(204,0,255,0.4)]" style={{ color: "#E8D5F5" }}>
            Baldwin Portfolio
          </h2>
          
          <p 
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#A78BCA" }}
          >
            I build full-stack web experiences using the latest AI tools. From idea to deployment — fast, clean, and professional.
          </p>
        </motion.section>

        {/* Social Channels Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}>
              <Share2 size={20} style={{ color: "#CC00FF" }} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: "#E8D5F5" }}>
              Social Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.a 
              href="https://www.linkedin.com/in/revo-code-6181283b5"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.90 }}
              className="p-8 rounded-2xl border flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
              style={{
                backgroundColor: "rgba(10, 0, 16, 0.8)",
                borderColor: "rgba(123, 47, 190, 0.2)"
              }}
            >
              <div className="p-5 rounded-full mb-4 transition-all group-hover:scale-95" style={{ backgroundColor: "rgba(0, 119, 181, 0.1)" }}>
                <Linkedin size={44} style={{ color: "#0077B5" }} />
              </div>
              <h4 className="font-bold text-lg tracking-wide animate-pulse" style={{ color: "#E8D5F5" }}>
                LinkedIn
              </h4>
              <p className="text-sm mt-1.5" style={{ color: "#A78BCA" }}>
                Connect professionally
              </p>
            </motion.a>

            <motion.a 
              href="https://www.youtube.com/@Revo-code"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.90 }}
              className="p-8 rounded-2xl border flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
              style={{
                backgroundColor: "rgba(10, 0, 16, 0.8)",
                borderColor: "rgba(123, 47, 190, 0.2)"
              }}
            >
              <div className="p-5 rounded-full mb-4 transition-all group-hover:scale-95" style={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }}>
                <Youtube size={44} style={{ color: "#FF0000" }} />
              </div>
              <h4 className="font-bold text-lg tracking-wide animate-pulse" style={{ color: "#E8D5F5" }}>
                YouTube
              </h4>
              <p className="text-sm mt-1.5" style={{ color: "#A78BCA" }}>
                Subscribe to our channel
              </p>
            </motion.a>

            <motion.a 
              href="https://x.com/revo_codes"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.90 }}
              className="p-8 rounded-2xl border flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
              style={{
                backgroundColor: "rgba(10, 0, 16, 0.8)",
                borderColor: "rgba(123, 47, 190, 0.2)"
              }}
            >
              <div className="p-5 rounded-full mb-4 transition-all group-hover:scale-95" style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
                <Twitter size={44} style={{ color: "#E8D5F5" }} />
              </div>
              <h4 className="font-bold text-lg tracking-wide animate-pulse" style={{ color: "#E8D5F5" }}>
                X / Twitter
              </h4>
              <p className="text-sm mt-1.5" style={{ color: "#A78BCA" }}>
                Follow for updates
              </p>
            </motion.a>
          </div>
        </motion.section>

        {/* Section 2 — Skills */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}>
              <Cpu size={20} style={{ color: "#CC00FF" }} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: "#E8D5F5" }}>
              Core Technical Skills
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.91 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border cursor-pointer select-none"
                style={{
                  backgroundColor: "rgba(10, 0, 16, 0.8)",
                  borderColor: "rgba(123, 47, 190, 0.2)"
                }}
              >
                <div className="flex items-center space-x-2.5 mb-4">
                  {category.icon}
                  <h4 className="font-bold text-sm tracking-wide uppercase" style={{ color: "#E8D5F5" }}>
                    {category.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: "rgba(123, 47, 190, 0.1)",
                        borderColor: "rgba(204, 0, 255, 0.2)",
                        color: "#E8D5F5"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4 — Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl flex items-center justify-center animate-pulse" style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}>
              <BarChart3 size={20} style={{ color: "#CC00FF" }} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: "#E8D5F5" }}>
              Metrics & Info
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 0.93 }}
                whileTap={{ scale: 0.88 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl border flex flex-col justify-center h-28 cursor-pointer select-none"
                style={{
                  backgroundColor: "rgba(123, 47, 190, 0.08)",
                  borderColor: "rgba(123, 47, 190, 0.15)"
                }}
              >
                <span className="text-xs font-medium tracking-wide uppercase mb-1" style={{ color: "#A78BCA" }}>
                  {stat.label}
                </span>
                <span className="text-lg md:text-xl font-black tracking-tight" style={{ color: "#E8D5F5" }}>
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5 — Mission */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden p-[1.5px] select-none"
          style={{
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}
        >
          {/* Rotating glow border effect trailing strictly along the border */}
          <div className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none" style={{ zIndex: 0 }}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 20%, #CC00FF 38%, #FF00E4 44%, #E8D5F5 48%, #7B2FBE 60%, transparent 80%)",
                transformOrigin: "center center",
                filter: "blur(6px) drop-shadow(0 0 10px rgba(204, 0, 255, 0.95))",
                opacity: 0.95
              }}
            />
          </div>

          {/* Actual Card content acting as inner mask */}
          <div 
            className="p-8 rounded-[15px] relative"
            style={{
              backgroundColor: "rgba(10, 0, 16, 0.96)",
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
