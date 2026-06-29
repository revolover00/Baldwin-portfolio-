import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "EN" as Language, label: "English", flag: "🇺🇸" },
    { code: "AR" as Language, label: "العربية", flag: "🇸🇦" }
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-[13px] font-semibold transition-all duration-300 hover:bg-white/10"
        style={{
          color: "#E8D5F5",
          backgroundColor: "rgba(20, 10, 30, 0.7)",
          border: "1px solid rgba(204, 0, 255, 0.25)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.label}</span>
        <span className="inline sm:hidden text-[10px]">{currentLang.code}</span>
        <ChevronDown size={14} className={`text-[#CC00FF] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute ltr:right-0 rtl:left-0 top-full mt-2 w-44 rounded-xl border p-1"
            style={{
              backgroundColor: "rgba(10, 2, 18, 0.95)",
              borderColor: "rgba(204, 0, 255, 0.35)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 15px rgba(204, 0, 255, 0.1)"
            }}
          >
            {languages.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => handleSelect(l.code)}
                  className={`w-full ltr:text-left rtl:text-right px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                    isSelected 
                      ? "text-white bg-white/10" 
                      : "text-[#A78BCA] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.label}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-3 rounded-full bg-[#CC00FF] shadow-[0_0_8px_#CC00FF]" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
