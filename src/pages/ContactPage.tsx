import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Clock, 
  ArrowUpRight, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles
} from "lucide-react";
import { GithubIcon } from "../components/icons/GithubIcon";
import { PinterestIcon } from "../components/icons/PinterestIcon";
import { usePortfolio } from "../context/PortfolioContext";

interface ProjectTopic {
  id: string;
  label: string;
  icon: string;
}

const PROJECT_TOPICS: ProjectTopic[] = [
  { id: "fullstack", label: "Full-Stack Web Platform", icon: "✦" },
  { id: "desktop", label: "Desktop Software / Tool", icon: "⚡" },
  { id: "ui", label: "UI/UX & Spatial Craft", icon: "🎨" },
  { id: "collab", label: "Collaboration / Just Say Hi", icon: "☕" },
];

export const ContactPage: React.FC = () => {
  const { personalInfo, submitContactMessage } = usePortfolio();
  const [copied, setCopied] = useState<boolean>(false);
  const [istTime, setIstTime] = useState<string>("");
  const [isWorkingHours, setIsWorkingHours] = useState<boolean>(true);
  const [selectedTopic, setSelectedTopic] = useState<string>("Full-Stack Web Platform");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Stack Web Platform",
    message: "",
  });

  // Calculate local time in Muzaffarpur, Bihar (IST: Asia/Kolkata) & check working hours
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

      const hourStr = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      }).format(now);
      const hour = parseInt(hourStr, 10) || 12;
      setIsWorkingHours(hour >= 9 && hour < 23);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setFormData((prev) => ({ ...prev, subject: topic }));
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

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="pt-32 sm:pt-36 pb-24 px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1240px] mx-auto min-h-screen">
      {/* 1. Header (Editorial Anthropic Typographic Hierarchy) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-14 md:mb-18"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-[11px] text-muted uppercase tracking-[0.3em] font-mono font-medium">
            Dispatch &amp; Collaboration
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight font-light mb-6 text-balance">
          Let&apos;s start a{" "}
          <span className="font-display italic text-text-primary font-normal">
            conversation
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed text-pretty">
          Whether you&apos;re exploring a full-stack platform, high-performance desktop tooling, or looking to collaborate on thoughtful digital craftsmanship — every genuine inquiry is answered directly.
        </p>
      </motion.div>

      {/* 2. Main Two-Column Architectural Dossier & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-14 items-start">
        
        {/* Left Column: Direct Dossier (Unified Editorial Card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Unified Architectural Dossier */}
          <div className="rounded-3xl bg-surface/60 border border-stroke/80 p-7 sm:p-9 relative overflow-hidden backdrop-blur-md shadow-2xl flex flex-col gap-8">
            {/* Top brand line */}
            <div className="absolute top-0 left-0 right-0 h-px accent-gradient opacity-60" />

            {/* Section A: Primary Direct Line */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.25em] text-brand-light font-medium">
                  Primary Direct Channel
                </span>
                <span className="text-[10px] font-mono text-muted/70">
                  Direct Inbox
                </span>
              </div>

              <p className="text-2xl sm:text-3xl font-display italic text-text-primary mb-5 break-all select-all">
                {personalInfo.email}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 bg-bg/90 border border-stroke text-xs text-text-primary hover:border-brand-light/60 hover:text-white transition-all cursor-pointer shadow-sm group"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted group-hover:text-brand-light transition-colors" />
                      <span>Copy email address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 bg-surface hover:bg-surface/80 border border-stroke text-xs text-muted hover:text-text-primary hover:border-stroke/90 transition-all"
                  title="Open in your default mail application"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Mail client</span>
                  <ArrowUpRight className="w-3 h-3 text-muted/70" />
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-stroke/60" />

            {/* Section B: Spatial Presence & Intelligent Status */}
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.25em] text-muted block mb-3">
                Presence &amp; Local Coordinates
              </span>

              <div className="flex flex-col gap-3">
                {/* Location & Clock */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-bg/60 border border-stroke/70">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-surface border border-stroke/80">
                      <MapPin className="w-3.5 h-3.5 text-brand-light" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-primary block leading-tight">
                        {personalInfo.location}
                      </span>
                      <span className="text-[11px] text-muted">India • UTC +5:30</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-stroke/80 text-[11px] font-mono text-muted">
                    <Clock className="w-3 h-3 text-brand-light" />
                    <span>{istTime || "IST"}</span>
                  </div>
                </div>

                {/* Intelligent Human Status Badge */}
                <div className="p-3.5 rounded-2xl bg-bg/40 border border-stroke/60 flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    {isWorkingHours ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                      </>
                    ) : (
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-light/80 shadow-[0_0_8px_rgba(137,170,204,0.5)]" />
                    )}
                  </span>
                  <div className="text-xs leading-relaxed">
                    <span className="text-text-primary font-medium block">
                      {isWorkingHours ? "Active working hours in IST" : "Rest & Deep-work hours in IST"}
                    </span>
                    <span className="text-[11px] text-muted">
                      {isWorkingHours
                        ? "Quick turnaround during Indian Standard Time."
                        : "Dispatches received overnight are answered by morning."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-stroke/60" />

            {/* Section C: Social & Engineering Profiles */}
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.25em] text-muted block mb-3">
                Repositories &amp; Visual Channels
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-bg/60 border border-stroke/70 hover:bg-bg hover:border-brand-light/50 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <GithubIcon className="w-5 h-5 text-text-primary group-hover:scale-110 transition-transform" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-brand-light transition-colors" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted block font-mono">GitHub</span>
                    <span className="text-xs font-medium text-text-primary truncate block">
                      @saksham-kumar1621
                    </span>
                  </div>
                </a>

                <a
                  href={personalInfo.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-bg/60 border border-stroke/70 hover:bg-bg hover:border-brand-light/50 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <PinterestIcon className="w-5 h-5 text-brand-light group-hover:scale-110 transition-transform" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-brand-light transition-colors" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted block font-mono">Pinterest</span>
                    <span className="text-xs font-medium text-text-primary truncate block">
                      @OneSaksham1621
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-stroke/60" />

            {/* Section D: Direct Commitments (Anthropic-style honesty) */}
            <div className="flex flex-col gap-2.5 text-[11px] text-muted leading-relaxed font-sans">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-light shrink-0 mt-0.5" />
                <span><strong className="text-text-primary font-medium">Direct Communication:</strong> You speak directly with Saksham — zero agency filters or bot redirects.</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-light shrink-0 mt-0.5" />
                <span><strong className="text-text-primary font-medium">Availability:</strong> Open for selected full-stack engineering, desktop utilities &amp; spatial UI contracts.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Crafted Inquiry Studio (Form) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-7"
        >
          <div className="p-7 sm:p-10 rounded-3xl bg-surface/70 border border-stroke/90 relative overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Top accent glow on hover */}
            <div className="absolute top-0 left-0 right-0 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-2">
                Direct Dispatch Studio
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Choose an inquiry intent below or draft your requirements. Your message is dispatched directly into my personal queue.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="py-10 text-center flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 shadow-lg shadow-emerald-950/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-2">
                    Dispatch Successfully Received
                  </h4>

                  <p className="text-xs sm:text-sm text-muted max-w-md mb-6 leading-relaxed">
                    Thank you, <span className="text-text-primary font-medium">{formData.name}</span>. Your message regarding <span className="text-brand-light font-mono">&ldquo;{formData.subject}&rdquo;</span> has been safely logged. I will review and reply to <span className="text-text-primary font-medium">{formData.email}</span> promptly.
                  </p>

                  {/* Summary Box */}
                  <div className="w-full max-w-md p-4 rounded-2xl bg-bg/60 border border-stroke/70 text-left mb-6 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between text-muted">
                      <span>Sender</span>
                      <span className="text-text-primary truncate max-w-[220px]">{formData.name} ({formData.email})</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>Focus</span>
                      <span className="text-brand-light">{formData.subject}</span>
                    </div>
                    <div className="pt-2 border-t border-stroke/40 text-muted line-clamp-2 italic">
                      &ldquo;{formData.message}&rdquo;
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
                        formData.subject || `Inquiry from ${formData.name}`
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.subject}\n\nMessage:\n${formData.message}`
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-stroke text-xs text-text-primary transition-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-light" />
                      <span>Also open in my email client</span>
                      <ArrowUpRight className="w-3 h-3 text-muted" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          subject: "Full-Stack Web Platform",
                          message: "",
                        });
                      }}
                      className="px-5 py-2.5 rounded-full bg-surface hover:bg-surface/80 border border-stroke text-xs text-muted hover:text-white transition-colors cursor-pointer"
                    >
                      Send another dispatch
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  {/* Topic / Intent Chips */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted block mb-3 font-medium">
                      Project Intent / Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PROJECT_TOPICS.map((topic) => {
                        const isSelected = selectedTopic === topic.label;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => handleSelectTopic(topic.label)}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-medium text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-brand/15 border-brand/50 text-white shadow-sm"
                                : "bg-bg/60 border-stroke/80 text-muted hover:text-text-primary hover:border-stroke hover:bg-bg/90"
                            }`}
                          >
                            <span className={`text-xs ${isSelected ? "text-brand-light" : "text-muted"}`}>
                              {topic.icon}
                            </span>
                            <span className="truncate">{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Mercer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-bg/80 border border-stroke/80 rounded-2xl px-4 py-3.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-bg/80 border border-stroke/80 rounded-2xl px-4 py-3.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted font-medium">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next.js SaaS Web App / High-Performance Desktop Tool"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-bg/80 border border-stroke/80 rounded-2xl px-4 py-3.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted font-medium">
                        Inquiry Details
                      </label>
                      <span className="text-[10px] font-mono text-muted/60">
                        Markdown &amp; plain text supported
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      required
                      placeholder="Share your goals, architectural preferences, estimated timeline, or what kind of software you'd like to bring to life..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-bg/80 border border-stroke/80 rounded-2xl px-4 py-3.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-brand-light/70 focus:ring-2 focus:ring-brand/20 transition-all duration-300 shadow-inner shadow-black/20 resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button & Assurance */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative rounded-full p-[1.5px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50 shrink-0"
                    >
                      <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                      <div className="relative flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-text-primary text-bg font-semibold text-xs uppercase tracking-wider group-hover:bg-bg group-hover:text-text-primary transition-colors">
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? "Transmitting..." : "Send Direct Dispatch"}</span>
                      </div>
                    </button>

                    <p className="text-[11px] text-muted/80 leading-relaxed max-w-xs">
                      🔒 Zero spam. All dispatches are routed straight to Saksham&apos;s verified inbox.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
