import { MediaItem } from "./integrations/supabase/types";

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  mediaUrl?: string; // Main image/video placeholder
  videoUrl?: string; // Optional video
  websiteUrl?: string; // Link to live app
  gallery?: string[]; // Array of gallery urls/mockups
  skills: string[]; // List of technologies/skills used
  
  // Database compatibility fields
  imageUrl?: string | null;
  mainMediaType?: string | null;
  visitUrl?: string | null;
  createdAt?: string;
  media?: MediaItem[] | null;
  caseStudy?: string | null;
}

export interface ContactMessage {
  id?: string;
  senderEmail: string;
  senderName: string;
  subject: string;
  body: string;
  timestamp: string;
}
