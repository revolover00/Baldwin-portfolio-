import { supabase, isSupabaseConfigured } from './integrations/supabase/client';
import type { Message } from './integrations/supabase/types';
import type { Project } from './types';

// Helper function to escape HTML characters and prevent potential XSS injection attacks
export function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Backward compatibility mapper so the existing UI sections (gallery, skills, subtitle etc) continue to render beautifully!
const mapToUIProject = (dbProj: any): Project => {
  if (!dbProj) return dbProj as Project;
  return {
    ...dbProj,
    id: String(dbProj.id),
    subtitle: dbProj.subtitle || dbProj.category || "Web Project",
    detailedDescription: dbProj.detailedDescription || dbProj.caseStudy || dbProj.description || "",
    mediaUrl: dbProj.mediaUrl || dbProj.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    websiteUrl: dbProj.websiteUrl || dbProj.visitUrl || "#",
    gallery: dbProj.gallery || (dbProj.media ? dbProj.media.map((m: any) => m.url) : []),
    skills: dbProj.skills || (dbProj.category ? [dbProj.category] : ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite"])
  } as Project;
};

// In-memory cache to handle immediate navigation matching without storing projects in localStorage on the visitor's device
let memoryProjectsCache: Project[] = [];

export const Store = {

  // ─── PROJECTS ────────────────────────────────────────────────

  getProjects: async (): Promise<Project[]> => {
    // First, check if we have them cached in sessionStorage to respect the session persistence constraint
    try {
      const cached = sessionStorage.getItem("session_projects_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (import.meta.env.DEV) {
            console.log("Using cached projects from sessionStorage.");
          }
          memoryProjectsCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn("Failed to read from sessionStorage:", e);
      }
    }

    // If Supabase keys are not set up yet, silently fall back to the demo projects
    if (!isSupabaseConfigured()) {
      memoryProjectsCache = DEFAULT_PROJECTS;
      return DEFAULT_PROJECTS;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;

      const rawProjects = data || [];

      if (rawProjects.length > 0) {
        const mapped = rawProjects.map(mapToUIProject);
        memoryProjectsCache = mapped;
        
        // Cache in sessionStorage for active session duration
        try {
          sessionStorage.setItem("session_projects_cache", JSON.stringify(mapped));
          if (import.meta.env.DEV) {
            console.log("Projects loaded freshly from database and cached in sessionStorage.");
          }
        } catch (e) {
          if (import.meta.env.DEV) {
            console.warn("Failed to write to sessionStorage:", e);
          }
        }
        
        return mapped;
      }

      // Absolute fallback
      memoryProjectsCache = DEFAULT_PROJECTS;
      return DEFAULT_PROJECTS;

    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn("Supabase fetch failed, falling back to default projects:", e);
      }
      memoryProjectsCache = DEFAULT_PROJECTS;
      return DEFAULT_PROJECTS;
    }
  },

  // Helper method used by components for matching individual page views
  getProjectById: (id: string): Project | undefined => {
    let found = memoryProjectsCache.find(p => p.id === id);
    if (found) return found;

    // Direct read from sessionStorage cache if memory cache is cold (e.g. direct entrance reload)
    try {
      const cached = sessionStorage.getItem("session_projects_cache");
      if (cached) {
        const parsed = JSON.parse(cached) as Project[];
        if (Array.isArray(parsed)) {
          const sFound = parsed.find(p => p.id === id);
          if (sFound) {
            memoryProjectsCache = parsed;
            return sFound;
          }
        }
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn("Failed to lookup cached project in sessionStorage:", e);
      }
    }

    // Try fallback
    return DEFAULT_PROJECTS.find(p => p.id === id);
  },

  // ─── MESSAGES ────────────────────────────────────────────────

  saveMessage: async (msg: {
    senderEmail: string;
    subject: string;
    body: string;
  }): Promise<void> => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase credentials are not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your settings.");
    }

    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    
    // Explicitly sanitize all incoming fields to protect against HTML injection (XSS attacks)
    const sanitizedEmail = escapeHtml(msg.senderEmail.trim());
    const sanitizedSubject = escapeHtml(msg.subject.trim());
    const sanitizedBody = escapeHtml(msg.body.trim());

    // Embed the sender's email directly into the message body content as part of the payload
    const enhancedBody = `[Sender Email: ${sanitizedEmail}]\n\n${sanitizedBody}`;

    const message: Message = {
      id,
      senderEmail: sanitizedEmail,
      senderName: 'Guest',
      subject: sanitizedSubject,
      body: enhancedBody,
      createdAt: String(Date.now()),
    };

    const { error } = await supabase.from('messages').insert([message]);
    if (error) throw error;
  },
};

