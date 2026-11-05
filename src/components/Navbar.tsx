import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Stack", path: "/stack" },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/50 border-white/15 bg-surface/95" : ""
        }`}
      >
        {/* 1. Logo */}
        <Link
          to="/"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          className="relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
          aria-label="Home - One Saksham"
        >
          {/* Accent gradient border (reverses on hover) */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              isLogoHovered ? "accent-gradient-reverse" : "accent-gradient"
            }`}
          />
          {/* Inner circle */}
          <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary font-medium tracking-tight">
              OS
            </span>
          </div>
        </Link>

        {/* 2. Divider (hidden on very small screens) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1.5" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-text-primary bg-stroke/60 font-medium shadow-sm"
                    : "text-muted hover:text-text-primary hover:bg-stroke/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5" />

        {/* 5. "Say hi" button -> /contact */}
        <Link
          to="/contact"
          className="relative group text-xs sm:text-sm rounded-full py-1.5 sm:py-2 px-3 sm:px-4 cursor-pointer transition-all duration-300"
        >
          {/* Animated gradient border behind on hover */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift -z-10" />

          <span className="relative flex items-center gap-1.5 text-text-primary font-medium">
            <span>Say hi</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </nav>
    </header>
  );
};
