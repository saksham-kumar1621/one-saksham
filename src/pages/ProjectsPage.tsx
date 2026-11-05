import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, Star, Terminal, Code2 } from "lucide-react";
import { GithubIcon } from "../components/icons/GithubIcon";
import { PROJECTS } from "../data/portfolioData";
import type { ProjectItem } from "../data/portfolioData";

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Tools & Desktop", "Full Stack", "Games & Realtime"];

  const filteredProjects = PROJECTS.filter((project: ProjectItem) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1300px] mx-auto min-h-screen">
      {/* Page Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            GitHub Portfolio & Lab
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight mb-6">
          Selected Works & Tools
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          A showcase of native desktop tools, Minecraft optimization suites, zero-terminal Git helpers, and real-time interactive web apps.
        </p>
      </motion.div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-stroke/40">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-text-primary text-bg font-semibold shadow-md"
                  : "bg-surface border border-stroke text-muted hover:text-text-primary hover:border-stroke/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search projects or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface/70 border border-stroke rounded-full pl-10 pr-4 py-2 text-xs text-text-primary placeholder:text-muted/60 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center text-muted">
          <Code2 className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium text-text-primary mb-1">No matching projects found</p>
          <p className="text-sm">Try tweaking your search keyword or selecting a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col justify-between bg-surface/40 hover:bg-surface border border-stroke rounded-3xl p-6 transition-all duration-300 hover:border-stroke/90 hover:shadow-2xl overflow-hidden"
            >
              {/* Subtle top accent gradient line on hover */}
              <div className="absolute top-0 left-6 right-6 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header Tag & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-medium px-2.5 py-0.5 rounded-full bg-cyan-950/30 border border-cyan-800/30">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-300/80 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-300/20" />
                    <span>{project.stars}</span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-display italic text-text-primary group-hover:text-white transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-mono text-muted/90 mb-3 font-medium">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Bottom: Tags & Action Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-bg border border-stroke/70 text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-stroke/40 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    {project.language}
                  </span>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text-primary hover:text-cyan-300 font-medium transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* GitHub Callout Footer */}
      <div className="mt-20 p-8 md:p-10 rounded-3xl bg-surface/30 border border-stroke text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-3">
          Want to explore more experimental repositories?
        </h3>
        <p className="text-xs sm:text-sm text-muted max-w-lg mb-6">
          Check out my GitHub profile where all side experiments, storage cleaner utilities, and code drafts reside.
        </p>
        <a
          href="https://github.com/saksham-kumar1621"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 bg-text-primary text-bg text-xs font-semibold hover:bg-bg hover:text-text-primary border border-transparent hover:border-stroke transition-all duration-300"
        >
          <GithubIcon className="w-4 h-4" />
          <span>github.com/saksham-kumar1621</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
