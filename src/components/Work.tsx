import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Project } from "../types";
import { Store } from "../store";
import { Briefcase, ArrowRight, Video } from "lucide-react";

interface WorkProps {
  onNavigate: (route: string) => void;
}

export default function Work({ onNavigate }: WorkProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    
    Store.getProjects().then((data) => {
      if (active) {
        setProjects(data);
        setIsLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div 
          className="w-12 h-12 rounded-full border-4 animate-spin border-t-transparent" 
          style={{ borderColor: "rgba(123,47,190,0.2)", borderTopColor: "#CC00FF" }}
        />
        <p className="text-xs font-mono mt-4 uppercase tracking-widest text-[#6B4F8A]">
          Retrieving Entities...
        </p>
      </div>
    );
  }

  return (
    <div id="work-page" className="relative min-h-screen px-4 pt-[110px] md:pt-[130px] pb-12 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-3 mb-10"
      >
        <div 
          className="p-2.5 rounded-lg"
          style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}
        >
          <Briefcase size={28} style={{ color: "#CC00FF" }} />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "#E8D5F5" }}>
            Selected Work
          </h1>
          <p className="text-sm mt-1" style={{ color: "#A78BCA" }}>
            A curated showcase of high-performance digital creations and code craft
          </p>
        </div>
      </motion.div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl p-12 text-center border"
          style={{
            borderColor: "rgba(168, 85, 247, 0.2)", // border-purple-500/20 approx
            backgroundColor: "rgba(123, 47, 190, 0.05)",
          }}
        >
          <p className="text-lg font-medium" style={{ color: "#E8D5F5" }}>
            No projects found.
          </p>
          <p className="text-sm mt-1" style={{ color: "#A78BCA" }}>
            Check back later for new releases.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                boxShadow: "0 0 30px rgba(204, 0, 255, 0.12)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group rounded-xl border flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-sm cursor-pointer"
              style={{
                backgroundColor: "rgba(10, 0, 16, 0.8)",
                borderColor: "rgba(123, 47, 190, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(204, 0, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(123, 47, 190, 0.2)";
              }}
              onClick={() => onNavigate(`#project/${project.id}`)}
            >
              {/* Card Media Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#0A0010] flex items-center justify-center">
                {project.mediaUrl ? (
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Video size={40} className="text-[#6B4F8A]/30 transition-colors duration-300 group-hover:text-[#7B2FBE]/50" />
                  </div>
                )}
                
                {/* Visual Accent Banner */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md"
                    style={{
                      backgroundColor: "rgba(204, 0, 255, 0.15)",
                      borderColor: "rgba(204, 0, 255, 0.25)",
                      color: "#CC00FF",
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 
                  className="text-xl font-bold tracking-tight mb-2 group-hover:text-[#CC00FF] transition-colors duration-300"
                  style={{ color: "#E8D5F5" }}
                >
                  {project.title}
                </h3>
                <p className="text-xs font-mono mb-4 text-[#6B4F8A]">
                  {project.subtitle}
                </p>
                <p className="text-sm line-clamp-3 mb-6 flex-grow" style={{ color: "#A78BCA" }}>
                  {project.description}
                </p>

                {/* Keyboard / Skills list tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: "rgba(123, 47, 190, 0.05)",
                        borderColor: "rgba(123, 47, 190, 0.15)",
                        color: "#6B4F8A",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{
                        color: "#6B4F8A",
                      }}
                    >
                      +{project.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer interactive prompt */}
                <div className="flex items-center text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300 mt-auto" style={{ color: "#CC00FF" }}>
                  <span className="mr-1.5">View Project Details</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
