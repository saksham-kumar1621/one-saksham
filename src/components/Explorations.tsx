import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { PinterestIcon } from "./icons/PinterestIcon";

gsap.registerPlugin(ScrollTrigger);

export const Explorations: React.FC = () => {
  const { explorations, personalInfo } = usePortfolio();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedCenterRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Only apply heavy dual-column parallax and scroll pinning on desktop screens (>= 768px)
    mm.add("(min-width: 768px)", () => {
      if (!containerRef.current || !pinnedCenterRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedCenterRef.current,
        pinSpacing: false,
      });

      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: "15%" },
          {
            y: "-30%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: "35%" },
          {
            y: "-45%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const mid = Math.ceil(explorations.length / 2);
  const col1Items = explorations.slice(0, mid);
  const col2Items = explorations.slice(mid);

  return (
    <section id="explorations" className="bg-bg w-full">
      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (< md): Flowing 2-Column Art Gallery       */}
      {/* ======================================================== */}
      <div className="md:hidden py-16 px-4 sm:px-6 flex flex-col items-center border-t border-stroke/40">
        <div className="text-center mb-8 max-w-sm mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-stroke" />
            <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-medium font-mono">
              Explorations
            </span>
            <span className="w-5 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl font-light text-text-primary tracking-tight mb-2">
            Visual{" "}
            <span className="font-display italic text-text-primary font-normal">
              playground
            </span>
          </h2>
          <p className="text-xs text-muted leading-relaxed mb-5">
            Curated visual artifacts, graphic compositions, and aesthetic moodboards from my Pinterest.
          </p>
          <a
            href={personalInfo.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-surface border border-stroke text-text-primary text-xs font-medium shadow-md"
          >
            <PinterestIcon className="w-3.5 h-3.5 text-[#E60023]" />
            <span>Explore Pinterest Board</span>
            <ArrowUpRight className="w-3 h-3 text-muted" />
          </a>
        </div>

        {/* Mobile 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
          {explorations.map((item) => (
            <a
              key={item.id}
              href={item.pinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl bg-surface border border-stroke overflow-hidden aspect-[4/5] flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 z-10">
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted line-clamp-1 mb-0.5">
                  {item.category}
                </span>
                <span className="text-xs font-medium text-white line-clamp-1">
                  {item.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP VIEW (>= md): Cinematic Pinned Parallax Scroll */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        className="hidden md:block relative min-h-[300vh] w-full overflow-hidden"
      >
        {/* Layer 1: Pinned Center (z-10) */}
        <div
          ref={pinnedCenterRef}
          className="h-screen w-full flex items-center justify-center pointer-events-none sticky top-0 z-10 px-4"
        >
          <div className="text-center pointer-events-auto max-w-lg mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium font-mono">
                Explorations
              </span>
              <span className="w-6 h-px bg-stroke" />
            </div>

            {/* Heading */}
            <h2 className="text-5xl lg:text-7xl text-text-primary tracking-tight font-light mb-4">
              Visual{" "}
              <span className="font-display italic text-text-primary font-normal">
                playground
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-sm mx-auto mb-8 leading-relaxed">
              Curated visual artifacts, graphic compositions, and aesthetic moodboards from my Pinterest board.
            </p>

            {/* Pinterest CTA Button */}
            <a
              href={personalInfo.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 bg-surface/90 hover:bg-surface border border-stroke hover:border-red-500/40 text-text-primary text-xs font-medium backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-500/10"
            >
              <PinterestIcon className="w-4 h-4 text-[#E60023]" />
              <span>Explore Pinterest Board</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Layer 2: Parallax Columns (z-20, absolute) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12 grid grid-cols-2 gap-8 md:gap-36 lg:gap-52 items-center">
            {/* Column 1 (Left) */}
            <div
              ref={col1Ref}
              className="flex flex-col gap-16 md:gap-32 items-center md:items-start pointer-events-auto"
            >
              {col1Items.map((item) => (
                <a
                  key={item.id}
                  href={item.pinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open "${item.title}" on Pinterest`}
                  style={{
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                  className="w-full aspect-square max-w-[260px] sm:max-w-[300px] md:max-w-[320px] rounded-3xl bg-surface border border-stroke overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-105 hover:border-red-500/40 group relative block"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
                        <PinterestIcon className="w-3 h-3 text-[#E60023]" />
                        {item.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                        Pin
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                    <span className="text-sm font-medium text-white line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Column 2 (Right) */}
            <div
              ref={col2Ref}
              className="flex flex-col gap-20 md:gap-36 items-center md:items-end pointer-events-auto pt-40"
            >
              {col2Items.map((item) => (
                <a
                  key={item.id}
                  href={item.pinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open "${item.title}" on Pinterest`}
                  style={{
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                  className="w-full aspect-square max-w-[260px] sm:max-w-[300px] md:max-w-[320px] rounded-3xl bg-surface border border-stroke overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-105 hover:border-red-500/40 group relative block"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
                        <PinterestIcon className="w-3 h-3 text-[#E60023]" />
                        {item.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                        Pin
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                    <span className="text-sm font-medium text-white line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
