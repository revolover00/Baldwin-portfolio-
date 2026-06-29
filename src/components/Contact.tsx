import React, { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { Store, escapeHtml } from "../store";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<"form" | "success" | "cooldown">("form");
  const [cooldown, setCooldown] = useState(0);

  const [errorMsg, setErrorMsg] = useState("");

  // Load remaining cooldown from session if page is reloaded
  useEffect(() => {
    const savedCooldown = localStorage.getItem("contact_cooldown_end");
    if (savedCooldown) {
      const end = parseInt(savedCooldown, 10);
      const remaining = Math.ceil((end - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
        setFormState("cooldown"); // Correctly set to cooldown only, not false positive "success" state
      }
    }
  }, []);

  // Cooldown decrement loop
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (cooldown === 0 && (formState === "success" || formState === "cooldown")) {
      // Cooldown finished, let them write another message
      localStorage.removeItem("contact_cooldown_end");
    }
  }, [cooldown, formState]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !subject.trim() || !body.trim()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const sanitizedEmail = escapeHtml(email.trim());
      const sanitizedSubject = escapeHtml(subject.trim());
      const sanitizedBody = escapeHtml(body.trim());

      await Store.saveMessage({
        senderEmail: sanitizedEmail,
        subject: sanitizedSubject,
        body: sanitizedBody
      });

      setIsSubmitting(false);
      setFormState("success");
      const cooldownDuration = 60 * 60 * 5; // 5 hours cooldown limit (18,000 seconds)
      setCooldown(cooldownDuration);
      localStorage.setItem("contact_cooldown_end", (Date.now() + cooldownDuration * 1000).toString());
      
      // Reset states
      setEmail("");
      setSubject("");
      setBody("");
    } catch (err: any) {
      console.error("Error saving message to Supabase:", err);
      setIsSubmitting(false);
      setErrorMsg(err.message || "Failed to submit message. Please check the fields (length of message must be valid and email formatted correctly) and try again.");
    }
  };

  return (
    <div 
      id="quote" 
      className="relative min-h-screen px-4 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:px-8 max-w-3xl mx-auto z-10 flex flex-col justify-center selection:bg-[#CC00FF]/20 selection:text-white"
    >
      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="gothic-card rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl"
      >
        {/* Inner top-right decorative blur card element */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-purple-500/10 blur-2xl pointer-events-none -z-10" />

        {formState === "success" ? (
          /* SUCCESS STATE */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-6"
          >
            {/* Pulsing visual check container */}
            <div className="relative mb-6 flex items-center justify-center">
              <span className="absolute animate-ping inline-flex h-16 w-16 rounded-full opacity-75 border" style={{ borderColor: "rgba(204, 0, 255, 0.3)" }} />
              <div 
                className="relative rounded-full p-4 border flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(204, 0, 255, 0.1)",
                  borderColor: "rgba(204, 0, 255, 0.2)"
                }}
              >
                <CheckCircle2 size={36} style={{ color: "#CC00FF" }} />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black uppercase mb-3 tracking-tight" style={{ color: "#E8D5F5" }}>
              Message Transmitted
            </h2>
            <p className="text-sm max-w-md mb-8 leading-relaxed" style={{ color: "#A78BCA" }}>
              Your digital transmission has bypassed defensive protocols and entered the Baldwin storage stack. We will analyze your query soon.
            </p>

            {/* Cooldown container Box */}
            <div 
              className="rounded-xl px-6 py-4 border max-w-sm w-full flex flex-col items-center justify-center"
              style={{
                backgroundColor: "rgba(123, 47, 190, 0.1)",
                borderColor: "rgba(123, 47, 190, 0.2)"
              }}
            >
              <div className="flex items-center space-x-2 text-xs font-mono uppercase mb-1" style={{ color: "#A78BCA" }}>
                <ShieldCheck size={14} style={{ color: "#CC00FF" }} />
                <span>Rate-Limit Protocol ACTIVE</span>
              </div>
              <p className="text-xs text-center" style={{ color: "#A78BCA" }}>
                Next transmission available in:{" "}
                <span className="font-bold underline text-sm" style={{ color: "#CC00FF" }}>
                  {cooldown > 0 ? (
                    (() => {
                      const h = Math.floor(cooldown / 3600);
                      const m = Math.floor((cooldown % 3600) / 60);
                      const s = cooldown % 60;
                      if (h > 0) return `${h}h ${m}m ${s}s`;
                      if (m > 0) return `${m}m ${s}s`;
                      return `${s}s`;
                    })()
                  ) : "0s (Ready!)"}
                </span>
              </p>
            </div>

            {cooldown === 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setFormState("form")}
                className="mt-6 text-xs font-mono font-bold uppercase tracking-wider underline hover:text-[#ECE6F4] transition-colors"
                style={{ color: "#CC00FF" }}
              >
                Send Another Message
              </motion.button>
            )}
          </motion.div>
        ) : formState === "cooldown" ? (
          /* COOLDOWN STATE (PENDING COOLDOWN) */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-6"
          >
            <div className="relative mb-6 flex items-center justify-center">
              <div 
                className="relative rounded-full p-4 border flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(123, 47, 190, 0.1)",
                  borderColor: "rgba(123, 47, 190, 0.25)"
                }}
              >
                <ShieldCheck size={36} style={{ color: "#CC00FF" }} />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black uppercase mb-3 tracking-tight" style={{ color: "#E8D5F5" }}>
              Transmission Link Blocked
            </h2>
            <p className="text-sm max-w-md mb-8 leading-relaxed" style={{ color: "#A78BCA" }}>
              To ensure cluster performance and avoid message flood, our communication frequency rate-limit is currently active for your client.
            </p>

            {/* Cooldown container Box */}
            <div 
              className="rounded-xl px-6 py-4 border max-w-sm w-full flex flex-col items-center justify-center"
              style={{
                backgroundColor: "rgba(123, 47, 190, 0.15)",
                borderColor: "rgba(204, 0, 255, 0.25)"
              }}
            >
              <div className="flex items-center space-x-2 text-xs font-mono uppercase mb-1" style={{ color: "#A78BCA" }}>
                <span>Rate-Limit Countdown</span>
              </div>
              <p className="text-xs text-center" style={{ color: "#A78BCA" }}>
                Time remaining:{" "}
                <span className="font-bold text-sm" style={{ color: "#CC00FF" }}>
                  {cooldown > 0 ? (
                    (() => {
                      const h = Math.floor(cooldown / 3600);
                      const m = Math.floor((cooldown % 3600) / 60);
                      const s = cooldown % 60;
                      if (h > 0) return `${h}h ${m}m ${s}s`;
                      if (m > 0) return `${m}m ${s}s`;
                      return `${s}s`;
                    })()
                  ) : "0s (Ready!)"}
                </span>
              </p>
            </div>

            {cooldown === 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setFormState("form")}
                className="mt-6 text-xs font-mono font-bold uppercase tracking-wider underline hover:text-[#ECE6F4] transition-colors"
                style={{ color: "#CC00FF" }}
              >
                Unlock Transmission Link
              </motion.button>
            )}
          </motion.div>
        ) : (
          /* FORM ENTRY STATE */
          <div>
            {/* Header section inside card */}
            <div className="flex flex-col items-center text-center gap-4 mb-6 sm:mb-8">
              <span className="p-2 sm:p-3 rounded-xl bg-[#CC00FF]/10">
                <Mail size={24} className="sm:w-6 sm:h-6 animate-pulse" style={{ color: "#CC00FF" }} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight [text-shadow:0_0_20px_rgba(204,0,255,0.4)]" style={{ color: "#E8D5F5" }}>
                  {language === "ar" ? "طلب عرض سعر" : "Request a Quote"}
                </h2>
                <p className="text-xs sm:text-sm mt-1 text-[#A78BCA] max-w-md mx-auto">
                  {language === "ar" 
                    ? "احصل على تسعير مفصل واستشارة مجانية لمشروعك الرقمي القادم" 
                    : "Get detailed pricing and consultation on your next digital product"}
                </p>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A78BCA]">
                  {language === "ar" ? "الرد عادةً خلال ٢٤ ساعة" : "Usually replies within 24h"}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Sender Email Input */}
              <div className="flex flex-col space-y-1.5 sm:space-y-2">
                <label htmlFor="email" className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ltr:text-left rtl:text-right" style={{ color: "#A78BCA" }}>
                  {language === "ar" ? "البريد الإلكتروني للمرسل" : "Sender Email Address"}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder={language === "ar" ? "your-address@domain.com" : "your-terminal-address@domain.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl border text-[11px] sm:text-sm font-mono transition-all duration-300 outline-none ltr:text-left rtl:text-right"
                  style={{
                    backgroundColor: "rgba(123, 47, 190, 0.08)",
                    borderColor: "rgba(123, 47, 190, 0.2)",
                    color: "#E8D5F5"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(204, 0, 255, 0.5)";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(204, 0, 255, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(123, 47, 190, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Subject Input */}
              <div className="flex flex-col space-y-1.5 sm:space-y-2">
                <label htmlFor="subject" className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ltr:text-left rtl:text-right" style={{ color: "#A78BCA" }}>
                  {language === "ar" ? "موضوع الرسالة" : "Transmission Subject"}
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder={language === "ar" ? "مثال: مشروع تطوير موقع تفاعلي" : "e.g. System Integration / Vibe Coding Project"}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl border text-[11px] sm:text-sm transition-all duration-300 outline-none ltr:text-left rtl:text-right"
                  style={{
                    backgroundColor: "rgba(123, 47, 190, 0.08)",
                    borderColor: "rgba(123, 47, 190, 0.2)",
                    color: "#E8D5F5"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(204, 0, 255, 0.5)";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(204, 0, 255, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(123, 47, 190, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message Body Input */}
              <div className="flex flex-col space-y-1.5 sm:space-y-2">
                <label htmlFor="body" className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ltr:text-left rtl:text-right" style={{ color: "#A78BCA" }}>
                  {language === "ar" ? "محتوى الرسالة" : "Message Payload"}
                </label>
                <textarea
                  id="body"
                  required
                  rows={4}
                  placeholder={language === "ar" ? "اكتب هنا تفاصيل مشروعك أو استفسارك..." : "Draft your digital package or query details here..."}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl border text-[11px] sm:text-sm leading-relaxed transition-all duration-300 outline-none resize-none ltr:text-left rtl:text-right"
                  style={{
                    backgroundColor: "rgba(123, 47, 190, 0.08)",
                    borderColor: "rgba(123, 47, 190, 0.2)",
                    color: "#E8D5F5"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(204, 0, 255, 0.5)";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(204, 0, 255, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(123, 47, 190, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {errorMsg && (
                <div 
                  className="p-4 rounded-xl border text-xs leading-relaxed font-mono"
                  style={{
                    backgroundColor: "rgba(224, 30, 90, 0.08)",
                    borderColor: "rgba(224, 30, 90, 0.25)",
                    color: "#FF5E8E"
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.01,
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 0 20px rgba(204,0,255,0.25)"
                }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 px-6 rounded-xl text-[11px] sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style={{
                  backgroundColor: "#E8D5F5",
                  color: "#0A0010"
                }}
              >
                <span>
                  {isSubmitting 
                    ? (language === "ar" ? "جاري الإرسال..." : "Transmitting...") 
                    : (language === "ar" ? "إرسال الرسالة" : "Send Transmission")}
                </span>
                {!isSubmitting && <Send size={13} className="sm:w-3.5 sm:h-3.5" />}
              </motion.button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
