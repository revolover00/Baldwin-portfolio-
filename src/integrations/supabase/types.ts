export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
}

export interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  mainMediaType: string | null;
  visitUrl: string | null;
  createdAt: number;
  media: MediaItem[] | null;
  caseStudy: string | null;
}

export interface Message {
  id: string;
  senderEmail: string;
  senderName: string;
  subject: string | null;
  body: string | null;
  createdAt: number;
}
