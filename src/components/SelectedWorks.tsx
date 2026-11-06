import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";
import { usePortfolio } from "../context/PortfolioContext";

export const SelectedWorks: React.FC = () => {
  const { projects } = usePortfolio();
  // Show featured projects or first 4 projects in bento layout
  const featuredOnly = projects.filter((p) => p.featured);
  const featuredProjects = featuredOnly.length >= 2 ? featuredOnly.slice(0, 4) : projects.slice(0, 4);
  const colSpans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

  return (
    <section id="work" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
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
                Featured Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Crafted{" "}
              <span className="font-display italic text-text-primary font-normal">
                creations
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              High-utility desktop apps, interactive gaming mechanics, and full-stack platforms from GitHub.
            </p>
          </div>

          {/* Desktop "View all work" button */}
          <div className="hidden md:inline-flex">
            <Link
              to="/projects"
              className="group relative rounded-full text-xs font-medium cursor-pointer p-[1.5px] transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift" />
              <span className="relative flex items-center gap-2 rounded-full px-5 py-2.5 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-colors">
                <span>View all projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`${colSpans[index]} relative bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-pointer aspect-[16/10] md:aspect-auto md:min-h-[380px] lg:min-h-[420px] block`}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
              />

              {/* Halftone Overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />

              {/* Permanent dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

              {/* Default Card Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between transition-opacity duration-300 group-hover:opacity-30 pointer-events-none">
                <div className="max-w-md">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-medium block mb-1">
                    {project.category} • {project.language}
                  </span>
                  <h3 className="text-xl md:text-2xl text-text-primary font-medium tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted/90 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted border border-stroke/60 rounded-full px-3 py-1 bg-surface/60 backdrop-blur-sm shrink-0">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </div>
              </div>

              {/* Hover Floating Pill: Sleek, compact & uniform CTA */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                <div className="relative p-[1.5px] rounded-full">
                  <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                  <div className="relative bg-white text-black px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-2xl">
                    <GithubIcon className="w-4 h-4 text-black" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-black">
                      View on GitHub
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile View All Work Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            to="/projects"
            className="group relative rounded-full text-xs font-medium cursor-pointer p-[1.5px]"
          >
            <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
            <span className="relative flex items-center gap-2 rounded-full px-6 py-3 bg-surface border border-stroke text-text-primary">
              <span>View all projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
