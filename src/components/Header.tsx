import { useState } from "react";
import { motion } from "motion/react";

interface HeaderProps {
  currentTab: string; // e.g. 'home', 'work', 'about', 'contact', or 'project'
  onNavigate: (route: string) => void;
  showSplash?: boolean;
}

export default function Header({ currentTab, onNavigate, showSplash }: HeaderProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  const navItems = [
    { label: "Home", route: "#home", id: "home" },
    { label: "Work", route: "#work", id: "work" },
    { label: "About", route: "#about", id: "about" },
    { label: "Contact", route: "#contact", id: "contact" }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        {/* Left Side: Logo (src="/logo.webp") */}
        <div 
          onClick={() => handleNavClick("#home")}
          className="flex items-center cursor-pointer z-10 group min-w-[140px] h-12 sm:h-14 relative"
        >
          {!logoFailed ? (
            !showSplash && (
              <motion.div 
                layoutId="header-logo"
                className="h-12 sm:h-14 flex items-center justify-center"
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <img 
                  src="/logo.webp" 
                  alt="Baldwin Portfolio" 
                  className="h-12 sm:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-[1.04]"
                  onError={() => setLogoFailed(true)}
                />
              </motion.div>
            )
          ) : (
            /* Premium Fallback Design */
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-3xl sm:text-4xl font-black font-display uppercase tracking-wider text-[#CC00FF] [text-shadow:0_0_20px_rgba(204,0,255,0.6)]">
                B
              </span>
              <span className="text-sm sm:text-base font-bold font-display tracking-widest text-[#E8D5F5] uppercase hidden sm:inline">
                BALDWIN
              </span>
            </div>
          )}
        </div>

        {/* Absolute Centered Navigation Links (Visible on both Mobile & Desktop) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-4 sm:space-x-6 md:space-x-8 z-10">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || (item.id === "work" && currentTab === "project");
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.route)}
                className="text-[11px] sm:text-[13px] font-bold sm:font-semibold uppercase tracking-widest transition-colors duration-300 hover:text-[#E8D5F5] relative py-1 cursor-pointer whitespace-nowrap"
                style={{
                  color: isActive ? "#E8D5F5" : "#A78BCA",
                  textShadow: "0 1.5px 6px rgba(0, 0, 0, 0.95)"
                }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabSword"
                    className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center h-4 w-10 sm:w-12"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  >
                    <svg 
                      width="100%" 
                      height="12" 
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

        {/* Right side spacer for visual balance since nav is absolutely centered */}
        <div className="w-8 sm:w-12 h-8" />
      </div>
    </nav>
  );
}
