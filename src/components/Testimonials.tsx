import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Outstanding technical depth and an exceptional eye for design. Delivered the project ahead of schedule and the visual polish was beyond our expectations.",
      author: "Hassan M.",
      role: "Khamsat Client"
    },
    {
      text: "The web application performance improved drastically, and the new UI feels incredibly premium. True frontend craftsmanship.",
      author: "Sarah J.",
      role: "Freelance Client"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10 selection:bg-[#CC00FF]/20 selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E8D5F5]">
            Client Feedback
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2 font-display">
          Social Proof
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {testimonials.map((test, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
            className="gothic-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="z-20 relative">
              <Quote size={24} className="text-[#CC00FF]/40 mb-4" />
              <p className="text-sm sm:text-base text-[#A78BCA] italic leading-relaxed mb-6">
                "{test.text}"
              </p>
            </div>
            <div className="flex flex-col z-20 relative border-t border-white/5 pt-4">
              <span className="font-bold text-[#E8D5F5]">{test.author}</span>
              <span className="text-xs text-[#7B2FBE]">{test.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
