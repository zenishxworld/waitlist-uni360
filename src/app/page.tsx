"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <motion.div
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative min-h-screen"
      >
        <BackgroundOrbs />
        <HeroSection />
      </motion.div>
    </>
  );
}
