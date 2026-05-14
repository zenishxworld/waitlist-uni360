"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function WaitlistCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      toast.success("You're in! 🎉");
    } catch {
      setStatus("idle");
      toast.error("Something went wrong, please retry.");
    }
  };

  return (
    <div className="glass-card p-8 w-full max-w-md relative overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(108,99,255,0.15), transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 space-y-5"
          >
            <div className="text-center mb-6">
              <h2
                className="text-xl font-semibold mb-1"
                style={{ color: "var(--text)" }}
              >
                Join the Waitlist
              </h2>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Be the first to experience UNI360°
              </p>
            </div>

            {/* Name */}
            <motion.div
              className="input-glow rounded-xl transition-all duration-300"
              whileFocus={{ scale: 1.01 }}
            >
              <input
                id="waitlist-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-4 py-3.5 rounded-xl bg-transparent text-white placeholder:text-white/30 outline-none transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-secondary), sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(108,99,255,0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              className="input-glow rounded-xl transition-all duration-300"
              whileFocus={{ scale: 1.01 }}
            >
              <input
                id="waitlist-email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-4 py-3.5 rounded-xl bg-transparent text-white placeholder:text-white/30 outline-none transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-secondary), sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(108,99,255,0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              id="waitlist-submit"
              type="submit"
              disabled={status === "loading"}
              className="btn-gradient w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ border: "none" }}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      className="opacity-75"
                    />
                  </svg>
                  Joining...
                </span>
              ) : (
                "Get Early Access"
              )}
            </motion.button>

            <p
              className="text-center text-xs mt-3"
              style={{ color: "var(--muted)" }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative z-10 flex flex-col items-center py-6 space-y-4"
          >
            {/* Check circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.1,
              }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(167,139,250,0.2))",
                border: "1px solid rgba(108,99,255,0.3)",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              You&apos;re on the list!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-center max-w-[260px]"
              style={{ color: "var(--muted)" }}
            >
              We&apos;ll reach out soon with exclusive early access details.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
