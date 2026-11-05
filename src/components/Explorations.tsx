import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { PinterestIcon } from "./icons/PinterestIcon";

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  pinUrl: string;
  rotation: number;
}

const explorationItems: ExplorationItem[] = [
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

export const Explorations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedCenterRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinnedCenterRef.current) return;

      // 1. Pin center header in place while scrolling through min-h-[300vh]
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedCenterRef.current,
        pinSpacing: false,
      });

      // 2. Parallax movements for Column 1 and Column 2
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const col1Items = explorationItems.slice(0, 3);
  const col2Items = explorationItems.slice(3, 6);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[300vh] bg-bg w-full overflow-hidden"
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
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <span className="w-6 h-px bg-stroke" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-text-primary tracking-tight font-light mb-4">
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
            href={PERSONAL_INFO.pinterest}
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
    </section>
  );
};
