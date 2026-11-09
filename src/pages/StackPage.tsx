import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  CheckCircle2, 
  Zap,
  ArrowUpRight 
} from "lucide-react";
import { Link } from "react-router-dom";

interface TechDetail {
  name: string;
  category: "Frontend" | "Backend" | "AI & Intelligence" | "DevOps & Tools";
  role: string;
  whyIUseIt: string;
  level: "Daily Driver" | "Core Production" | "Advanced Tool";
}

const detailedTech: TechDetail[] = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    role: "Component UI Architecture",
    whyIUseIt: "Declarative component trees, massive ecosystem, and unmatched reactive rendering controls.",
    level: "Daily Driver",
  },
  {
    name: "Next.js 14",
    category: "Frontend",
    role: "Full-Stack Web Framework",
    whyIUseIt: "App Router, Server Actions, instantaneous streaming, and production edge caching.",
    level: "Core Production",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    role: "Atomic Design System",
    whyIUseIt: "Rapid spatial composition, zero stylesheet bloat, and seamless dark-mode token management.",
    level: "Daily Driver",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    role: "Type Safety & Contracts",
    whyIUseIt: "Eliminates runtime regressions, documents APIs inline, and scales complex state logic.",
    level: "Daily Driver",
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    role: "Core Web Language",
    whyIUseIt: "Deep mastery of asynchronous event loops, prototypal inheritance, and browser APIs.",
    level: "Daily Driver",
  },
  {
    name: "Figma",
    category: "Frontend",
    role: "UI/UX & Design Tokens",
    whyIUseIt: "Wireframing micro-interactions, layout grids, and prototyping dark aesthetic interfaces.",
    level: "Core Production",
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    role: "JavaScript Runtime Engine",
    whyIUseIt: "High-throughput asynchronous I/O, event-driven networking, and desktop integrations.",
    level: "Daily Driver",
  },
  {
    name: "Express",
    category: "Backend",
    role: "REST & Middleware Framework",
    whyIUseIt: "Unopinionated, lightweight API routing with custom authentication and middleware pipelines.",
    level: "Core Production",
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    role: "Relational Database",
    whyIUseIt: "ACID compliance, complex relational integrity, JSONB support, and bulletproof reliability.",
    level: "Daily Driver",
  },
  {
    name: "MongoDB",
    category: "Backend",
    role: "Document Store",
    whyIUseIt: "Schema flexibility for rapid prototypes, ephemeral chats, and document trees.",
    level: "Core Production",
  },
  {
    name: "Firebase",
    category: "Backend",
    role: "Real-Time Cloud BaaS",
    whyIUseIt: "Instant WebSockets synchronization, cloud functions, and zero-headache user state.",
    level: "Advanced Tool",
  },
  {
    name: "PHP / MySQL",
    category: "Backend",
    role: "Server Scripting & Database",
    whyIUseIt: "Robust classic web hosting, CMS mechanics, and rock-solid relational queries.",
    level: "Advanced Tool",
  },

  // AI & Intelligence
  {
    name: "Claude 3.5 Sonnet",
    category: "AI & Intelligence",
    role: "Logic & Code Architecture",
    whyIUseIt: "Deep reasoning, high-fidelity code reviews, refactoring complex algorithms, and subagent planning.",
    level: "Daily Driver",
  },
  {
    name: "Google Gemini",
    category: "AI & Intelligence",
    role: "Multimodal Systems & Research",
    whyIUseIt: "Large context ingestion, creative ideation, and rapid analysis across documents and audio/video.",
    level: "Daily Driver",
  },

  // DevOps & Tools
  {
    name: "Git / GitHub",
    category: "DevOps & Tools",
    role: "Version Control & Automation",
    whyIUseIt: "Branch hygiene, automated GitHub Actions, package releases, and open-source contribution.",
    level: "Daily Driver",
  },
  {
    name: "Docker",
    category: "DevOps & Tools",
    role: "Containerization",
    whyIUseIt: "Environment parity across dev and production, zero 'works on my machine' issues.",
    level: "Core Production",
  },
  {
    name: "Vercel & Netlify",
    category: "DevOps & Tools",
    role: "Edge Hosting & CI/CD",
    whyIUseIt: "Instant preview deployments, globally distributed serverless edge execution.",
    level: "Daily Driver",
  },
];

export const StackPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "Frontend", "Backend", "AI & Intelligence", "DevOps & Tools"];

  const filteredTech = detailedTech.filter(
    (item) => selectedFilter === "All" || item.category === selectedFilter
  );

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            Engineering Blueprint
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight font-light mb-6">
          Technical stack &amp;{" "}
          <span className="font-display italic text-text-primary font-normal">
            philosophy
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          A granular breakdown of the languages, frameworks, databases, and AI runtimes that power my software.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-stroke/40">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`text-xs px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
              selectedFilter === cat
                ? "bg-surface border border-white/30 text-white font-medium shadow-md shadow-black/40 ring-1 ring-white/10"
                : "bg-surface/50 border border-stroke text-muted hover:text-text-primary hover:border-stroke/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {filteredTech.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group relative bg-surface/50 hover:bg-surface border border-stroke rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:border-stroke/90 overflow-hidden"
          >
            <div className="absolute top-0 left-6 right-6 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-medium px-2.5 py-0.5 rounded-full bg-cyan-950/20 border border-cyan-800/30">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-muted/70">
                  {item.level}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display italic text-text-primary group-hover:text-white transition-colors mb-1">
                {item.name}
              </h3>

              <div className="text-xs font-mono text-muted/80 mb-3">
                {item.role}
              </div>

              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                {item.whyIUseIt}
              </p>
            </div>

            <div className="pt-4 border-t border-stroke/40 flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Zap className="w-3 h-3 text-amber-300" />
                Active in Production
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/60" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stack Philosophy Card */}
      <div className="rounded-3xl bg-surface/30 border border-stroke p-8 md:p-12 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-cyan-400 mb-3">
            <Cpu className="w-4 h-4" />
            <span>Architecture Core Tenet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display italic text-text-primary mb-4">
            Zero-Bloat Engineering
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-6">
            Technology is never chosen just because it is trendy. Every tool in this stack earned its spot by either eliminating human friction, speeding up user latency under 16ms, or giving me absolute creative control over the final pixel.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-text-primary font-medium hover:text-cyan-300 transition-colors"
          >
            <span>See these technologies applied in real projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
