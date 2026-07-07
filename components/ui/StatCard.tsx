"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import CountUpNumber from "./CountUpNumber";
import GlassCard from "./GlassCard";

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: ReactNode;
  index?: number;
}

export default function StatCard({
  label,
  value,
  prefix,
  suffix,
  icon,
  index = 0,
}: StatCardProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2 px-6 py-8 text-center sm:items-start sm:text-left"
    >
      {icon ? (
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0] }}
          className="mb-1 text-[var(--color-neon)]"
        >
          {icon}
        </motion.div>
      ) : null}
      <CountUpNumber
        value={value}
        prefix={prefix}
        suffix={suffix}
        className="font-mono text-3xl font-bold text-white sm:text-4xl"
      />
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-mist-dim)]">
        {label}
      </span>
    </GlassCard>
  );
}
