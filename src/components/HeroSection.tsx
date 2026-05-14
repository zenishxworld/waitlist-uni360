"use client";

import { motion } from "framer-motion";
import WaitlistCard from "./WaitlistCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const features = [
  "Germany & UK",
  "100+ Partner Institutions",
  "200+ Programs",
  "Chancenkarte",
];

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* ───────── Left Column ───────── */}
        <motion.div
          className="flex-[1.2] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide"
            style={{
              background: "rgba(224, 141, 60, 0.1)",
              border: "1px solid rgba(224, 141, 60, 0.2)",
              color: "var(--accent)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{
                background: "#e08d3c",
                animation: "dot-pulse 2s ease-in-out infinite",
              }}
            />
            Now Accepting Applications 2025 · 2026
          </motion.div>

          {/* Headline */}
          <div>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.1] tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Study Abroad
            </motion.h1>
            <motion.h1
              custom={2}
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.1] tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #e08d3c 0%, #c4dff0 50%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              360° Journey.
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-base md:text-lg max-w-sm"
            style={{ color: "var(--muted)", lineHeight: 1.7 }}
          >
            Discover world-class universities and find the perfect match for your academic goals. Full support from application to relocation.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex flex-wrap gap-2.5 justify-center lg:justify-start"
          >
            {features.map((f, i) => (
              <motion.span
                key={f}
                className="feature-pill"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.48 + i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                {f}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ───────── Right Column ───────── */}
        <motion.div
          className="flex-1 w-full max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          <WaitlistCard />
        </motion.div>
      </div>
    </section>
  );
}
