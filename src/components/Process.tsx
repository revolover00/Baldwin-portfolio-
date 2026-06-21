import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position across the process section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Reactive nodes on the central line
  const node1Progress = useTransform(scrollYProgress, [0, 0.25], [0.15, 1]);
  const node2Progress = useTransform(scrollYProgress, [0.22, 0.48], [0.15, 1]);
  const node3Progress = useTransform(scrollYProgress, [0.45, 0.72], [0.15, 1]);
  const node4Progress = useTransform(scrollYProgress, [0.68, 0.95], [0.15, 1]);

  // Smooth, eye-pleasing ambient glow progressions matched with vertical scroll focus range
  const card1Glow = useTransform(scrollYProgress, [0, 0.15, 0.35], [0.15, 1, 0.25]);
  const card2Glow = useTransform(scrollYProgress, [0.18, 0.40, 0.62], [0.15, 1, 0.25]);
  const card3Glow = useTransform(scrollYProgress, [0.42, 0.65, 0.85], [0.15, 1, 0.25]);
  const card4Glow = useTransform(scrollYProgress, [0.68, 0.90, 1.0], [0.15, 1, 1]);

  const steps = [
    {
      icon: Search,
      title: "Discovery",
      desc: "Deep dive into your brand, audience, and goals.",
      align: "left",
      nodeProgress: node1Progress,
      nodeTop: "15%",
      cardGlow: card1Glow,
    },
    {
      icon: PenTool,
      title: "Design",
      desc: "Crafting the visual identity and user experience.",
      align: "right",
      nodeProgress: node2Progress,
      nodeTop: "40%",
      cardGlow: card2Glow,
    },
    {
      icon: Code2,
      title: "Build",
      desc: "Robust, performant engineering and animation.",
      align: "left",
      nodeProgress: node3Progress,
      nodeTop: "65%",
      cardGlow: card3Glow,
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Deployment, optimization, and handoff.",
      align: "right",
      nodeProgress: node4Progress,
      nodeTop: "90%",
      cardGlow: card4Glow,
    },
  ];

  return (
    <div 
      ref={sectionRef}
      className="w-full z-10 selection:bg-[#CC00FF]/20 selection:text-white relative"
    >
      {/* Column section header */}
      <div className="flex flex-col mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start gap-3"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#CC00FF] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E8D5F5]">
              Process
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2 font-display">
            How I Work
          </h2>
          <p className="text-xs sm:text-sm text-[#A78BCA] max-w-xl leading-relaxed">
            A streamlined approach from raw concept to a polished, high-performance web experience.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-8 sm:mt-12 pb-16 sm:pb-32">
        {/* CENTRAL PROGRESS LINE SPINE FOR BOTH MOBILE & DESKTOP */}
        <div className="absolute left-1/2 top-[5%] bottom-[5%] w-[1px] -translate-x-1/2 bg-white/10 pointer-events-none z-0">
          <motion.div 
            className="w-full bg-gradient-to-b from-[#CC00FF] via-[#7B2FBE] to-[#CC00FF] origin-top"
            style={{ 
              height: "100%",
              scaleY: scrollYProgress,
              boxShadow: "0 0 12px #CC00FF, 0 0 4px #CC00FF",
              filter: "blur(0.5px)"
            }}
          />

          {/* Glowing node checkpoints */}
          {steps.map((step, idx) => (
            <motion.div
              key={`node-${idx}`}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#130d1d] border-2 border-white/10 flex items-center justify-center"
              style={{ 
                top: step.nodeTop,
              }}
            >
              <motion.div 
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#CC00FF]"
                style={{ 
                  scale: step.nodeProgress, 
                  opacity: step.nodeProgress,
                  boxShadow: "0 0 8px #CC00FF"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* 2X2 CARDS GRID (FORCE Grid Columns 2 even on phones) */}
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12 lg:gap-x-24 gap-y-12 sm:gap-y-16 relative z-10">
          {steps.map((step, index) => {
            const isLeft = step.align === "left";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                className={`relative flex flex-col items-center ${
                  index % 2 === 0 ? "justify-self-end" : "justify-self-start"
                } w-full max-w-[280px] sm:max-w-md ${
                  index % 2 === 1 ? "translate-y-16 sm:translate-y-24 md:translate-y-32" : ""
                } ${
                  index > 1 ? "mt-4 sm:mt-12 md:mt-16" : ""
                }`}
              >
                {/* BRANCH CONNECTING LINE TO CENTER (Scaled mathematically with layout gap sizes) */}
                {isLeft ? (
                  <div className="absolute right-[-8px] sm:right-[-24px] lg:right-[-48px] top-[32px] sm:top-[48px] w-[8px] sm:w-[24px] lg:w-[48px] h-[1px] bg-white/15 pointer-events-none z-0">
                    <motion.div 
                      className="h-full bg-[#CC00FF]"
                      style={{ 
                        scaleX: step.nodeProgress,
                        originX: 1,
                        opacity: step.nodeProgress,
                        boxShadow: "0 0 4px #CC00FF"
                      }}
                    />
                  </div>
                ) : (
                  <div className="absolute left-[-8px] sm:left-[-24px] lg:left-[-48px] top-[32px] sm:top-[48px] w-[8px] sm:w-[24px] lg:w-[48px] h-[1px] bg-white/15 pointer-events-none z-0">
                    <motion.div 
                      className="h-full bg-[#CC00FF]"
                      style={{ 
                        scaleX: step.nodeProgress,
                        originX: 0,
                        opacity: step.nodeProgress,
                        boxShadow: "0 0 4px #CC00FF"
                      }}
                    />
                  </div>
                )}
                {/* THE CORE STEP CARD WITH AMBIENT SCROLL GLOW ("ITS TURN") */}
                <motion.div 
                  className="gothic-card rounded-xl sm:rounded-2xl p-3 sm:p-6 lg:p-8 flex flex-col group relative z-10 backdrop-blur-md transition-colors duration-300 border shadow-xl overflow-hidden"
                  style={{
                    borderColor: useTransform(step.cardGlow, [0.15, 1], ["rgba(255,255,255,0.04)", "rgba(204,0,255,0.35)"]),
                    boxShadow: useTransform(step.cardGlow, [0.15, 1], [
                      "0 15px 35px -15px rgba(0,0,0,0.8)",
                      "0 0 30px -5px rgba(204,0,255,0.15), 0 15px 35px -15px rgba(0,0,0,0.95)"
                    ]),
                    backgroundColor: useTransform(step.cardGlow, [0.15, 1], [
                      "rgba(14, 7, 21, 0.4)",
                      "rgba(24, 10, 40, 0.55)"
                    ])
                  }}
                >
                  {/* Subtle radial light core backdrop that turns on when active */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none -z-10"
                    style={{
                      opacity: useTransform(step.cardGlow, [0.15, 1], [0, 0.85]),
                      background: "radial-gradient(130% 130% at 50% 50%, rgba(204, 0, 255, 0.08) 0%, rgba(123, 47, 190, 0.02) 50%, transparent 100%)"
                    }}
                  />

                  {/* Step counter / icon */}
                  <div className="flex items-center justify-between mb-4 sm:mb-8 lg:mb-10">
                    <motion.div 
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        borderColor: useTransform(step.cardGlow, [0.15, 1], ["rgba(255,255,255,0.1)", "rgba(204,0,255,0.45)"]),
                        backgroundColor: useTransform(step.cardGlow, [0.15, 1], ["rgba(255,255,255,0.03)", "rgba(204,0,255,0.08)"])
                      }}
                    >
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#A78BCA] group-hover:text-[#CC00FF] transition-colors" />
                    </motion.div>
                    <motion.span 
                      className="text-[#CC00FF] font-display font-black text-xl sm:text-3xl lg:text-4xl group-hover:text-[#E8D5F5] transition-all duration-300"
                      style={{
                        textShadow: useTransform(step.cardGlow, [0.15, 1], [
                          "0 0 6px rgba(204,0,255,0.3)",
                          "0 0 18px rgba(204,0,255,0.85)"
                        ]),
                        color: useTransform(step.cardGlow, [0.15, 1], ["#A78BCA", "#CC00FF"])
                      }}
                    >
                      0{index + 1}
                    </motion.span>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-[11px] sm:text-lg lg:text-xl font-bold uppercase tracking-wide text-[#E8D5F5] mb-1 sm:mb-2 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs lg:text-sm text-[#A78BCA] leading-relaxed relative">
                    {step.desc}
                  </p>

                  {/* Glow accent bottom border */}
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#CC00FF]/0 to-transparent group-hover:via-[#CC00FF]/40 transition-all duration-500" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
