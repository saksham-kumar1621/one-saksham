import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: number;
}

const explorationItems: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Chroma Form #01",
    category: "Generative Shader",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
    rotation: -3,
  },
  {
    id: "exp-2",
    title: "Voxel Dimension",
    category: "3D Experiment",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85",
    rotation: 2,
  },
  {
    id: "exp-3",
    title: "Brutalist Shadow",
    category: "Spatial Grid",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=85",
    rotation: -2,
  },
  {
    id: "exp-4",
    title: "Liquid Refraction",
    category: "Raymarching",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
    rotation: 3,
  },
  {
    id: "exp-5",
    title: "Analog Artifacts",
    category: "Typography",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
    rotation: -2.5,
  },
  {
    id: "exp-6",
    title: "Atmospheric Noise",
    category: "Procedural Mesh",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=85",
    rotation: 2,
  },
];

export const Explorations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedCenterRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  const [activeLightbox, setActiveLightbox] = useState<ExplorationItem | null>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightbox(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            Unconstrained experiments in generative aesthetics, spatial composition, and WebGL textures.
          </p>

          {/* Dribbble CTA Button */}
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 bg-surface/90 hover:bg-surface border border-stroke text-text-primary text-xs font-medium backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            <span>Follow on Dribbble</span>
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
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                }}
                className="w-full aspect-square max-w-[260px] sm:max-w-[300px] md:max-w-[320px] rounded-3xl bg-surface border border-stroke overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-105 hover:border-white/30 group relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                    {item.category}
                  </span>
                  <span className="text-sm font-medium text-white">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Right) */}
          <div
            ref={col2Ref}
            className="flex flex-col gap-20 md:gap-36 items-center md:items-end pointer-events-auto pt-40"
          >
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                }}
                className="w-full aspect-square max-w-[260px] sm:max-w-[300px] md:max-w-[320px] rounded-3xl bg-surface border border-stroke overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-105 hover:border-white/30 group relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                    {item.category}
                  </span>
                  <span className="text-sm font-medium text-white">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:bg-white hover:text-black transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] w-full bg-black">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-muted block mb-1">
                    {activeLightbox.category}
                  </span>
                  <h3 className="text-2xl font-display italic text-text-primary">
                    {activeLightbox.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="text-xs uppercase tracking-widest text-muted hover:text-text-primary transition-colors font-medium"
                >
                  Close [ESC]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

