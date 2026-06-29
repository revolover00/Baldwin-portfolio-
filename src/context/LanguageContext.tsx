import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "AR";

export interface LanguageInfo {
  code: Language;
  label: string;
  flag: string;
}

export const languages: LanguageInfo[] = [
  { code: "EN", label: "English", flag: "✦ EN" },
  { code: "AR", label: "العربية", flag: "✦ AR" }
];

export const translations = {
  EN: {
    // Header
    home: "Home",
    work: "Work",
    about: "About",
    quote: "Get Quote",
    
    // Splash / General
    splash_title: "BALDWIN PORTFOLIO",
    splash_subtitle: "LOADING SYSTEM CONTENT",
    splash_ready: "SYSTEM INITIALIZED",
    splash_decrypting: "DECRYPTING SECURITY KEY...",
    splash_rendering: "RENDERING HIGH-DENSITY PARTICLES...",
    splash_optimizing: "OPTIMIZING SHADER COEFFICIENTS...",
    splash_loading: "LOADING COMPONENT MODULES...",

    // Home Section
    home_welcome: "Hi, I'm ",
    home_name: "Hi, I'm Baldwin",
    home_subtitle: "Building immersive digital experiences, interactive web applications, and visually stunning interfaces. Blending high-end design with advanced frontend craft.",
    home_btn_quote: "Get a Quote",
    home_btn_work: "View Work",

    // Work Section
    work_title: "Crafted Creations",
    work_subtitle: "Explore selected full-stack digital products, premium brand websites, and interactive design experiments vibe coded with absolute pixel precision.",
    work_btn_visit: "Visit Website",
    work_btn_case: "Case Study",
    work_tag_all: "All",
    work_tag_web: "Web Apps",
    work_tag_design: "Design",
    work_tag_tech: "Tech Experiments",

    // About Section
    about_title: "Baldwin Portfolio",
    about_subtitle: "A digital creator building the next generation of web interfaces, interactive components, and secure cloud apps. Here are my main fields of mastery.",
    about_card_title: "Baldwin",
    about_card_role: "Lead Interactive Vibe Coder",
    about_card_status: "Available for contract",
    about_card_location: "Austin, Texas",
    about_skills_header: "SKILLS & EXPERTISE",
    about_process_header: "MY WORKFLOW PROCESS",
    about_process_desc: "A meticulous, step-by-step approach to turning complex software concepts into fast, maintainable, high-fidelity production applications.",
    process_step1_title: "Discovery",
    process_step1_desc: "Deep dive into your brand, audience, and goals.",
    process_step2_title: "Design",
    process_step2_desc: "Crafting the visual identity and user experience.",
    process_step3_title: "Build",
    process_step3_desc: "Robust, performant vibe coding and animation.",
    process_step4_title: "Launch",
    process_step4_desc: "Deployment, optimization, and handoff.",

    // Testimonials
    testimonials_title: "Client Whispers",
    testimonials_subtitle: "Honest feedback from founders, product leaders, and design directors who experienced the premium vibe coding workflow.",
    testimonials_submit_header: "Share Your Feedback",
    testimonials_submit_desc: "Leave a testimonial of your experience working with me. It will be secured on the database instantly.",
    testimonials_name: "Full Name",
    testimonials_role: "Role & Company",
    testimonials_text: "Your Testimonial Message",
    testimonials_submit_btn: "Submit Testimonial",
    testimonials_submitting: "Securing feedback...",
    testimonials_success: "Testimonial submitted successfully!",

    // Contact
    contact_title: "Secure Comm Link",
    contact_subtitle: "Initiate direct encrypted message contact. Perfect for partnership proposals, project consultations, or direct vibe coding opportunities.",
    contact_form_title: "Direct Message Link",
    contact_form_desc: "Fields will undergo immediate sanitization before database insert.",
    contact_name: "Name",
    contact_email: "Email Address",
    contact_subject: "Subject / Objective",
    contact_message: "Encrypted Message Body",
    contact_btn_send: "Transmit Message",
    contact_sending: "Transmitting message...",
    contact_success: "Transmission complete. Message saved.",

    // Proje    project_btn_back: "Return to Console",
    project_category: "Category",
    project_role: "My Role",
    project_tech: "Technologies used",
    project_links: "Launch project",
    project_gallery: "Media Gallery",
    project_overview: "Project Overview",
    project_challenge: "Challenge & Solution",

    // Added Work items
    work_btn_details: "View Details",
    work_btn_show_less: "Show Less",
    work_btn_view_all: "View All Projects",
    work_more_skills: "More Skills"
  },
  AR: {
    // Header
    home: "الرئيسية",
    work: "شغلي",
    about: "عني",
    quote: "طلب سعر",

    // Splash / General
    splash_title: "بورتفوليو بالدوين",
    splash_subtitle: "بفتح السيستم وبحمل المحتوى...",
    splash_ready: "السيستم جاهز وشغال!",
    splash_decrypting: "بفك تشفير مفتاح الأمان المباشر...",
    splash_rendering: "برندر جزيئات الشاشة عالية الدقة...",
    splash_optimizing: "بظبط كفاءة مؤثرات وظلال العرض...",
    splash_loading: "بحمل الأكواد ومكونات الصفحة...",

    // Home Section
    home_welcome: "أهلاً بيك، أنا ",
    home_name: "أهلاً بيك، أنا بالدوين",
    home_subtitle: "بصمم وببني تجارب رقمية غامرة، تطبيقات ويب تفاعلية، وواجهات مستخدم شكلها يخطف العين. بدمج التصميم الراقي مع حرفية البرمجة المتقدمة.",
    home_btn_quote: "اطلب سعر مشروعك",
    home_btn_work: "شوف شغلي",

    // Work Section
    work_title: "مشاريعي",
    work_subtitle: "خدلك لفة في تطبيقات الويب المتكاملة، ومواقع البراندات الفاخرة، وتجاربي التفاعلية اللي برمجتها بنفسي بكل دقة.",
    work_btn_visit: "زور الموقع",
    work_btn_case: "دراسة الحالة",
    work_tag_all: "كله",
    work_tag_web: "تطبيقات الويب",
    work_tag_design: "تصميم",
    work_tag_tech: "تجارب تقنية",

    // About Section
    about_title: "أنا مين؟",
    about_subtitle: "أنا صانع ومطور رقمي ببني الجيل الجاي من واجهات الويب، والمكونات التفاعلية، وتطبيقات الكلاود الآمنة. دي أكتر مجالات أنا متمكن منها وبحبها.",
    about_card_title: "بالدوين",
    about_card_role: "فايب كودر رئيسي للواجهات التفاعلية",
    about_card_status: "جاهز للشغل والمشاريع الجديدة",
    about_card_location: "أوستن، تكساس",
    about_skills_header: "مهاراتي وخبراتي",
    about_process_header: "سير عملي وخطواتي",
    about_process_desc: "طريقتي المنظمة خطوة بخطوة عشان أحول فكرتك المعقدة لتطبيق سريع، مستقر، وجودته عالية جداً.",
    process_step1_title: "الاستكشاف وفهم فكرتك",
    process_step1_desc: "بدرس براندك، وجمهورك، وأهدافك كويس جداً.",
    process_step2_title: "التصميم والتجربة",
    process_step2_desc: "برسم الهوية البصرية وتجربة المستخدم اللي تخطف العين وتريحها.",
    process_step3_title: "البناء والبرمجة",
    process_step3_desc: "ببني كود قوي وسريع مع حركات وتأثيرات بصرية ممتازة.",
    process_step4_title: "الإطلاق والتسليم",
    process_step4_desc: "بشغل الموقع، وبظتب أداءه، وبسلمك كل حاجة على المفتاح جاهزة.",

    // Testimonials
    testimonials_title: "بيقولوا إيه عني؟",
    testimonials_subtitle: "كلام من القلب من شركاء نجاح ومؤسسين شركات جربوا يشتغلوا معايا وشافوا طريقتي في الفايب كودينج والبرمجة.",
    testimonials_submit_header: "قولي رأيك في شغلي",
    testimonials_submit_desc: "اكتب تقييمك لتجربة الشغل معايا. رأيك هيتحفظ في ثانية في قاعدة البيانات عندي بأمان.",
    testimonials_name: "اسمك بالكامل",
    testimonials_role: "وظيفتك وشركتك",
    testimonials_text: "رأيك وتقييمك",
    testimonials_submit_btn: "ابعت التقييم",
    testimonials_submitting: "بحفظ رأيك الجميل في قاعدة البيانات عندي...",
    testimonials_success: "تقييمك وصلني بنجاح! شكراً ليك جداً يا صديقي.",

    // Contact
    contact_title: "اتواصل معايا علطول",
    contact_subtitle: "ابعتلي رسالة مشفرة ومباشرة. ممتازة لو عندك مشروع جديد، أو عايز تستشيرني في حاجة، أو فرصة شغل فورية معايا.",
    contact_form_title: "ابعتلي رسالة مباشرة",
    contact_form_desc: "كل الخانات دي بأمنها وبنضفها فوراً قبل ما تدخل قاعدة البيانات عندي عشان أحمي بياناتك.",
    contact_name: "اسمك",
    contact_email: "إيميلك",
    contact_subject: "موضوع الرسالة",
    contact_message: "رسالتك المشفرة ليا",
    contact_btn_send: "ابعت الرسالة",
    contact_sending: "برسل رسالتك ليا دلوقتي...",
    contact_success: "رسالتك وصلتني بنجاح واتحفظت عندي!",

    // Project Details
    project_btn_back: "ارجع للوحة التحكم الرئيسية",
    project_category: "نوع المشروع",
    project_role: "دوري في المشروع",
    project_tech: "التقنيات اللي استخدمتها",
    project_links: "افتح المشروع",
    project_gallery: "معرض الصور والوسائط",
    project_overview: "نظرة عامة على اللي عملته",
    project_challenge: "التحدي وحلي الإبداعي بالفايب كودينج اللي عملته",

    // Added Work items
    work_btn_details: "شوف التفاصيل",
    work_btn_show_less: "عرض أقل",
    work_btn_view_all: "كل مشاريعي وشغلي",
    work_more_skills: "مهارات تانية"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.EN) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("preferred_language");
    if (saved === "AR" || saved === "EN") return saved;
    return "EN"; // English as default
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const isRtl = language === "AR";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language.toLowerCase();
    
    // Smoothly apply Arabic font style
    if (isRtl) {
      document.body.style.fontFamily = "'Cairo', 'Plus Jakarta Sans', sans-serif";
      // Let's add Google Cairo font dynamically if not loaded
      if (!document.getElementById("google-cairo-font")) {
        const link = document.createElement("link");
        link.id = "google-cairo-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap";
        document.head.appendChild(link);
      }
    } else {
      document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    }
  }, [language, isRtl]);

  const t = (key: keyof typeof translations.EN): string => {
    const dict = translations[language];
    return dict[key] || translations.EN[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
