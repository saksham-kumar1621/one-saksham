import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Gauge } from "lucide-react";

interface TrustMetric {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  tag: string;
}

const trustMetrics: TrustMetric[] = [
  {
    value: "< 48h",
    label: "Rapid Delivery & Turnaround",
    description:
      "From wireframe or idea to an interactive, deployable prototype on Vercel in days. Fast iterations with daily transparent progress.",
    icon: Zap,
    tag: "Execution Speed",
  },
  {
    value: "100%",
    label: "Code & IP Ownership",
    description:
      "Full intellectual property handover. Clean, scalable TypeScript pushed straight to your private GitHub with zero vendor lock-in.",
    icon: ShieldCheck,
    tag: "Transparency",
  },
  {
    value: "< 1s",
    label: "Sub-Second Performance & SEO",
    description:
      "Engineered for 95+ Google Lighthouse scores, fluid 60 FPS animations, and instant responsive load times on every mobile & desktop screen.",
    icon: Gauge,
    tag: "Core Web Vitals",
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke/40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium font-mono">
                Work Standards & Value
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Engineered for{" "}
              <span className="font-display italic text-text-primary font-normal">
                trust
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted max-w-md leading-relaxed">
            No agency bloat or fake metrics. Direct 1-on-1 collaboration, production-grade code, and measurable performance for every client product.
          </p>
        </motion.div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trustMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative flex flex-col p-8 rounded-3xl bg-surface/40 border border-stroke group hover:border-stroke/80 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Subtle top accent gradient line on hover */}
                <div className="absolute top-0 left-8 right-8 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Top: Tag + Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-stroke text-muted group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
                    {item.tag}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-stroke flex items-center justify-center text-muted group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Big Metric Display */}
                <div className="text-5xl md:text-6xl font-display text-text-primary tracking-tight mb-3">
                  {item.value}
                </div>

                {/* Title */}
                <h3 className="text-base font-medium text-text-primary mb-2">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
