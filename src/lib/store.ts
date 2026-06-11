import { supabase, isSupabaseConfigured } from '../integrations/supabase/client';
import type { Project, Message } from '../integrations/supabase/types';

// Backward compatibility mapper so the existing UI sections (gallery, skills, subtitle etc) continue to render beautifully!
const mapToUIProject = (dbProj: any): any => {
  if (!dbProj) return dbProj;
  return {
    ...dbProj,
    subtitle: dbProj.subtitle || dbProj.category || "Web Project",
    detailedDescription: dbProj.detailedDescription || dbProj.caseStudy || dbProj.description || "",
    mediaUrl: dbProj.mediaUrl || dbProj.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    websiteUrl: dbProj.websiteUrl || dbProj.visitUrl || "#",
    gallery: dbProj.gallery || (dbProj.media ? dbProj.media.map((m: any) => m.url) : []),
    skills: dbProj.skills || (dbProj.category ? [dbProj.category] : ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite"])
  };
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
          console.log("Using cached projects from sessionStorage.");
          memoryProjectsCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read from sessionStorage:", e);
    }

    // If Supabase keys are not set up yet, silently fall back to the demo project
    if (!isSupabaseConfigured()) {
      return [DEMO_PROJECT];
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
          console.log("Projects loaded freshly from database and cached in sessionStorage.");
        } catch (e) {
          console.warn("Failed to write to sessionStorage:", e);
        }
        
        return mapped;
      }

      // Absolute fallback
      return [DEMO_PROJECT];

    } catch (e) {
      console.warn("Supabase fetch failed, falling back to demo project:", e);
      return [DEMO_PROJECT];
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
      console.warn("Failed to lookup cached project in sessionStorage:", e);
    }

    // Try fallback
    if (DEMO_PROJECT.id === id) {
      return DEMO_PROJECT;
    }
    return undefined;
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

    const id = Math.random().toString(36).substring(2, 9);
    
    // Embed the sender's email directly into the message body content as part of the payload
    const enhancedBody = `[Sender Email: ${msg.senderEmail}]\n\n${msg.body}`;

    const message: Message = {
      id,
      senderEmail: msg.senderEmail,
      senderName: 'Guest',
      subject: msg.subject,
      body: enhancedBody,
      createdAt: Date.now(),
    };

    const { error } = await supabase.from('messages').insert([message]);
    if (error) throw error;
  },
};

// ─── FALLBACK DEMO PROJECT ────────────────────────────────────

const DEMO_PROJECT: Project = mapToUIProject({
  id: 'demo-1',
  title: 'Welcome to the Portfolio',
  category: 'Web Development',
  description: 'This is a demo project shown while database access is being configured.',
  imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
  mainMediaType: 'image',
  visitUrl: '#',
  createdAt: Date.now(),
  media: null,
  caseStudy: null,
});
