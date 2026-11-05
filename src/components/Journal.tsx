import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  image: string;
}

const entries: JournalEntry[] = [
  {
    id: "entry-1",
    title: "Designing for High Velocity: Crafting Interfaces that React in Sub-16ms",
    readTime: "4 min read",
    date: "Feb 2026",
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "entry-2",
    title: "The Typography of Restraint: Modern Editorial Systems in Dark Mode",
    readTime: "6 min read",
    date: "Jan 2026",
    category: "Typography",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "entry-3",
    title: "Kinetic Micro-Interactions: Why Physics Matter More Than Duration Curves",
    readTime: "5 min read",
    date: "Dec 2025",
    category: "Animation",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "entry-4",
    title: "Bridging the Gap Between Design Tokens and GPU Shaders in the Browser",
    readTime: "7 min read",
    date: "Nov 2025",
    category: "Engineering",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80",
  },
];

export const Journal: React.FC = () => {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header (Same pattern as Works) */}
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
                Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Recent{" "}
              <span className="font-display italic text-text-primary font-normal">
                thoughts
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              Writing on interaction design, engineering nuance, and creative systems.
            </p>
          </div>

          {/* Desktop "View all" button */}
          <div className="hidden md:inline-flex">
            <button className="group relative rounded-full text-xs font-medium cursor-pointer p-[1.5px] transition-transform duration-300 hover:scale-105">
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift" />
              <span className="relative flex items-center gap-2 rounded-full px-5 py-2.5 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-colors">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* 4 Journal entries as horizontal pills */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative rounded-[32px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke p-3 sm:p-4 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Subtle hover accent gradient glow on border */}
              <div className="absolute inset-0 rounded-[32px] sm:rounded-full border border-transparent group-hover:border-white/20 transition-colors pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Thumbnail & Title */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-full overflow-hidden shrink-0 border border-stroke">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Title and Category */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-muted font-medium">
                        {entry.category}
                      </span>
                      <span className="text-muted text-xs">•</span>
                      <span className="text-[11px] text-muted font-normal sm:hidden">
                        {entry.date}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg text-text-primary font-medium tracking-tight truncate group-hover:text-white transition-colors">
                      {entry.title}
                    </h3>
                  </div>
                </div>

                {/* Right: Meta & Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:shrink-0 px-2 sm:px-4">
                  <div className="hidden sm:flex items-center gap-6 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted/70" />
                      <span>{entry.readTime}</span>
                    </span>
                    <span className="font-mono text-muted/80">{entry.date}</span>
                  </div>

                  {/* Arrow circle */}
                  <div className="w-10 h-10 rounded-full border border-stroke bg-bg/50 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-text-primary group-hover:text-bg group-hover:border-text-primary">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button className="group relative rounded-full text-xs font-medium cursor-pointer p-[1.5px]">
            <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
            <span className="relative flex items-center gap-2 rounded-full px-6 py-3 bg-surface border border-stroke text-text-primary">
              <span>View all thoughts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

