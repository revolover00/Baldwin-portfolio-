import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function SEO() {
  const { language } = useLanguage();

  useEffect(() => {
    // 1. Language-specific content
    const isAr = language === "AR";
    const title = isAr 
      ? "بالدوين | بورتفوليو مطور ويب متكامل ومبرمج واجهات تفاعلية" 
      : "Baldwin | Premium Interactive Developer & Vibe Coder Portfolio";
      
    const description = isAr
      ? "معرض أعمال رقمي متطور ومحترف يعرض تطبيقات ويب تفاعلية وتجارب بصرية مدعومة بمسرعات العتاد. أدمج التصميم الراقي بالبرمجة المتقنة بكل بكسل."
      : "A high-performance digital portfolio showcasing retro-futuristic audio vibe coding and hardware-accelerated particle systems. Blending high-end design with advanced frontend craft.";
      
    const keywords = isAr
      ? "مطور تفاعلي، مبرمج فايب كودينج، تصميم واجهات راقية، تسريع عتاد، بورتفوليو رياكت، تطوير ويب متكامل، تصميم رقمي، بالدوين"
      : "Interactive developer, vibe coder, premium frontend design, hardware-accelerated websites, React portfolio, full-stack design, Baldwin";

    const locale = isAr ? "ar_SA" : "en_US";

    // 2. Set document titles and generic HTML tags
    document.title = title;
    document.documentElement.lang = isAr ? "ar" : "en";
    document.documentElement.dir = isAr ? "rtl" : "ltr";

    // 3. Helper function to update/create meta tags
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard SEO Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", "index, follow");

    const productionOrigin = "https://baldwin-portfolio.vercel.app";
    // Construct absolute URLs using the production origin for canonical search indexing
    const currentPath = window.location.pathname + window.location.search;
    const absoluteCanonicalUrl = `${productionOrigin}${currentPath}`;
    const absoluteImageUrl = `${productionOrigin}/og-image.jpg`;

    // Open Graph / Facebook / WhatsApp
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:locale", locale);
    setMetaTag("property", "og:site_name", isAr ? "بورتفوليو بالدوين" : "Baldwin Portfolio");
    setMetaTag("property", "og:url", absoluteCanonicalUrl);
    setMetaTag("property", "og:image", absoluteImageUrl);
    setMetaTag("property", "og:image:width", "1200");
    setMetaTag("property", "og:image:height", "630");

    // Twitter / X
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", absoluteImageUrl);

    // Theme Color
    setMetaTag("name", "theme-color", "#06010A");

    // 4. Update/Create Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", absoluteCanonicalUrl);

    // 5. Inject Rich JSON-LD Structured Data (Person Schema)
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": isAr ? "بالدوين" : "Baldwin",
      "url": productionOrigin,
      "image": `${productionOrigin}/logo.webp`,
      "jobTitle": isAr ? "مطور ويب تفاعلي ومصمم واجهات متكامل" : "Lead Interactive Vibe Coder & Full-Stack Developer",
      "description": description,
      "sameAs": [
        "https://github.com/revolover00",
        "https://x.com/revo_codes"
      ],
      "knowsAbout": [
        "React",
        "TypeScript",
        "WebGL",
        "Framer Motion",
        "Interactive Design",
        "Tailwind CSS",
        "Vibe Coding",
        "Core Web Vitals",
        "Search Engine Optimization"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": isAr ? "أوستن" : "Austin",
        "addressRegion": isAr ? "تكساس" : "Texas",
        "addressCountry": "US"
      }
    };

    // Remove existing script schema if any
    const existingSchema = document.getElementById("json-ld-seo");
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new JSON-LD
    const script = document.createElement("script");
    script.id = "json-ld-seo";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(personSchema, null, 2);
    document.head.appendChild(script);

    // Cleanup when component unmounts
    return () => {
      const schemaToRemove = document.getElementById("json-ld-seo");
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, [language]);

  return null; // This component handles side-effects on head tags
}
