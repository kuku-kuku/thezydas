"use client";

import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { cn } from "@/lib/utils";
import type { LeaderboardUser } from "@/types";

interface PrizeBreakdownProps {
  users: LeaderboardUser[];
}

const TIERS = [
  { ranks: "1st Place", icon: Crown, color: "text-[var(--color-gold)]", border: "border-[var(--color-gold)]/40" },
  { ranks: "2nd Place", icon: Medal, color: "text-[var(--color-silver)]", border: "border-[var(--color-silver)]/30" },
  { ranks: "3rd Place", icon: Medal, color: "text-[var(--color-bronze)]", border: "border-[var(--color-bronze)]/30" },
  { ranks: "4th – 15th", icon: Trophy, color: "text-[var(--color-neon)]", border: "border-[var(--color-neon)]/30" },
];

export default function PrizeBreakdown({ users }: PrizeBreakdownProps) {
  const top3 = users.slice(0, 3);
  const rest = users.slice(3);
  const restTotal = rest.reduce((sum, u) => sum + u.prize, 0);
  const values = [top3[0]?.prize ?? 0, top3[1]?.prize ?? 0, top3[2]?.prize ?? 0, restTotal];

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Prize Pool"
        title="Where The Money Goes"
        description="Every rank on the board gets paid — here's the full breakdown."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier, i) => (
          <GlassCard
            key={tier.ranks}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn("flex flex-col items-center gap-3 border p-7 text-center", tier.border)}
          >
            <tier.icon className={cn("h-7 w-7", tier.color)} />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-mist-dim)]">
              {tier.ranks}
            </span>
            <CountUpNumber
              value={values[i]}
              prefix="$"
              className={cn("font-mono text-2xl font-bold", tier.color)}
            />
          </GlassCard>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 text-center font-mono text-xs uppercase tracking-widest text-[var(--color-mist-faint)]"
      >
        Prizes reset and pay out monthly · Distributed within 48 hours
      </motion.p>
    </section>
  );
}
