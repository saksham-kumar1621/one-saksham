import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: "20+",
    label: "Years Experience",
    description: "Honoring craft across digital architecture, frontend performance, and visual direction.",
  },
  {
    value: "95+",
    label: "Projects Done",
    description: "From early seed-stage experiments to enterprise-grade web experiences shipped worldwide.",
  },
  {
    value: "200%",
    label: "Satisfied Clients",
    description: "Exceeding expectations through continuous iteration, clear communication, and high fidelity.",
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke/40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative flex flex-col p-8 rounded-3xl bg-surface/40 border border-stroke group hover:border-stroke/80 transition-colors"
            >
              {/* Subtle top accent gradient line on hover */}
              <div className="absolute top-0 left-8 right-8 h-px accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary tracking-tight mb-4">
                {stat.value}
              </div>

              <h3 className="text-base md:text-lg font-medium text-text-primary mb-2">
                {stat.label}
              </h3>

              <p className="text-xs md:text-sm text-muted leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

