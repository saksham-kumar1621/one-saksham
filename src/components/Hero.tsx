import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hls from "hls.js";
import gsap from "gsap";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const HLS_STREAM_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const Hero: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState<number>(0);

  // Setup HLS video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_STREAM_URL;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Roles cycle every 2 seconds
  useEffect(() => {
    const roles = personalInfo.rolesCycle || ["Full Stack Developer", "UI/UX Designer"];
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [personalInfo.rolesCycle]);

  // GSAP Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.0, stagger: 0.1 },
        "-=0.9"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] w-full flex flex-col items-center justify-center overflow-hidden bg-bg px-4 sm:px-6 pt-28 pb-20"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-65"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-75" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-bg/40 to-bg" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Location & Status Badge */}
        <div className="blur-in inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-surface/60 border border-white/[0.08] backdrop-blur-xl text-[11px] sm:text-xs text-muted mb-8 shadow-lg shadow-black/20 hover:border-white/20 transition-all duration-300">
          {/* Active status pulse */}
          <span className="flex items-center gap-1.5 text-text-primary font-medium whitespace-nowrap">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for work</span>
          </span>

          <span className="w-px h-3 bg-white/10 shrink-0" />

          {/* Location */}
          <span className="flex items-center gap-1.5 text-muted whitespace-nowrap">
            <MapPin className="w-3 h-3 text-cyan-400/90 shrink-0" />
            <span className="hidden sm:inline">{personalInfo.location}</span>
            <span className="inline sm:hidden">
              {personalInfo.location?.includes(",")
                ? personalInfo.location.split(",")[0].trim() + ", IN"
                : personalInfo.location || "India"}
            </span>
          </span>

          {/* Secondary craft tag (hidden on very small mobile to keep pill compact and elegant) */}
          <span className="hidden sm:inline w-px h-3 bg-white/10 shrink-0" />
          <span className="hidden sm:flex items-center gap-1 text-text-secondary whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-amber-300/80 shrink-0" />
            <span>Full Stack &amp; Design</span>
          </span>
        </div>

        {/* Name */}
        <h1 className="name-reveal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.95] sm:leading-[0.9] tracking-tight text-text-primary mb-6">
          {personalInfo.name}
        </h1>

        {/* Dynamic Role Line */}
        <div className="blur-in text-base sm:text-xl md:text-2xl text-muted font-normal mb-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <span>A</span>
          <span className="inline-block relative">
            <span
              key={roleIndex}
              className="font-display italic text-text-primary text-xl sm:text-2xl md:text-3xl animate-role-fade-in inline-block"
            >
              {(personalInfo.rolesCycle || ["Full Stack Developer"])[roleIndex] || personalInfo.role}
            </span>
          </span>
          <span>crafting digital craft.</span>
        </div>

        {/* Tagline / Bio */}
        <p className="blur-in text-base sm:text-lg md:text-xl text-text-primary/90 font-display italic max-w-xl leading-relaxed mb-4">
          &ldquo;{personalInfo.tagline}&rdquo;
        </p>

        <p className="blur-in text-xs sm:text-sm text-muted max-w-md leading-relaxed mb-12">
          {personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          {/* Explore Projects button */}
          <Link
            to="/projects"
            className="group relative rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 cursor-pointer p-[1.5px]"
          >
            {/* Animated gradient ring */}
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift" />
            <span className="relative flex items-center gap-2 rounded-full px-7 py-3.5 bg-text-primary text-bg font-medium transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Say Hi / Contact button */}
          <Link
            to="/contact"
            className="group relative rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 cursor-pointer p-[1.5px]"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift" />
            <span className="relative block rounded-full px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary font-medium transition-all duration-300 group-hover:border-transparent group-hover:bg-bg">
              Reach out...
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-medium">
          SCROLL
        </span>
        <div className="relative w-px h-8 bg-stroke overflow-hidden">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
