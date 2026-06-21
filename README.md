<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=7B2FBE&height=200&section=header&text=Baldwin%20Portfolio&fontSize=50&fontColor=ECE6F4&animation=fadeIn&fontAlignY=35&desc=Dark%20Fantasy%20Developer%20Portfolio&descAlignY=55&descSize=18" width="100%"/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-CC00FF?style=for-the-badge&logo=vercel&logoColor=white)](https://ais-pre-43hb4ladgt273fbgc6ur3e-105766517539.europe-west3.run.app)
[![GitHub](https://img.shields.io/badge/GitHub-revolover00-7B2FBE?style=for-the-badge&logo=github&logoColor=white)](https://github.com/revolover00/Baldwin-portfolio-)
[![License](https://img.shields.io/badge/License-MIT-CC00FF?style=for-the-badge)](LICENSE)

</div>

---

## 👤 About &nbsp; ![About](https://img.shields.io/badge/About-Portfolio-CC00FF?style=for-the-badge)

A dark fantasy developer portfolio built with React + TypeScript. Featuring WebGL shaders, particle systems, 3D page transitions, and Supabase backend.

---

## 🛠️ Tech Stack &nbsp; ![Tech Stack](https://img.shields.io/badge/Stack-Modern-7B2FBE?style=for-the-badge)

<div align="center">

![React](https://img.shields.io/badge/React-19-CC00FF?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-7B2FBE?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-CC00FF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-7B2FBE?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-CC00FF?style=for-the-badge&logo=framer&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2-7B2FBE?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-CC00FF?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ✨ Features &nbsp; ![Features](https://img.shields.io/badge/Features-Rich-CC00FF?style=for-the-badge)

- **Hash-based SPA routing** (no React Router) — `#home`, `#work`, `#about`, `#contact`, `#project/:id`
- **HTML5 Canvas ember particle system** (purple/magenta floating particles)
- **Floating monospace code snippets** drifting upward with Framer Motion
- **Ferrofluid WebGL interactive background shader** on subpages (using `ogl` library)
- **3D page transitions** using `rotateY` spring animation with `AnimatePresence`
- **Cinematic zoom transition** for project detail pages
- **Supabase integration** — projects (public SELECT) and messages (public INSERT)
- **Contact form** with 60-second localStorage rate limiting
- **2.8-second animated Splash screen** before app renders
- **Responsive design** — mobile + desktop

---

## 📁 Project Structure &nbsp; ![Structure](https://img.shields.io/badge/Structure-Clean-7B2FBE?style=for-the-badge)

```text
src/
├── components/
│   ├── App.tsx           — Root component, routing, layout
│   ├── Home.tsx          — Hero, video, particles, sword SVG
│   ├── Work.tsx          — Projects grid from Supabase
│   ├── About.tsx         — Skills, stats, social links, mission
│   ├── Contact.tsx       — Contact form with rate limiting
│   ├── ProjectDetail.tsx — Individual project page
│   ├── Header.tsx        — Fixed nav header
│   ├── Splash.tsx        — Loading screen
│   └── Ferrofluid.tsx    — WebGL shader background
├── store.ts              — Supabase data layer + cache
├── types.ts              — TypeScript interfaces
└── integrations/
    └── supabase/
        ├── client.ts     — Supabase client init
        └── types.ts      — DB types
public/
├── logo.webp             — Logo (add manually)
└── bg-video.mp4          — Background video (add manually)
```

---

## 🚀 Getting Started &nbsp; ![Setup](https://img.shields.io/badge/Getting_Started-Run-CC00FF?style=for-the-badge)

To deploy or develop locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/revolover00/Baldwin-portfolio-.git
   cd Baldwin-portfolio-
   ```

2. **Install all workspace dependencies:**
   ```bash
   npm install
   ```

3. **Configure your environment keys:**
   Copy the `.env.example` file to `.env` and fill in your Supabase connection strings:
   ```bash
   cp .env.example .env
   ```

4. **Boot the Vite dev server:**
   ```bash
   npm run dev
   ```

---

## 🔐 Environment Variables &nbsp; ![Variables](https://img.shields.io/badge/Environment-Keys-7B2FBE?style=for-the-badge)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase project URL API gateway address | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public role credentials token | `eyJ...` |

---

## 🗄️ Supabase Setup &nbsp; ![Database](https://img.shields.io/badge/Supabase-Backend-CC00FF?style=for-the-badge)

<details>
<summary>🔑 Click to expand Database Schemas & Row Level Security SQL</summary>

### 1. Table Creation DDL

```sql
-- Create projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  subtitle TEXT,
  mediaUrl TEXT,
  websiteUrl TEXT,
  skills JSONB,
  gallery JSONB,
  createdAt BIGINT
);

-- Create contact messages table
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  senderEmail TEXT NOT NULL,
  senderName TEXT,
  subject TEXT,
  body TEXT,
  createdAt BIGINT
);
```

### 2. Row Level Security (RLS) Configuration

Configure row access rules to let public visitors select projects and insert messages:

```sql
-- Enable RLS on both tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous select on projects
CREATE POLICY "Allow public select" 
ON projects FOR SELECT 
TO anon 
USING (true);

-- Allow anonymous insert on messages
CREATE POLICY "Allow anonymous insert" 
ON messages FOR INSERT 
TO anon 
WITH CHECK (true);
```

</details>

---

## ⚠️ Known Issues &nbsp; ![Issues](https://img.shields.io/badge/Known_Issues-Review-7B2FBE?style=for-the-badge)

> ⚠️ **IMPORTANT DEVELOPMENT ACCENTS**
> - **Asset Requirements:** `logo.webp` contains tailored branding and needs to be placed manually inside the `/public/` assets directory before compiling as it is git-ignored. (A text fallback will render gracefully if absent).

### ✅ Recently Resolved
- **Contact Rate Limiting:** Cooldown is correctly set to a production-safe 5 hours to prevent spam.
- **Shader Mobile Fallback:** The WebGL Ferrofluid shader now correctly disables itself and falls back to performing gradient blobs on viewports under `1024px` to preserve mobile performance.
- **AI-Studio Template Artifacts:** Leftover Gemini capabilities and env blanks have been removed to keep dependencies lean.

---

## 🔗 Social Links &nbsp; ![Socials](https://img.shields.io/badge/Socials-Connect-CC00FF?style=for-the-badge)

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-revolover00-7B2FBE?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/revo-code-6181283b5)
[![YouTube](https://img.shields.io/badge/YouTube-@Revo--code-CC00FF?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@Revo-code)
[![X](https://img.shields.io/badge/X-@revo__codes-7B2FBE?style=for-the-badge&logo=x&logoColor=white)](https://x.com/revo_codes)

</div>

---

## 📄 License &nbsp; ![License](https://img.shields.io/badge/License-MIT-7B2FBE?style=for-the-badge)

Licensed under the [MIT License](LICENSE).  
Copyright © 2025 Baldwin Portfolio.

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=7B2FBE&height=120&section=footer" width="100%"/>
