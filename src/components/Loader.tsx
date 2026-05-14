"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "breathe" | "exit">(
    "enter"
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("hold"), 600),
      setTimeout(() => setPhase("breathe"), 1000),
      setTimeout(() => setPhase("exit"), 1600),
      setTimeout(() => onComplete(), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const logoVariants = {
    enter: {
      opacity: 0,
      scale: 0.82,
      filter: "blur(16px)",
    },
    hold: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    breathe: {
      opacity: 1,
      scale: [1, 1.04, 1],
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
    exit: {
      opacity: 0,
      scale: 1.08,
      filter: "blur(8px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#04050d" }}
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, delay: 0 }}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
        }}
        animate={
          phase === "hold" || phase === "breathe"
            ? {
                boxShadow: [
                  "0 0 30px 8px rgba(108,99,255,0.0)",
                  "0 0 60px 20px rgba(108,99,255,0.25)",
                  "0 0 30px 8px rgba(108,99,255,0.0)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        initial="enter"
        animate={phase}
        variants={logoVariants}
        className="relative z-10"
      >
        <Image
          src="/logo.png"
          alt="UNI360°"
          width={160}
          height={160}
          loading="eager"
          style={{
            filter: "invert(1) brightness(1.1)",
            objectFit: "contain",
            width: "auto",
            height: "auto",
          }}
          unoptimized
        />
      </motion.div>
    </motion.div>
  );
}
