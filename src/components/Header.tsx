import { useState } from "react";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  currentTab: string; // e.g. 'home', 'work', 'about', 'quote', or 'project'
  onNavigate: (route: string) => void;
  showSplash?: boolean;
}

export default function Header({ currentTab, onNavigate, showSplash }: HeaderProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t("home"), route: "#home", id: "home" },
    { label: t("work"), route: "#work", id: "work" },
    { label: t("about"), route: "#about", id: "about" },
    { label: t("quote"), route: "#quote", id: "quote" }
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
      style={{
        backgroundColor: "rgba(10, 0, 16, 0.5)",
        borderColor: "rgba(123, 47, 190, 0.25)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between relative">
        {/* Left Side: Logo (src="/logo.webp") */}
        <div 
          onClick={() => handleNavClick("#home")}
          className="flex items-center cursor-pointer z-10 group justify-start h-9 sm:h-14 relative shrink-0 sm:flex-1"
        >
          {!logoFailed ? (
            !showSplash && (
              <motion.div 
                layoutId="header-logo"
                className="h-9 sm:h-14 flex items-center justify-center"
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <img 
                  src="/logo.webp" 
                  alt="Baldwin Portfolio" 
                  className="h-9 sm:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-[1.04]"
                  onError={() => setLogoFailed(true)}
                />
              </motion.div>
            )
          ) : (
            /* Premium Fallback Design */
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-4xl font-black font-display uppercase tracking-wider text-[#CC00FF] [text-shadow:0_0_20px_rgba(204,0,255,0.6)]">
                B
              </span>
              <span className="text-[10px] sm:text-base font-bold font-display tracking-widest text-[#E8D5F5] uppercase hidden sm:inline">
                BALDWIN
              </span>
            </div>
          )}
        </div>

        {/* Absolute Centered Navigation Links (Visible on both Mobile & Desktop) */}
        <div className="flex items-center justify-center gap-1 sm:gap-4 md:gap-6 z-10 flex-grow sm:flex-none sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || (item.id === "work" && currentTab === "project");
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.route)}
                className="text-[10px] sm:text-[13px] font-black sm:font-semibold uppercase ltr:tracking-widest rtl:tracking-normal transition-all duration-300 hover:text-white hover:bg-white/5 rounded-lg px-2 py-1.5 sm:px-4 sm:py-2 cursor-pointer whitespace-nowrap flex flex-col items-center justify-center relative touch-manipulation min-h-[40px]"
                style={{
                  color: isActive ? "#E8D5F5" : "#A78BCA",
                  textShadow: "0 1.5px 6px rgba(0, 0, 0, 0.95)"
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabSword"
                    className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center h-4 w-8 sm:w-12"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  >
                    <svg 
                      width="100%" 
                      height="8" 
                      viewBox="0 0 48 12" 
                      fill="none" 
                      className="drop-shadow-[0_0_6px_rgba(204,0,255,0.9)]"
                    >
                      {/* Pommel */}
                      <circle cx="5" cy="6" r="1.5" fill="#CC00FF" />
                      
                      {/* Handgrip */}
                      <line x1="6.5" y1="6" x2="13" y2="6" stroke="#E8D5F5" strokeWidth="1.2" />
                      
                      {/* Crossguard (Quillons) */}
                      <line x1="13" y1="2" x2="13" y2="10" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" />
                      
                      {/* Blade */}
                      <polygon 
                        points="13,4.6 41,4.6 46,6 41,7.4 13,7.4" 
                        fill="#F3E8FF" 
                        stroke="#CC00FF" 
                        strokeWidth="0.8" 
                      />
                    </svg>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right side: Language Switcher */}
        <div className="flex items-center justify-end z-20 shrink-0 sm:flex-1">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
