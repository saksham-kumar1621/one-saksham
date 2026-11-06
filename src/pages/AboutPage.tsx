import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Compass, Sparkles, Terminal, Code, Cpu } from "lucide-react";
import { GithubIcon } from "../components/icons/GithubIcon";
import { usePortfolio } from "../context/PortfolioContext";

export const AboutPage: React.FC = () => {
  const { personalInfo } = usePortfolio();
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            About One Saksham
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight mb-6">
          The Story Behind The Code
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          Full stack developer, desktop software creator, and aesthetic curator based in Muzaffarpur, Bihar.
        </p>
      </motion.div>

      {/* Main Grid: Bio & Image/Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start mb-20">
        {/* Left Column: Story & Philosophy */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-muted leading-relaxed">
          <div className="p-6 rounded-3xl bg-surface/40 border border-stroke text-text-primary">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 block mb-2">
              Mission Statement
            </span>
            <p className="text-xl sm:text-2xl font-display italic leading-snug">
              &ldquo;Building Things Nobody Asked For — but once they exist, you can&apos;t imagine living without them.&rdquo;
            </p>
          </div>

          <p>
            Hey! I&apos;m <span className="text-text-primary font-medium">{personalInfo.name}</span> (known online as <span className="text-text-primary font-medium">{personalInfo.alias}</span>). I&apos;m a Full Stack Developer and Designer hailing from <span className="text-text-primary font-medium">{personalInfo.location}</span>.
          </p>

          <p>
            My journey began with a curiosity about how games, operating systems, and networked software work under the hood. When standard solutions feel bloated, restrictive, or require endless command-line hassle, I build alternatives.
          </p>

          <p>
            From creating <strong className="text-text-primary">ModVault</strong> (a high-performance Minecraft mod engine) and <strong className="text-text-primary">Universal Git Pusher</strong> (a dark-themed web GUI that frees devs from terminal syntax), to native storage optimizers like <strong className="text-text-primary">StorageRelief</strong> that purge gigabytes of ghost files — I love turning complex developer and gaming problems into 1-click tools.
          </p>

          <div className="pt-4 border-t border-stroke/40 flex flex-wrap gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-text-primary">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Muzaffarpur, Bihar, India</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Full Stack & Desktop Dev</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Real-Time & Optimization</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Card & Pinterest Board */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Persona Card */}
          <div className="rounded-3xl bg-surface border border-stroke p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
              <Code className="w-32 h-32 text-cyan-400" />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-stroke bg-bg shrink-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-display italic text-text-primary">
                  {personalInfo.fullName}
                </h3>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  @{personalInfo.alias}
                </p>
              </div>
            </div>

            <p className="text-xs text-muted mb-6 leading-relaxed">
              Obsessed with minimalism, performance tuning, and designing software interfaces that feel like digital art.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-bg border border-stroke text-xs text-text-primary hover:border-text-primary/40 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </span>
                <span className="text-muted font-mono text-[11px]">@saksham-kumar1621</span>
              </a>

              <a
                href={personalInfo.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-bg border border-stroke text-xs text-text-primary hover:border-text-primary/40 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-rose-400" />
                  <span>Pinterest Design Inspiration</span>
                </span>
                <span className="text-muted font-mono text-[11px]">@OneSaksham1621</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-bg border border-stroke text-xs text-text-primary hover:border-text-primary/40 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct Email</span>
                </span>
                <span className="text-muted font-mono text-[11px] truncate max-w-[150px]">
                  {personalInfo.email}
                </span>
              </a>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface/30 border border-stroke">
              <Cpu className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-base font-semibold text-text-primary">Performance</div>
              <p className="text-[11px] text-muted mt-1">
                Zero-lag, sub-16ms render loops and lightweight bundles.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface/30 border border-stroke">
              <Sparkles className="w-5 h-5 text-amber-300 mb-2" />
              <div className="text-base font-semibold text-text-primary">Aesthetics</div>
              <p className="text-[11px] text-muted mt-1">
                Dark themes, tactile motion, and typographic tension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
