"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 50);
      }
    });

    // 1. Initial State
    gsap.set(logoRef.current, { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.95 });
    gsap.set(trackRef.current, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(percentageRef.current, { opacity: 0, y: 15 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

    // 2. Reveal Progress Bar Track & Counter
    tl.to(percentageRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(trackRef.current, {
      scaleX: 1,
      duration: 1,
      ease: "power4.inOut"
    }, "<")
    
    // 3. Animate Counter 0 -> 100 and Progress Bar filling
    .to({ val: 0 }, {
      val: 100,
      duration: 2.4,
      ease: "expo.inOut",
      onUpdate: function() {
        const currentVal = this.targets()[0].val;
        setProgress(Math.round(currentVal));
        if (progressRef.current) {
          gsap.set(progressRef.current, { 
            scaleX: currentVal / 100
          });
        }
      }
    }, "-=0.2")

    // 4. Reveal Logo just as it hits 100%
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "expo.out"
    }, "-=0.6")

    // 5. Exit Animation
    .to([trackRef.current, percentageRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.in"
    }, "+=0.6")
    .to(logoRef.current, {
      scale: 1.15,
      opacity: 0,
      filter: "blur(16px)",
      duration: 1.2,
      ease: "power4.inOut"
    }, "<")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.8");

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "#1e2428" }}
    >
      {/* Logo Container */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center justify-center h-full">
        <Image
          src="/logo.png"
          alt="UNI360°"
          width={220}
          height={220}
          loading="eager"
          style={{
            filter: "invert(1) brightness(1.2)",
            objectFit: "contain",
            width: "auto",
            height: "auto",
            position: "relative",
            zIndex: 2
          }}
          unoptimized
        />
        {/* Glow behind logo */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] opacity-30 pointer-events-none" 
          style={{ 
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, #e08d3c 0%, transparent 70%)"
          }} 
        />
      </div>

      {/* Bottom Track & Progress */}
      <div className="absolute bottom-20 flex flex-col items-center gap-6 w-full px-8">
        <div className="relative w-full max-w-[240px] h-[2px] overflow-hidden rounded-full">
          {/* Base Track */}
          <div ref={trackRef} className="absolute inset-0 w-full h-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          {/* Fill Progress */}
          <div ref={progressRef} className="absolute inset-0 w-full h-full" style={{ background: "linear-gradient(90deg, #e08d3c, #c4dff0)" }} />
        </div>

        {/* Percentage Counter */}
        <div ref={percentageRef} className="font-primary text-[10px] font-semibold tracking-[0.3em] text-white/50 uppercase">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
