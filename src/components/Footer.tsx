import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ArrowUpRight, Mail, Lock, MapPin } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { LinktreeIcon } from "./icons/LinktreeIcon";
import { PinterestIcon } from "./icons/PinterestIcon";
import { usePortfolio } from "../context/PortfolioContext";

export const Footer: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const location = useLocation();
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // GSAP Marquee: xPercent: -50, duration: 38, ease: "none", repeat: -1
  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // Don't render full marketing footer on CMS Admin page
  if (location.pathname === "/admin") return null;

  const marqueeText = Array(10).fill("BUILDING THINGS NOBODY ASKED FOR • ").join("");

  return (
    <footer
      id="contact-footer"
      className="relative bg-bg pt-16 md:pt-24 pb-12 sm:pb-8 md:pb-12 overflow-hidden border-t border-stroke/30"
    >
      {/* Subtle radial ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/5 via-bg/40 to-bg pointer-events-none select-none" />

      {/* GSAP Marquee Banner */}
      <div className="relative z-10 w-full overflow-hidden py-4 border-y border-stroke/40 backdrop-blur-sm bg-bg/40 mb-14 md:mb-20">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap flex font-mono text-xs sm:text-sm tracking-[0.25em] text-muted font-medium select-none uppercase"
        >
          <span className="inline-block">{marqueeText}</span>
          <span className="inline-block">{marqueeText}</span>
        </div>
      </div>

      {/* Main CTA Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            Get In Touch
          </span>
          <span className="w-8 h-px bg-stroke" />
        </div>

        {/* Big Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-text-primary tracking-tight mb-8 max-w-3xl leading-[1.1]">
          Have an idea or project? Let&apos;s build{" "}
          <span className="italic font-normal">something unexpected</span>.
        </h2>

        {/* Email Button with gradient hover border ring */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="group relative rounded-full p-[1.5px] cursor-pointer transition-transform duration-300 hover:scale-105 mb-14 md:mb-16 max-w-[92vw]"
        >
          {/* Animated gradient ring */}
          <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift" />
          <div className="relative flex items-center gap-2 sm:gap-3 rounded-full px-5 sm:px-10 py-3.5 sm:py-5 bg-surface border border-stroke text-text-primary font-medium text-xs sm:text-base md:text-lg group-hover:border-transparent transition-all overflow-hidden">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-muted group-hover:text-text-primary transition-colors shrink-0" />
            <span className="truncate">{personalInfo.email}</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
          </div>
        </a>

        {/* Footer Bottom Bar */}
        <div className="w-full pt-8 sm:pt-10 border-t border-stroke/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* 1. Social Links (Crawlable entity channels: GitHub, Instagram, Linktree, Pinterest, Email) */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 md:gap-7">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 group"
              title="One Saksham on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
            </a>

            {personalInfo.instagram && (
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                title="One Saksham on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            )}

            {personalInfo.linktree && (
              <a
                href={personalInfo.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                title="One Saksham on Linktree"
              >
                <LinktreeIcon className="w-4 h-4" />
                <span>Linktree</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            )}

            <a
              href={personalInfo.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 group"
              title="One Saksham on Pinterest"
            >
              <PinterestIcon className="w-4 h-4" />
              <span>Pinterest</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 group"
              title="Contact One Saksham via Email"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          </div>

          {/* 2. Redesigned Available Box (Refined status capsule) */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-surface/50 border border-white/[0.08] backdrop-blur-xl shadow-sm hover:border-white/20 transition-all duration-300">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </span>
            <span className="text-[11px] sm:text-xs text-text-primary/90 font-medium tracking-wide whitespace-nowrap">
              {personalInfo.status}
            </span>
          </div>

          {/* 3. Redesigned One Saksham & Address Block (Polished typography & hierarchy) */}
          <div className="flex flex-col items-center sm:items-end text-xs text-muted gap-1">
            {/* Brand Copyright */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted/60">&copy; {new Date().getFullYear()}</span>
              <span className="font-display italic text-sm text-text-primary tracking-tight font-normal">
                {personalInfo.alias}
              </span>
            </div>

            {/* Address & CMS Link */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 text-[11px] text-muted/70">
              <MapPin className="w-3 h-3 text-brand-light shrink-0" />
              <span>{personalInfo.location}</span>
              <span className="text-stroke/60">•</span>
              <Link
                to="/admin"
                className="text-muted/60 hover:text-text-primary transition-colors flex items-center gap-1 py-0.5 px-1 rounded hover:bg-surface/60"
                title="Admin Dashboard"
              >
                <Lock className="w-2.5 h-2.5 text-muted/70" />
                <span>CMS</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
