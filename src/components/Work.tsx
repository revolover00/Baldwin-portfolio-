import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "../types";
import { Store } from "../store";
import { Briefcase, ArrowRight, Video } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface WorkProps {
  onNavigate: (route: string) => void;
}

export default function Work({ onNavigate }: WorkProps) {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const translateCategory = (cat: string) => {
    if (cat === "All") return t("work_tag_all");
    if (cat === "Web Apps") return t("work_tag_web");
    if (cat === "Design") return t("work_tag_design");
    if (cat === "Tech Experiments") return t("work_tag_tech");
    return cat;
  };

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))].filter(Boolean);
  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

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

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

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
  } as const;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div 
          className="w-12 h-12 rounded-full border-4 animate-spin border-t-transparent" 
          style={{ borderColor: "rgba(123,47,190,0.2)", borderTopColor: "#CC00FF" }}
        />
        <p className="text-xs font-mono mt-4 uppercase tracking-widest text-[#A78BCA]">
          Retrieving Entities...
        </p>
      </div>
    );
  }

  return (
    <div id="work" className="relative min-h-screen px-4 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-10 sm:mb-16 max-w-2xl mx-auto"
      >
        <div 
          className="p-2 sm:p-3 rounded-xl mb-4"
          style={{ backgroundColor: "rgba(204, 0, 255, 0.1)" }}
        >
          <Briefcase size={24} className="sm:w-8 sm:h-8" style={{ color: "#CC00FF" }} />
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-3 sm:mb-4 [text-shadow:0_0_30px_rgba(204,0,255,0.4)]" style={{ color: "#E8D5F5" }}>
          {t("work_title")}
        </h1>
        <p className="text-xs sm:text-base leading-relaxed font-normal" style={{ color: "#A78BCA" }}>
          {t("work_subtitle")}
        </p>
      </motion.div>

      {/* Category Tabs */}
      {categories.length > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2 mb-8 sm:mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-[#CC00FF]/20 border-[#CC00FF]/50 text-white" 
                  : "bg-white/5 border-white/10 text-[#A78BCA] hover:bg-white/10 hover:text-[#E8D5F5]"
              }`}
            >
              {translateCategory(cat)}
            </button>
          ))}
        </motion.div>
      )}

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
        <div className="space-y-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          >
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                }}
                whileTap={{ scale: 0.96 }}
                className="group/card rounded-xl gothic-card flex flex-col cursor-pointer"
                onClick={() => onNavigate(`#project/${project.id}`)}
              >
                {/* Card Media Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#0A0010] flex items-center justify-center z-10">
                  {project.mediaUrl ? (
                    <img
                      src={project.mediaUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Video size={30} className="text-[#A78BCA]/30 transition-colors duration-300 group-hover/card:text-[#7B2FBE]/50 sm:w-10 sm:h-10" />
                    </div>
                  )}
                  
                  {/* Visual Accent Banner */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex space-x-2">
                    <span
                      className="text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border backdrop-blur-md"
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
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 
                    className="text-base sm:text-xl font-bold tracking-tight mb-1 sm:mb-2 group-hover:text-[#CC00FF] transition-colors duration-300"
                    style={{ color: "#E8D5F5" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs font-mono mb-2 sm:mb-4 text-[#A78BCA]">
                    {project.subtitle}
                  </p>
                  <p className="text-[11px] sm:text-sm line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 flex-grow" style={{ color: "#A78BCA" }}>
                    {project.description}
                  </p>

                  {/* Keyboard / Skills list tags */}
                  <div className="flex flex-wrap gap-1 mb-4 sm:gap-1.5 sm:mb-6">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[8px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded border"
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
                        className="text-[8px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded"
                        style={{
                          color: "#6B4F8A",
                        }}
                      >
                        +{project.skills.length - 3} {t("work_more_skills")}
                      </span>
                    )}
                  </div>

                  {/* Footer interactive prompt */}
                  <div className="flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider group-hover/card:translate-x-1 rtl:group-hover/card:-translate-x-1 transition-transform duration-300 mt-auto z-20" style={{ color: "#CC00FF" }}>
                    <span className="mr-1.5 rtl:mr-0 rtl:ml-1.5 whitespace-nowrap">{t("work_btn_details")}</span>
                    <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 rtl:rotate-180" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Show More Button */}
          {filteredProjects.length > 3 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center pt-4"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="group relative px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs overflow-hidden transition-all duration-300 gothic-card border border-[#CC00FF]/30 hover:border-[#CC00FF]/60 text-[#E8D5F5] hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#CC00FF]/0 via-[#CC00FF]/5 to-[#CC00FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10 flex items-center space-x-2 rtl:space-x-reverse">
                  <span>{showAll ? t("work_btn_show_less") : t("work_btn_view_all")}</span>
                  <ArrowRight size={14} className={`transition-transform duration-300 ${showAll ? "-rotate-90" : "rotate-90 sm:rotate-0 rtl:rotate-180"}`} />
                </span>
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
