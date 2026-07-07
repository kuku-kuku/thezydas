"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  target: Date;
  className?: string;
}

interface TimeParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function getTimeParts(target: Date): TimeParts {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function DigitGroup({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="glass flex overflow-hidden rounded-lg sm:rounded-xl">
        {value.split("").map((digit, i) => (
          <div
            key={i}
            className="relative flex h-10 w-7 items-center justify-center overflow-hidden sm:h-16 sm:w-12"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={digit}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="absolute font-mono text-lg font-bold text-[var(--color-neon)] sm:text-3xl"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-mist-dim)] sm:text-[10px] sm:tracking-[0.3em]">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ target, className }: CountdownTimerProps) {
  const [parts, setParts] = useState<TimeParts | null>(null);

  useEffect(() => {
    const update = () => setParts(getTimeParts(target));
    const initialId = setTimeout(update, 0);
    const interval = setInterval(update, 1000);
    return () => {
      clearTimeout(initialId);
      clearInterval(interval);
    };
  }, [target]);

  if (!parts) {
    return (
      <div className={className}>
        <div className="glass h-16 w-full max-w-md animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-1.5 sm:gap-4">
        <DigitGroup value={parts.days} label="Days" />
        <span className="pb-4 font-mono text-sm text-[var(--color-neon)]/50 sm:pb-6 sm:text-xl">:</span>
        <DigitGroup value={parts.hours} label="Hours" />
        <span className="pb-4 font-mono text-sm text-[var(--color-neon)]/50 sm:pb-6 sm:text-xl">:</span>
        <DigitGroup value={parts.minutes} label="Minutes" />
        <span className="pb-4 font-mono text-sm text-[var(--color-neon)]/50 sm:pb-6 sm:text-xl">:</span>
        <DigitGroup value={parts.seconds} label="Seconds" />
      </div>
    </div>
  );
}
