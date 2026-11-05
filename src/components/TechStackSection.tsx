import React from "react";
import { motion } from "framer-motion";
import { 
  Layout, 
  Database, 
  Bot, 
  Terminal, 
  ArrowUpRight 
} from "lucide-react";
import { Link } from "react-router-dom";

interface TechGroup {
  id: string;
  category: string;
  subtitle: string;
  tagline: string;
  colSpan: string;
  icon: React.ReactNode;
  accentColor: string;
  skills: { name: string; highlight?: boolean }[];
}

const techGroups: TechGroup[] = [
  {
    id: "frontend",
    category: "Frontend & Spatial UI",
    subtitle: "Client Engineering",
    tagline: "Obsessed with micro-interactions, layout precision, and fluid 60fps animations.",
    colSpan: "md:col-span-7",
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
    accentColor: "from-cyan-500/20 to-transparent",
    skills: [
      { name: "React", highlight: true },
      { name: "Next.js 14", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)" },
      { name: "Figma" },
    ],
  },
  {
    id: "backend",
    category: "Backend & Systems",
    subtitle: "Runtimes & Data",
    tagline: "Scalable APIs, ephemeral WebSockets, and resilient relational datastores.",
    colSpan: "md:col-span-5",
    icon: <Database className="w-5 h-5 text-indigo-400" />,
    accentColor: "from-indigo-500/20 to-transparent",
    skills: [
      { name: "Node.js", highlight: true },
      { name: "Express" },
      { name: "PostgreSQL", highlight: true },
      { name: "MongoDB" },
      { name: "Firebase" },
      { name: "PHP / MySQL" },
    ],
  },
  {
    id: "ai",
    category: "AI & Augmented Workflows",
    subtitle: "Intelligence Layer",
    tagline: "Leveraging frontier models to automate tasks, generate assets, and architect faster.",
    colSpan: "md:col-span-5",
    icon: <Bot className="w-5 h-5 text-amber-300" />,
    accentColor: "from-amber-500/20 to-transparent",
    skills: [
      { name: "Claude 3.5 Sonnet", highlight: true },
      { name: "Google Gemini", highlight: true },
      { name: "AI Agent Orchestration" },
    ],
  },
  {
    id: "devops",
    category: "Tooling & Cloud Runtimes",
    subtitle: "DevOps & Infrastructure",
    tagline: "Zero-terminal automation, containerized desktop engines, and seamless CDN edge deploys.",
    colSpan: "md:col-span-7",
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    accentColor: "from-emerald-500/20 to-transparent",
    skills: [
      { name: "Git / GitHub", highlight: true },
      { name: "Docker", highlight: true },
      { name: "Vercel & Netlify", highlight: true },
      { name: "Tauri / Desktop Runtimes" },
      { name: "Linux Scripting" },
    ],
  },
];

export const TechStackSection: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke/40 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header matching Selected Works style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Technical Architecture
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Digital{" "}
              <span className="font-display italic text-text-primary font-normal">
                arsenal
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              The modern tools, runtimes, and intelligence layers engineered to bring unconventional ideas to life.
            </p>
          </div>

          {/* Desktop "Explore Stack" button */}
          <div className="hidden md:inline-flex">
            <Link
              to="/stack"
              className="group relative rounded-full text-xs font-medium cursor-pointer p-[1.5px] transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift" />
              <span className="relative flex items-center gap-2 rounded-full px-5 py-2.5 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-colors">
                <span>Detailed stack guide</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid layout matching the 7/5 & 5/7 rhythm of Selected Works */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`${group.colSpan} relative bg-surface border border-stroke rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-stroke/80 transition-all duration-300 overflow-hidden min-h-[260px]`}
            >
              {/* Halftone texture overlay on card hover */}
              <div className="absolute inset-0 halftone-overlay opacity-15 mix-blend-multiply pointer-events-none" />

              {/* Subtle top accent gradient line reveal on hover */}
              <div className="absolute top-0 left-6 right-6 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Ambient colored gradient bloom */}
              <div
                className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${group.accentColor} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
              />

              {/* Top Row: Icon & Category Header */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-2xl bg-bg/80 border border-stroke flex items-center justify-center">
                    {group.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-muted/70">
                    {group.subtitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display italic text-text-primary mb-2 group-hover:text-white transition-colors">
                  {group.category}
                </h3>

                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md">
                  {group.tagline}
                </p>
              </div>

              {/* Bottom: Interactive Skill Pills Styled Like Floating Portfolio Badges */}
              <div className="relative z-10 pt-4 border-t border-stroke/40 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-default select-none ${
                      skill.highlight
                        ? "bg-bg border border-stroke text-text-primary hover:border-white/30 hover:scale-105"
                        : "bg-bg/60 border border-stroke/60 text-muted hover:text-text-primary hover:border-stroke"
                    }`}
                  >
                    {skill.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                    )}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Stack Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            to="/stack"
            className="group relative rounded-full text-xs font-medium cursor-pointer p-[1.5px]"
          >
            <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
            <span className="relative flex items-center gap-2 rounded-full px-6 py-3 bg-surface border border-stroke text-text-primary">
              <span>Detailed stack guide</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
