import { motion } from "motion/react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: Search,
      title: "Discovery",
      desc: "Deep dive into your brand, audience, and goals.",
    },
    {
      icon: PenTool,
      title: "Design",
      desc: "Crafting the visual identity and user experience.",
    },
    {
      icon: Code2,
      title: "Build",
      desc: "Robust, performant engineering and animation.",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Deployment, optimization, and handoff.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10 selection:bg-[#CC00FF]/20 selection:text-white">
      <div className="flex flex-col mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-4"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#CC00FF] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E8D5F5]">
              Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-2 font-display">
            How I Work
          </h2>
          <p className="text-xs sm:text-base text-[#A78BCA] max-w-xl leading-relaxed">
            A streamlined approach from raw concept to a polished, high-performance web experience.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 mt-8 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="gothic-card rounded-2xl p-6 sm:p-8 flex flex-col group"
          >
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 z-20 group-hover:bg-[#CC00FF]/10 group-hover:border-[#CC00FF]/30">
                <step.icon size={20} className="text-[#A78BCA] group-hover:text-[#CC00FF] transition-colors" />
              </div>
              <span className="text-[#7B2FBE]/30 font-display font-black text-4xl group-hover:text-[#CC00FF]/20 transition-colors z-20">
                0{index + 1}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#E8D5F5] mb-2 z-20 group-hover:text-white transition-colors">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#A78BCA] leading-relaxed z-20 relative">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
