"use client";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb 1 — Top-left, Tiger's Eye */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          left: "-8%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "#e08d3c", /* Tiger's Eye */
          opacity: 0.12,
          filter: "blur(120px)",
          animation: "blob-float-1 9s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — Bottom-right, Light Blue */}
      <div
        className="absolute"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "#c4dff0", /* Light Blue */
          opacity: 0.08,
          filter: "blur(120px)",
          animation: "blob-float-2 11s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />

      {/* Orb 3 — Center-top, Warm White */}
      <div
        className="absolute"
        style={{
          top: "5%",
          right: "20%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#f0dfcf", /* Soft warm white */
          opacity: 0.06,
          filter: "blur(120px)",
          animation: "blob-float-3 13s ease-in-out infinite",
          animationDelay: "5s",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 dot-grid-overlay"
        style={{ opacity: 0.4 }}
      />
    </div>
  );
}
