export interface ProjectItem {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  category: "Full Stack" | "Tools & Desktop" | "Games & Realtime" | "Creative UI";
  language: string;
  tags: string[];
  stars: number;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  image: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  fullName: string;
  alias: string;
  role: string;
  location: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  pinterest: string;
  avatar: string;
  status: string;
  rolesCycle: string[];
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  pinUrl: string;
  rotation: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: number;
  read?: boolean;
}

export const PERSONAL_INFO: PersonalInfo = {
  name: "One Saksham",
  fullName: "One Saksham",
  alias: "One Saksham",
  role: "Full Stack Developer & Designer",
  location: "Muzaffarpur, Bihar, India",
  tagline: "Building Things Nobody Asked For.",
  bio: "Full stack developer and UI/UX designer obsessed with high-performance desktop apps, quirky web tools, and zero-friction real-time experiences. Crafting products that solve everyday headaches with bold aesthetic taste.",
  email: "sakshamkumar1621@gmail.com",
  github: "https://github.com/saksham-kumar1621",
  pinterest: "https://in.pinterest.com/OneSaksham1621/",
  avatar: "https://avatars.githubusercontent.com/u/196009222?v=4",
  status: "Available for freelance & collaborations",
  rolesCycle: [
    "Full Stack Developer",
    "UI/UX Designer",
    "Desktop App Builder",
    "Creative Hacker",
  ],
};

