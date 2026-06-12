# 🌌 Baldwin Portfolio

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A highly polished, dark-themed portfolio single-page application built with React, TypeScript, and TailwindCSS. It integrates immersive visual systems, responsive transitions, and real-time data powered by Supabase.

---

## 🔗 Live Demo
[Explore Baldwin Portfolio Live!](https://ais-pre-43hb4ladgt273fbgc6ur3e-105766517539.europe-west3.run.app) *(Placeholder or Preview Link)*

---

## 📷 Screenshots
*Add your portfolio screenshots here to showcase the beautiful dark-styled landing and interactive pages.*

| Desktop Home | Work Showcase |
| :---: | :---: |
| _[Screenshot Placeholder]_ | _[Screenshot Placeholder]_ |

---

## ⚡ Key Features

- **🌐 Hash-Based SPA Routing:** Lightweight, clean routing implementation using standard `window.location.hash` and `hashchange` browser events.
- **🎬 Autoplay Hero Background Video:** Optimized to auto-play muted, with explicit overrides for iOS and battery-saver browser restriction states to lock loop activity.
- **✨ Animated Ember Particle System:** Custom-built HTML5 Canvas floating engine delivering smooth purple and magenta background embers behind key components.
- **📜 Drifting Code Snippets:** Immersive floating monospace text fragments styled with Framer Motion, ascending gracefully in the hero space.
- **🌌 Ferrofluid WebGL Interactive Background:** Rich, interactive fluid shader utilizing the high-performance `ogl` WebGL library on secondary pages (`Work`, `About`, `Contact`), disabled on Home to maximize performance.
- **🔄 Dynamic 3D Page Transitions:** Seamless page transitions leveraging Framer Motion's `AnimatePresence` with spring-loaded `rotateY` perspective shifts.
- **🔍 Cinematic Project Zoom:** Immersive scale-based transitions that zoom into individual project detail items upon selection.
- **🗄️ Fully Dynamic Supabase Sync:** Live cloud data fetch for individual projects with a fallback to localized cache state in case of connection limits.
- **🛡️ Intelligent Contact Cooldown:** Smart contact messaging form submission rate-limiting, restricting user input with a client-persistent 60-second limit stored in `localStorage`.
- **🚪 Animated Splash Loading Screen:** A professional 2.8-second introductory full-screen loader showcasing the brand logo & a custom animated progress bar.

---

## 🛠️ Tech Stack

| Tech | Category | Description |
| :--- | :--- | :--- |
| **React 19** | Component Framework | Modern UI framework utilizing functional Hooks. |
| **TypeScript** | Language Type-Safety | Strict typing and interfaces for bug-free development. |
| **TailwindCSS** | Design styling | Highly customized dark color palettes, layout bounds. |
| **Framer Motion (`motion/react`)** | Animations | Controls transition loops, 3D rotations, and drift items. |
| **OGL** | Interactive WebGL | Executes fluid WebGL particle physics & shader buffers. |
| **Supabase Client SDK** | Database Integration | Authenticates connection strings to query dynamic items. |

---

## 🚀 Getting Started

Follow these steps to set up and run the portfolio locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/baldwin-portfolio.git
cd baldwin-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and copy the format from `.env.example`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🔐 Environment Variables

The application expects the following client-side environment variables loaded by Vite:

| Key | Description | Type |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | The public API gateway URL of your Supabase project instance | String |
| `VITE_SUPABASE_ANON_KEY` | The public secure anonymous access token key to access tables | String |

---

## 🗄️ Supabase Setup

This application relies on two public tables hosted on a PostgreSQL Supabase database instance. Set them up with the following schemas and write-access rules:

### 1. Table: `projects`
This table holds the structure for dynamic work items displayed under `#work`.

```sql
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
```
> **RLS Policy:** Enable Read Row Security to allow public reading anonymously (`true`).

### 2. Table: `messages`
This table collects contacts and feedback notes gathered via `#contact`.

```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  senderEmail TEXT NOT NULL,
  senderName TEXT,
  subject TEXT,
  body TEXT,
  createdAt BIGINT
);
```
> **RLS Policy:** Enable secure writing to allow public anonymous insertion (`anon` role allowed to insert only).

---

## 📂 Project Structure

Key structure maps for the core application components:

```text
├── public/
│   ├── logo.webp          # Branding logo (Needs to be added manually)
│   ├── bg-video.mp4       # Autoplay ambient video clip (Needs to be added manually)
├── src/
│   ├── components/
│   │   ├── About.tsx      # Social grid, skills stats, glowing card
│   │   ├── Contact.tsx    # Cooldown-guarded email submission form
│   │   ├── Header.tsx     # Absolutely centered layout bar
│   │   ├── Home.tsx       # Hero, code snippets, local SVG sword
│   │   ├── ProjectDetail.tsx # Media showcase & cinematic transitions
│   │   ├── Splash.tsx     # Logo intro & visual sequence elements
│   │   └── Work.tsx       # Category grid syncing Supabase fetch
│   ├── integrations/
│   │   └── supabase/      # Main db configuration client
│   ├── App.tsx            # Context core & SPA hash selector
│   ├── index.css          # Customized typography settings (Rye & Inter)
│   ├── main.tsx           # Dom entry mount point instance
│   └── store.ts           # Global store & cached database structures
```

---

## 📦 Deployment on Vercel

To deploy your portfolio to Vercel:

1. Push your local codebase changes to a GitHub repository.
2. Sign in to your [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. Set the **Framework Preset** to `Vite`.
5. Under **Environment Variables**, configure your production keys:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**. Vercel will build your static SPA and deploy it securely.

---

## ⚠️ Known Issues

- **Asset Dependencies:** `logo.webp` and `bg-video.mp4` assets are required for full rendering and must be manually placed inside the `/public/` directory, as they are excluded from Git tracing by default.
- **Cool-down Guard Parameter:** Contact form rate-limiting cooldown limits are hardcoded to 60 seconds inside storage for demo responsiveness, rather than 5 hours.
- **Unused Packages:** The `@google/genai` library is currently integrated in packages but remains unused by core layout routines.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
