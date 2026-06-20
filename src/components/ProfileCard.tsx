import React from "react";
import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 35 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 30px 70px -10px rgba(204, 0, 255, 0.4), 0 0 35px 5px rgba(204, 0, 255, 0.25)"
      }}
      className="relative w-full max-w-[340px] h-[480px] rounded-[36px] overflow-hidden border border-white/10 group/card cursor-pointer transition-shadow"
      style={{
        boxShadow: "0 25px 60px -15px rgba(204, 0, 255, 0.15)",
      }}
    >
      {/* Background Cinematic Portrait */}
      <img
        src="/flux-2-pro_a_A_cinematic_portrait.jpeg"
        alt="Baldwin Cinematic Portrait"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover rounded-[36px] transition-transform duration-700 group-hover/card:scale-105"
      />

      {/* Cinematic Fog & Dark vignette overlay matching the card on the right */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#06010a] via-[#06010a]/80 to-transparent rounded-[36px]"
        style={{
          background: "linear-gradient(180deg, rgba(6,1,10,0) 0%, rgba(6,1,10,0.3) 45%, rgba(6,1,10,0.85) 75%, rgba(6,1,10,0.98) 100%)"
        }}
      />

      {/* Radiant inner floating neon glow effect that activates smoothly on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(204,0,255,0.18)_0%,transparent_75%)] pointer-events-none z-10"
      />

      {/* Profile Card Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 select-none pb-12">
        
        {/* Name and Verified Badge */}
        <div className="flex items-center space-x-2.5 mb-2">
          <h3 className="text-2xl font-bold tracking-wide text-white font-display">
            Baldwin
          </h3>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center shrink-0"
          >
            {/* White checked badge icon matching the right card perfectly */}
            <BadgeCheck size={20} className="text-white fill-[#CC00FF]/10" />
          </motion.div>
        </div>

        {/* Short description */}
        <p className="text-sm leading-relaxed text-white/70 font-sans">
          A Full-Stack Vibe Coder crafting high-fidelity digital solutions.
        </p>

      </div>

      {/* Decorative premium hover border highlight with animated magenta/purple pulse on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover/card:border-[#CC00FF]/30 rounded-[36px] transition-colors pointer-events-none duration-500 z-30" />
    </motion.div>
  );
}
