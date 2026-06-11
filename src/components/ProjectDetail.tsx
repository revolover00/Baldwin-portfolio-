import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Globe, BadgeCheck, FileText, LayoutGrid } from "lucide-react";
import { Store } from "../store";
import { Project } from "../types";

interface ProjectDetailProps {
  projectId: string;
  onNavigate: (route: string) => void;
}

export default function ProjectDetail({ projectId, onNavigate }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = Store.getProjectById(projectId);
    setProject(found || null);
    setIsLoading(false);
  }, [projectId]);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[80vh] flex flex-col items-center justify-center"
      >
        {/* Loading spinner with customized border colour */}
        <div 
          className="w-12 h-12 rounded-full border-4 animate-spin border-t-transparent" 
          style={{ borderColor: "rgba(123,47,190,0.2)", borderTopColor: "#CC00FF" }}
        />
        <p className="text-xs font-mono mt-4 uppercase tracking-widest text-[#6B4F8A]">
          Initializing Stream...
        </p>
      </motion.div>
    );
  }

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center selection:bg-purple-500/30 selection:text-[#E8D5F5]"
      >
        <h2 className="text-2xl font-black uppercase tracking-tight mb-2 text-[#E8D5F5]">
          Entity Not Found
        </h2>
        <p className="text-sm max-w-sm mb-6 text-[#A78BCA]">
          The project identifier does not correlate with any active entry in Baldwin's core storage.
        </p>
        <button
          onClick={() => onNavigate("#work")}
          className="text-sm font-mono font-bold uppercase tracking-wider underline text-purple-400 hover:text-[#E8D5F5] transition-colors"
        >
          Return to Selected Work
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut"
      }}
      className="relative min-h-screen pt-20 pb-16 selection:bg-purple-500/30 selection:text-[#E8D5F5]"
    >
      {/* Simple Sub-Navbar */}
      <header 
        className="sticky top-20 z-40 backdrop-blur-md border-b px-4 py-4 md:px-8"
        style={{
          backgroundColor: "rgba(10, 0, 16, 0.85)",
          borderColor: "rgba(123, 47, 190, 0.15)"
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate("#work")}
            className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 group cursor-pointer"
            style={{ color: "#A78BCA" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#E8D5F5"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#A78BCA"}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Work</span>
          </button>
          <div className="text-[10px] font-mono tracking-widest text-[#6B4F8A]/60 uppercase">
            Project Node: ID_#{project.id.toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 pt-12 md:px-8 space-y-12">
        
        {/* Project Header Metrics */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Custom Category Badge - completely override greens */}
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{
                backgroundColor: "rgba(204, 0, 255, 0.1)",
                borderColor: "rgba(204, 0, 255, 0.2)",
                color: "#CC00FF"
              }}
            >
              {project.category}
            </span>

            {/* Subtitle tag */}
            <span className="text-xs font-mono text-[#A78BCA]/80">
              {project.subtitle}
            </span>
          </div>

          {/* Project Title with custom gradient styling */}
          <h1 
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{
              backgroundImage: "linear-gradient(to right, #E8D5F5, #A78BCA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {project.title}
          </h1>
        </section>

        {/* Main Media Container */}
        <section 
          className="rounded-2xl border overflow-hidden shadow-2xl backdrop-blur-sm relative aspect-video w-full flex items-center justify-center bg-[#0a0010]"
          style={{
            borderColor: "rgba(123, 47, 190, 0.2)",
            backgroundColor: "rgba(10, 0, 16, 0.9)",
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.6)"
          }}
        >
          {project.mediaUrl ? (
            <img 
              src={project.mediaUrl} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="text-center p-6 flex flex-col items-center">
              <div className="p-4 rounded-full bg-purple-600/10 mb-3 text-[#CC00FF]">
                <Globe size={40} />
              </div>
              <p className="text-sm text-[#E8D5F5] font-medium font-mono">MEDIA EMULATOR ACTIVE</p>
            </div>
          )}
        </section>

        {/* Content Details: Split Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Detailed Narrative Section */}
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-lg font-bold tracking-wider uppercase border-b pb-2 flex items-center space-x-2" style={{ color: "#E8D5F5", borderColor: "rgba(123, 47, 190, 0.15)" }}>
              <FileText size={16} className="text-[#CC00FF]" />
              <span>Project Overview</span>
            </h3>
            
            <div className="text-[#A78BCA] text-sm leading-relaxed whitespace-pre-line space-y-4">
              {project.detailedDescription}
            </div>
          </div>

          {/* Sidebar Specifications block */}
          <div className="md:col-span-4 space-y-8">
            {/* Tech details card */}
            <div 
              className="p-6 rounded-xl border space-y-5"
              style={{
                borderColor: "rgba(123, 47, 190, 0.15)",
                backgroundColor: "rgba(10, 0, 16, 0.7)"
              }}
            >
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#E8D5F5]">
                METRICS & TECH SPECS
              </h4>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B4F8A] block mb-1.5">
                    Engineered With:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map(skill => (
                      <span 
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border"
                        style={{
                          backgroundColor: "rgba(123, 47, 190, 0.05)",
                          borderColor: "rgba(123, 47, 190, 0.15)",
                          color: "#E8D5F5"
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px" style={{ backgroundColor: "rgba(123, 47, 190, 0.15)" }} />

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B4F8A] block mb-1">
                    Environment Deployment:
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-[#E8D5F5]">
                    <BadgeCheck size={14} className="text-[#CC00FF]" />
                    <span>Hardware Edge Accelerated</span>
                  </div>
                </div>
              </div>

              {project.websiteUrl && (
                <div className="pt-2">
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:bg-white cursor-pointer"
                    style={{
                      backgroundColor: "#E8D5F5",
                      color: "#0A0010"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(204, 0, 255, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(204, 0, 255, 0.15)";
                    }}
                  >
                    <span>Launch Live demo</span>
                    <Globe size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery detailing */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="space-y-6 pt-6">
            <h3 className="text-lg font-bold tracking-wider uppercase border-b pb-2 flex items-center space-x-2" style={{ color: "#E8D5F5", borderColor: "rgba(123, 47, 190, 0.15)" }}>
              <LayoutGrid size={16} className="text-[#CC00FF]" />
              <span>Project Interface Mockups</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((imgUrl, i) => (
                <div 
                  key={i}
                  className="rounded-xl border spill-hidden aspect-video overflow-hidden transition-all duration-300 group hover:border-[#CC00FF]/50 relative"
                  style={{
                    borderColor: "rgba(123, 47, 190, 0.2)",
                    backgroundColor: "rgba(10, 0, 16, 0.9)"
                  }}
                >
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} Interface ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-[#0A0010]/20 opacity-100 group-hover:opacity-0 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </motion.div>
  );
}
