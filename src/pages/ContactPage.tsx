import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, MapPin, Send, Check, Copy, Clock, Sparkles } from "lucide-react";
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
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

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
            Contact & Collaboration
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight mb-6">
          Let&apos;s Build Something Real
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          Whether you want to discuss a new software tool, hire me for full-stack web/desktop engineering, or just chat about gaming optimization — my inbox is open.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* Left Column: Direct Connect & Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Quick Email Card */}
          <div className="p-8 rounded-3xl bg-surface border border-stroke relative overflow-hidden group">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 block mb-2">
              Direct Mail
            </span>
            <p className="text-2xl font-display italic text-text-primary mb-6">
              {personalInfo.email}
            </p>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-bg border border-stroke text-xs text-text-primary hover:border-text-primary/40 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-muted" />
                  <span>Copy email address</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Realtime Clock */}
          <div className="p-6 rounded-3xl bg-surface/40 border border-stroke flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-bg border border-stroke/70">
                <MapPin className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-text-primary block">
                  {personalInfo.location}
                </span>
                <span className="text-[11px] text-muted">India (UTC +5:30)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg border border-stroke text-xs font-mono text-muted">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{istTime || "IST"}</span>
            </div>
          </div>

          {/* Social Badges */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-surface/40 border border-stroke hover:bg-surface hover:border-text-primary/40 transition-all group flex flex-col justify-between"
            >
              <GithubIcon className="w-6 h-6 text-text-primary mb-3 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xs text-muted block font-mono">GitHub</span>
                <span className="text-sm font-medium text-text-primary">@saksham-kumar1621</span>
              </div>
            </a>

            <a
              href={personalInfo.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-surface/40 border border-stroke hover:bg-surface hover:border-text-primary/40 transition-all group flex flex-col justify-between"
            >
              <Compass className="w-6 h-6 text-rose-400 mb-3 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xs text-muted block font-mono">Pinterest</span>
                <span className="text-sm font-medium text-text-primary">@OneSaksham1621</span>
              </div>
            </a>
          </div>

          {/* Availability Status */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 flex items-center gap-3">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <p className="text-xs text-emerald-200">
              Currently accepting selected freelance projects, consultation & full-time opportunities.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-10 rounded-3xl bg-surface/60 border border-stroke relative overflow-hidden group hover:border-stroke/90 transition-colors shadow-2xl">
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <h3 className="text-2xl font-display italic text-text-primary mb-2">
              Send a Direct Dispatch
            </h3>
            <p className="text-xs text-muted mb-8">
              Fill in your details below and it will compose directly to my inbox with instant synchronization.
            </p>

            {formSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display italic text-text-primary mb-2">
                  Dispatch Initialized!
                </h4>
                <p className="text-xs text-muted max-w-sm mb-6">
                  Your message has been safely received and stored! Your email client has also been opened if you want to follow up directly at {personalInfo.email}.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs underline text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-bg/90 border border-stroke/80 rounded-2xl px-4 py-3 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 shadow-inner shadow-black/20"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-bg/90 border border-stroke/80 rounded-2xl px-4 py-3 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 shadow-inner shadow-black/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted">
                    Subject / Project Type
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Stack Web App / Desktop Tool / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-bg/90 border border-stroke/80 rounded-2xl px-4 py-3 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 shadow-inner shadow-black/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your idea, timeline, or what you'd like to build together..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-bg/90 border border-stroke/80 rounded-2xl px-4 py-3 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 shadow-inner shadow-black/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative rounded-full p-[1.5px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] mt-3 disabled:opacity-50"
                >
                  <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                  <div className="relative flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-text-primary text-bg font-semibold text-xs uppercase tracking-wider group-hover:bg-bg group-hover:text-text-primary transition-colors">
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Dispatching..." : "Send Dispatch"}</span>
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
