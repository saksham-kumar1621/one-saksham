import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Compass, Sparkles, Terminal, Cpu } from "lucide-react";
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

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight font-light mb-6">
          The story behind{" "}
          <span className="font-display italic text-text-primary font-normal">
            the code
          </span>
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
            <span className="text-xs uppercase font-mono tracking-widest text-brand-light block mb-2">
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
              <MapPin className="w-4 h-4 text-brand-light" />
              <span>Muzaffarpur, Bihar, India</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <Sparkles className="w-4 h-4 text-brand-light" />
              <span>Full Stack & Desktop Dev</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <Terminal className="w-4 h-4 text-brand-light" />
              <span>Real-Time & Optimization</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Card & Quick Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Persona Card with Golden Ratio Visual Presentation */}
          <div className="rounded-3xl bg-surface/50 border border-stroke overflow-hidden relative group hover:border-stroke/90 transition-all duration-300 shadow-xl">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

            {/* Visual Portrait Cover Header (16:10 aspect ratio) */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-bg border-b border-stroke/40">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
              />
              {/* Halftone texture overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-25 pointer-events-none" />
              {/* Permanent dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-black/30 pointer-events-none" />

              {/* Status Pill floating top-left */}
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400 text-[10px] font-mono shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                </span>
                <span>Available for work</span>
              </div>

              {/* Bottom Info Floating Overlay */}
              <div className="absolute bottom-3 left-4 right-4 z-10">
                <h3 className="text-2xl font-display italic text-text-primary tracking-tight leading-tight">
                  {personalInfo.fullName}
                </h3>
                <p className="text-xs font-mono text-brand-light font-medium">
                  @{personalInfo.alias} • Full Stack &amp; Design
                </p>
              </div>
            </div>

            {/* Card Body Details */}
            <div className="p-6 sm:p-7">
              <p className="text-xs sm:text-sm text-muted mb-5 leading-relaxed">
                &ldquo;{personalInfo.tagline}&rdquo; — focused on crafting minimal, high-velocity digital tools with zero friction and high aesthetic restraint.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-bg border border-stroke text-xs text-text-primary hover:border-text-primary/40 hover:text-white transition-all group/link"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Profile</span>
                  </span>
                  <span className="text-muted font-mono text-[11px] group-hover/link:text-brand-light transition-colors">
                    @saksham-kumar1621 →
                  </span>
                </a>

                <a
                  href={personalInfo.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-bg border border-stroke text-xs text-text-primary hover:border-text-primary/40 hover:text-white transition-all group/link"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-brand-light" />
                    <span>Pinterest Inspiration</span>
                  </span>
                  <span className="text-muted font-mono text-[11px] group-hover/link:text-brand-light transition-colors">
                    @OneSaksham1621 →
                  </span>
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-bg border border-stroke text-xs text-text-primary hover:border-text-primary/40 hover:text-white transition-all group/link"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-light" />
                    <span>Direct Email</span>
                  </span>
                  <span className="text-muted font-mono text-[11px] truncate max-w-[150px] group-hover/link:text-brand-light transition-colors">
                    {personalInfo.email}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface/30 border border-stroke">
              <Cpu className="w-5 h-5 text-brand-light mb-2" />
              <div className="text-base font-semibold text-text-primary">Performance</div>
              <p className="text-[11px] text-muted mt-1">
                Zero-lag, sub-16ms render loops and lightweight bundles.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface/30 border border-stroke">
              <Sparkles className="w-5 h-5 text-brand-light mb-2" />
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
