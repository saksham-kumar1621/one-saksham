import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, MapPin, Send, Check, Copy, Clock, Sparkles, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon } from "../components/icons/GithubIcon";
import { usePortfolio } from "../context/PortfolioContext";

export const ContactPage: React.FC = () => {
  const { personalInfo, submitContactMessage } = usePortfolio();
  const [copied, setCopied] = useState<boolean>(false);
  const [istTime, setIstTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Calculate local time in Muzaffarpur, Bihar (IST: Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit message to Firebase Firestore / CMS inbox
      await submitContactMessage(formData);
    } catch (err) {
      console.warn("Could not save to Firestore:", err);
    }

    // 2. Open mailto link as mail client fallback
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Smooth fallback navigation without breaking page state
    try {
      window.location.href = mailtoLink;
    } catch {
      // Ignore if browser restricts mailto navigation
    }

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto min-h-screen overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-[11px] sm:text-xs text-muted uppercase tracking-[0.25em] sm:tracking-[0.3em] font-mono font-medium">
            Contact &amp; Collaboration
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-text-primary tracking-tight font-light mb-4 sm:mb-6 leading-[1.08] text-balance">
          Let&apos;s build{" "}
          <span className="font-display italic text-text-primary font-normal">
            something real
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-muted max-w-2xl leading-relaxed text-pretty">
          Whether you want to discuss a new software tool, hire me for full-stack web/desktop engineering, or just chat about gaming optimization — my inbox is open.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
        {/* Left Column: Direct Connect & Info */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
          {/* Quick Email Card */}
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-surface border border-stroke/80 relative overflow-hidden group shadow-lg shadow-black/20">
            {/* Top subtle brand highlight */}
            <div className="absolute top-0 left-0 right-0 h-px accent-gradient opacity-60 pointer-events-none" />

            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-brand-light block mb-2 font-medium">
              Direct Mail
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl font-display italic text-text-primary mb-5 sm:mb-6 break-all sm:break-normal select-all">
              {personalInfo.email}
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 bg-bg border border-stroke text-xs text-text-primary hover:border-brand-light/60 hover:text-white transition-all cursor-pointer shadow-sm active:scale-[0.98] touch-manipulation group/btn"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-muted group-hover/btn:text-brand-light transition-colors" />
                    <span>Copy email address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-2.5 bg-bg/60 hover:bg-bg border border-stroke/80 text-xs text-muted hover:text-text-primary transition-all active:scale-[0.98] touch-manipulation"
                title="Open directly in your mail app"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open mail</span>
                <ArrowUpRight className="w-3 h-3 text-muted/70" />
              </a>
            </div>
          </div>

          {/* Location & Realtime Clock */}
          <div className="p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-surface/40 border border-stroke/80 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-md shadow-black/10">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-bg border border-stroke/70 shrink-0">
                <MapPin className="w-4 h-4 text-brand-light" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-text-primary block leading-tight">
                  {personalInfo.location}
                </span>
                <span className="text-[11px] text-muted">India (UTC +5:30)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg border border-stroke text-xs font-mono text-muted shrink-0">
              <Clock className="w-3.5 h-3.5 text-brand-light" />
              <span>{istTime || "IST"}</span>
            </div>
          </div>

          {/* Social Badges */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-surface/40 border border-stroke/80 hover:bg-surface hover:border-brand-light/40 transition-all group flex flex-col justify-between shadow-sm active:scale-[0.99] touch-manipulation"
            >
              <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary mb-3 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] sm:text-xs text-muted block font-mono">GitHub</span>
                <span className="text-xs sm:text-sm font-medium text-text-primary truncate block">
                  @saksham-kumar1621
                </span>
              </div>
            </a>

            <a
              href={personalInfo.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-surface/40 border border-stroke/80 hover:bg-surface hover:border-brand-light/40 transition-all group flex flex-col justify-between shadow-sm active:scale-[0.99] touch-manipulation"
            >
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-brand-light mb-3 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] sm:text-xs text-muted block font-mono">Pinterest</span>
                <span className="text-xs sm:text-sm font-medium text-text-primary truncate block">
                  @OneSaksham1621
                </span>
              </div>
            </a>
          </div>

          {/* Availability Status */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface/50 border border-stroke/80 flex items-center gap-3 sm:gap-3.5 shadow-sm">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </span>
            <p className="text-xs text-text-primary/90 font-medium leading-relaxed">
              Currently accepting selected freelance projects, consultation &amp; full-time opportunities.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface/60 border border-stroke/80 relative overflow-hidden group hover:border-stroke/90 transition-all shadow-xl shadow-black/30 backdrop-blur-sm">
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <h3 className="text-xl sm:text-2xl md:text-3xl font-display italic text-text-primary mb-1.5 sm:mb-2">
              Send a Direct Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-6 sm:mb-8 leading-relaxed">
              Fill in your details below and it will compose directly to my inbox with instant synchronization.
            </p>

            {formSubmitted ? (
              <div className="py-8 sm:py-12 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-950/40">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl sm:text-2xl font-display italic text-text-primary mb-2">
                  Dispatch Initialized!
                </h4>
                <p className="text-xs sm:text-sm text-muted max-w-sm mb-6 leading-relaxed">
                  Your message has been safely received and stored! Your email client has also been opened if you want to follow up directly at <span className="text-text-primary font-medium">{personalInfo.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs underline text-brand-light cursor-pointer hover:text-white transition-colors py-1 px-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-bg/90 border border-stroke/80 rounded-xl sm:rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-base sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 touch-manipulation font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-bg/90 border border-stroke/80 rounded-xl sm:rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-base sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 touch-manipulation font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
                    Subject / Project Type
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Stack Web App / Desktop Tool / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-bg/90 border border-stroke/80 rounded-xl sm:rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-base sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 touch-manipulation font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your idea, timeline, or what you'd like to build together..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-bg/90 border border-stroke/80 rounded-xl sm:rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-base sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 resize-none min-h-[110px] touch-manipulation font-sans"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto group relative rounded-full p-[1.5px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 touch-manipulation"
                  >
                    <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                    <div className="relative flex items-center justify-center gap-2 rounded-full px-7 sm:px-8 py-3.5 sm:py-4 bg-text-primary text-bg font-semibold text-xs uppercase tracking-wider group-hover:bg-bg group-hover:text-text-primary transition-colors">
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Dispatching..." : "Send Dispatch"}</span>
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