// ─── FALLBACK DEFAULT PROJECTS ────────────────────────────────
const DEFAULT_PROJECTS: Project[] = [
  mapToUIProject({
    id: "fluid-canvas",
    title: "Interactive Fluid Canvas",
    category: "Physics & WebGL",
    subtitle: "Real-time Fluid Dynamics Simulation",
    description: "An elegant interactive WebGL liquid simulation rendering luxurious organic flows, responsive vertex warping, and full multi-touch physics. Fully customized with customized shader materials and high-contrast color tables.",
    detailedDescription: "This project pushes the boundaries of real-time web graphics. Leveraging WebGL and custom fragment shaders, it simulates high-fidelity fluid mechanics directly on the GPU. Users can interact with the fluid using mouse drags or multi-touch gestures, creating violent waves, elegant vortexes, and smooth color blends. The rendering pipeline uses a high-density double-buffered feedback texture, ensuring flawless 60 FPS performance on both modern desktop and mobile browsers.",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    mainMediaType: "image",
    visitUrl: "https://github.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    skills: ["WebGL", "Three.js", "GLSL", "React Three Fiber", "TypeScript"],
    media: null,
    caseStudy: null
  }),
  mapToUIProject({
    id: "nova-portal",
    title: "Nova AI Developer Console",
    category: "AI Integration",
    subtitle: "AI-powered Terminal & Grounding System",
    description: "A luxury dashboard utilizing Gemini Models to generate real-time TypeScript interfaces, compile client-side scripts, and maintain state records with absolute design discipline.",
    detailedDescription: "Nova Portal is designed for developers who demand high precision from AI systems. It connects straight to server-side Gemini endpoints to synthesize complex API routes, build schemas, and output standard, verified TypeScript files. The UI is built with JetBrains Mono typography, custom active border highlights, and ambient purple/violet backdrop blur filters, offering an immersive workspace reminiscent of modern cyberpunk terminals.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    mainMediaType: "image",
    visitUrl: "https://github.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    skills: ["React", "Gemini SDK", "Node.js", "TailwindCSS", "Framer Motion"],
    media: null,
    caseStudy: null
  }),
  mapToUIProject({
    id: "cyberpunk-synth",
    title: "Cyberpunk Synth Loop",
    category: "Audio Experience",
    subtitle: "Interactive Multi-voice Audio Synthesizer",
    description: "An interactive HTML5 Web Audio API synthesizer with custom oscillators, responsive interactive sine-wave visualizers, and customizable effects processors.",
    detailedDescription: "A fully immersive digital audio experience built natively on the Web Audio API. It features a custom multi-voice synthesizer with dual oscillators (sine, square, sawtooth, triangle), an ADSR envelope generator, a low-pass filter, and an retro delay line. The audio frequencies are dynamically analyzed in real-time and mirrored visually on a responsive neon canvas, creating syncopated, stunning ripple animations as you play.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2669&auto=format&fit=crop",
    mainMediaType: "image",
    visitUrl: "https://github.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    skills: ["Web Audio API", "HTML5 Canvas", "TailwindCSS", "TypeScript", "React"],
    media: null,
    caseStudy: null
  })
];
