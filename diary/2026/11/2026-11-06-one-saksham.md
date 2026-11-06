# 📔 DevLog: one-saksham (Personal Portfolio & Visual Playground)
* **📅 Date**: 2026-11-06
* **🏷️ Tags**: `#Project` `#DevLog` `#Portfolio` `#React19` `#Vite` `#Tailwind` `#GSAP`
* **👤 Author**: One Saksham (Saksham Kumar)
* **🌐 Repository**: [github.com/saksham-kumar1621/one-saksham](https://github.com/saksham-kumar1621/one-saksham)

---

## 🎯 Project Overview & Identity
- **Brand / Persona**: **One Saksham** — *"Building Things Nobody Asked For."*
- **Role**: Full Stack Developer & UI/UX Designer
- **Location**: Muzaffarpur, Bihar, India (Live IST Clock on Contact page)
- **Aesthetic Direction**: High-end luxury dark minimalist theme, subtle neon borders, custom serif accents (`Instrument Serif`), tactile micro-interactions, GSAP ScrollTrigger parallax.

---

## 🛠️ Architecture & Tech Stack
1. **Core Framework**: React 19 + TypeScript + Vite 8
2. **Styling & Design System**:
   - Tailwind CSS v3 with custom HSL token variables (`--bg`, `--surface`, `--stroke`, `--text`, `--muted`)
   - Fonts: `Inter` (Sans) + `Instrument Serif` (Display/Editorial Italic)
   - Accent gradients & glassmorphic backdrop filters
3. **Motion & Interaction**:
   - GSAP 3 + ScrollTrigger (pinned sticky headers, bidirectional multi-column parallax)
   - Framer Motion (modal lightboxes, page transitions, interactive stagger lists)
4. **Media & Streams**:
   - `hls.js` (ambient video streaming in footer background)
   - Direct Pinterest CDN integration (`i.pinimg.com/736x/`)
5. **Routing & Deployment**:
   - React Router DOM v7 (SPA with `ScrollToTop` helper)
   - `vercel.json` with single-page application wildcard rewrites (`/(.*) -> /index.html`)

---

## 📂 Page Breakdown
- **Landing (`src/pages/Index.tsx`)**:
  - `Hero.tsx`: Status indicator, role cycling, floating tech badges, avatar badge.
  - `TechStackSection.tsx`: Luxury 7/5 & 5/7 Bento Grid layout.
  - `SelectedWorks.tsx`: Featured flagship projects with live links & GitHub stars.
  - `Explorations.tsx`: 300vh ScrollTrigger pinned showcase with 6 original Pinterest art pins.
  - `Stats.tsx`: Key metrics & experience highlights.
- **Projects (`src/pages/ProjectsPage.tsx`)**:
  - Live query search & category pills for 6 real GitHub repositories:
    1. *ModVault* (Minecraft mod & modpack manager)
    2. *Universal Git Pusher* (GUI one-click commit & push automation)
    3. *Minecraft Port Forwarder* (UPnP tunneling tool)
    4. *One Chatting* (Zero-friction local realtime chat room)
    5. *StorageRelief* (Storage diagnostic & disk bloat analyzer)
    6. *Naruto Draft Duel* (Anime tactical turn-based card battler)
- **Stack Blueprint (`src/pages/StackPage.tsx`)**:
  - Deep-dive into Frontend, Backend/Databases, AI/Runtimes, and DevOps tooling.
- **About (`src/pages/AboutPage.tsx`)**:
  - Developer journey, architectural philosophy, Pinterest aesthetic inspiration card.
- **Contact (`src/pages/ContactPage.tsx`)**:
  - Interactive direct dispatch form, 1-click email copy, real-time Muzaffarpur IST clock.

---

## 🎨 Creative Pinterest Integration (`Explorations.tsx`)
- Extracted and filtered 100% genuine pins created & uploaded by `@OneSaksham1621`:
  1. *Dark Aesthetic Lord Krishna* (Divine Cosmic Art)
  2. *Dark Angel Lord // Red Blade* (Dark Fantasy Concept)
  3. *Tyler Durden 4K Desktop* (Cinematic Edit)
  4. *Black & Gold Metallic Rose* (Gothic Luxury)
  5. *Fallen Wings // 111 Graphic* (Dark Academia)
  6. *Bruce Wayne // Discipline 4K* (Monochrome Cinema)
- Features: 3D card tilt, hover badges with official Pinterest branding, and direct click-through to exact pins.

---

## 🚨 Troubleshooting & Key Solutions
1. **Issue**: Lucide-react missing `Github` and `Pinterest` icons.
   - **Fix**: Created standalone optimized SVGs [`src/components/icons/GithubIcon.tsx`] and [`src/components/icons/PinterestIcon.tsx`].
2. **Issue**: Vercel Import Error *"The repository 'one-saksham' couldn't be found"*.
   - **Root Cause**: User authenticated to Vercel via Google OAuth (`sakshamkumar1621@gmail.com`), requiring GitHub App installation authorization for `saksham-kumar1621`.
   - **Fix**: Connect GitHub account at `vercel.com/account/login-connections` or deploy via Netlify Drop with prebuilt `dist/`.
3. **Issue**: Unsplash placeholders instead of creator's genuine artwork.
   - **Fix**: Reversed Pinterest profile endpoint with CSRF handling, separated user's original uploads from third-party repins, and linked 6 authentic artworks.

---

## ⚡ Firebase Dynamic Backend & CMS Milestone
- Installed `@firebase` modular SDK.
- Configured [`src/lib/firebase.ts`](file:///c:/Users/Asus/OneDrive/Desktop/Projects/protfolio_me/src/lib/firebase.ts) with dual-source credential resolver (`.env` + in-browser localStorage override).
- Built unified reactive state in [`src/context/PortfolioContext.tsx`](file:///c:/Users/Asus/OneDrive/Desktop/Projects/protfolio_me/src/context/PortfolioContext.tsx) with offline cache fallback.
- Created luxury dark CMS at `/admin` ([`src/pages/AdminPage.tsx`](file:///c:/Users/Asus/OneDrive/Desktop/Projects/protfolio_me/src/pages/AdminPage.tsx)) for full CRUD over:
  - Personal Info, Tagline & Rotating Roles
  - Projects (Add, Edit, Delete, Toggle Featured, Star counts)
  - Visual Playground Artwork (Pinterest Pins management)
  - Tech Stack Categories & Skills
  - Realtime Visitor Inquiries Inbox
  - 1-Click "Seed Firestore with Portfolio Data" utility

---

## ⏭️ Next Actions
- [x] Connect GitHub account in Vercel settings and trigger final production build.
- [ ] Add Firebase Project credentials in Admin Settings tab or Vercel Environment Variables.
- [ ] Add custom domain (`onesaksham.dev` or `onesaksham.me`).
- [ ] Configure OpenGraph / Twitter Card preview images for rich social media links.