export const TECH_STACK: SkillCategory[] = [
  {
    category: "FRONTEND",
    icon: "Layout",
    color: "#22d3ee",
    skills: ["React", "Next.js 14", "Tailwind CSS", "TypeScript", "JavaScript (ES6+)", "Figma"],
  },
  {
    category: "BACKEND & DB",
    icon: "Database",
    color: "#818cf8",
    skills: ["Node.js", "Express", "MongoDB", "Firebase", "PostgreSQL", "PHP / MySQL"],
  },
  {
    category: "TOOLS & AI",
    icon: "Bot",
    color: "#34d399",
    skills: ["Git / GitHub", "Vercel & Netlify", "Claude 3.5 Sonnet", "Google Gemini", "Docker"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "modvault",
    name: "modvault",
    title: "ModVault",
    tagline: "High-Performance Minecraft Mod Engine & FPS Optimizer",
    description:
      "Universal launcher detection, automated dependency resolving, and one-click FPS optimization for Minecraft players with a sleek dark-mode UI.",
    category: "Tools & Desktop",
    language: "JavaScript / HTML",
    tags: ["Minecraft", "Desktop Tool", "Mod Engine", "FPS Booster", "Tauri/Web"],
    stars: 2,
    githubUrl: "https://github.com/saksham-kumar1621/modvault",
    featured: true,
    image: "/projects/modvault.webp",
  },
  {
    id: "universal-git-pusher",
    name: "universal-git-pusher",
    title: "Universal Git Pusher",
    tagline: "Push Any Project Folder to GitHub with a Gorgeous Dark Web GUI",
    description:
      "Zero-terminal Git workflow! Drag & drop any folder, auto-detect project type, generate optimized .gitignore templates, and push to GitHub in one click.",
    category: "Tools & Desktop",
    language: "JavaScript / Web GUI",
    tags: ["Developer Tool", "Git Automation", "Dark GUI", "Productivity", "Web"],
    stars: 2,
    githubUrl: "https://github.com/saksham-kumar1621/universal-git-pusher",
    featured: true,
    image: "/projects/universal-git-pusher.webp",
  },
  {
    id: "minecraft-port-forwarder",
    name: "minecraft-port-forwarder",
    title: "Minecraft LAN Tunnel & Modpack Installer",
    tagline: "Play Minecraft LAN Worlds Over the Internet with 0 Port Forwarding",
    description:
      "Native desktop app (Electron) for Windows, Mac & Linux. 1-Click LAN tunneling, live Modrinth mod installer with 20+ performance mods, and 28-launcher auto-detection.",
    category: "Tools & Desktop",
    language: "JavaScript / Electron",
    tags: ["Electron", "Tunneling", "Networking", "Minecraft", "Modrinth API"],
    stars: 2,
    githubUrl: "https://github.com/saksham-kumar1621/minecraft-port-forwarder",
    featured: true,
    image: "", // No photo: auto-falls back to repo logo (creeper wifi icon)
  },
  {
    id: "one-chatting",
    name: "one-chatting",
    title: "One Chatting",
    tagline: "Zero-Friction Anonymous Ephemeral Chat Platform",
    description:
      "Built for conversations that don't need a permanent record. Peer-connected, instant room generation, zero signups, and encrypted ephemeral messaging.",
    category: "Full Stack",
    language: "JavaScript / Node.js",
    tags: ["WebSockets", "Node.js", "Express", "Tailwind CSS", "Privacy"],
    stars: 2,
    githubUrl: "https://github.com/saksham-kumar1621/one-chatting",
    featured: true,
    image: "/projects/one-chatting.webp",
  },
  {
    id: "storagerelief",
    name: "storagerelief-github",
    title: "StorageRelief",
    tagline: "Next-Gen Windows Storage Optimizer & Cache Destroyer",
    description:
      "Native Windows storage utility built with Tauri v2 + Rust and Python WebView2. Cleans 47+ categories: Discord, Spotify, Steam, developer build caches, freeing 20-100+ GB safely.",
    category: "Tools & Desktop",
    language: "Rust / Python / Web",
    tags: ["Rust", "Tauri v2", "Python", "Windows Optimizer", "Disk Analyzer"],
    stars: 2,
    githubUrl: "https://github.com/saksham-kumar1621/storagerelief-github",
    featured: false,
    image:
      "https://raw.githubusercontent.com/saksham-kumar1621/storagerelief-github/main/src-tauri/icons/icon.png",
  },
  {
    id: "naruto-draft-duel",
    name: "naruto-draft-duel",
    title: "Naruto Draft Duel",
    tagline: "Real-Time 2-Player Auction Strategy Card Game",
    description:
      "A fast-paced auction and strategy game where players manage a $20 budget in live bidding rounds to draft their 4-ninja shinobi squad with synergy effects.",
    category: "Games & Realtime",
    language: "JavaScript / Realtime",
    tags: ["Game Dev", "Real-Time", "Socket.io", "Interactive UI", "State Sync"],
    stars: 2,
    githubUrl: "https://github.com/saksham-kumar1621/naruto-draft-duel",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
  },
];

export const DEFAULT_EXPLORATIONS: ExplorationItem[] = [
  {
    id: "pin-1",
    title: "Dark Aesthetic Lord Krishna",
    category: "Divine Cosmic Art",
    image: "https://i.pinimg.com/736x/c2/09/c4/c209c425e1996d696b86f3f054c31099.jpg",
    pinUrl: "https://www.pinterest.com/pin/1105633777378728765/",
    rotation: -3,
  },
  {
    id: "pin-2",
    title: "Dark Angel Lord // Red Blade",
    category: "Dark Fantasy Concept",
    image: "https://i.pinimg.com/736x/cd/fd/a1/cdfda17f420c99d767da4a848b55aebc.jpg",
    pinUrl: "https://www.pinterest.com/pin/1105633777375448823/",
    rotation: 2.5,
  },
  {
    id: "pin-3",
    title: "Tyler Durden 4K Desktop",
    category: "Cinematic Edit",
    image: "https://i.pinimg.com/736x/b9/e9/7e/b9e97ea2865ada5b21f12895cd008e79.jpg",
    pinUrl: "https://www.pinterest.com/pin/1105633777377435682/",
    rotation: -2,
  },
  {
    id: "pin-4",
    title: "Black & Gold Metallic Rose",
    category: "Gothic Luxury",
    image: "https://i.pinimg.com/736x/f2/f3/31/f2f33173064ec04c3903ddff5fe25a1e.jpg",
    pinUrl: "https://www.pinterest.com/pin/1105633777378728565/",
    rotation: 3,
  },
  {
    id: "pin-5",
    title: "Fallen Wings // 111 Graphic",
    category: "Dark Academia",
    image: "https://i.pinimg.com/736x/19/ff/8a/19ff8a1f2b8b516fbc83957ebc7e1e05.jpg",
    pinUrl: "https://www.pinterest.com/pin/1105633777375802692/",
    rotation: -2.5,
  },
  {
    id: "pin-6",
    title: "Bruce Wayne // Discipline 4K",
    category: "Monochrome Cinema",
    image: "https://i.pinimg.com/736x/3a/9a/cb/3a9acbe809c675a0f615d08f2dee5090.jpg",
    pinUrl: "https://www.pinterest.com/pin/1105633777374123112/",
    rotation: 2,
  },
];


