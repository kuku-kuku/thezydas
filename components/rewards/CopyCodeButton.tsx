"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op fallback, button remains clickable
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "glass-strong relative flex w-full max-w-md items-center justify-between gap-4 overflow-hidden rounded-2xl border-2 px-6 py-5 transition-colors duration-300 sm:px-8 sm:py-6",
        copied ? "border-[var(--color-neon)]" : "border-[var(--color-neon)]/30"
      )}
    >
      <div className="flex flex-col items-start text-left">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-mist-dim)]">
          Affiliate Code
        </span>
        <span className="font-display text-2xl font-black tracking-widest text-white sm:text-3xl">
          {code}
        </span>
      </div>

      <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--color-neon)]">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Check className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Copy className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <AnimatePresence>
        {copied ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.25),transparent_70%)]"
          />
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
