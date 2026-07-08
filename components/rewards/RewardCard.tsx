"use client";

import { Gift, Coins, Sparkles, Percent } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";
import type { Reward } from "@/types";

const ICONS = { gift: Gift, coins: Coins, sparkles: Sparkles, percent: Percent };

export default function RewardCard({ reward, index }: { reward: Reward; index: number }) {
  const Icon = ICONS[reward.icon];
  const skipInitial = useSkipInitialAnimation(`RewardCard:${index}`);

  return (
    <GlassCard
      initial={skipInitial ? false : { y: 30 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="flex flex-col gap-4 p-7"
    >
      <div className="flex items-center justify-between">
        <span className="glass flex h-12 w-12 items-center justify-center rounded-xl text-[var(--color-neon)]">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-[var(--color-neon)]/10 px-3 py-1 font-mono text-xs font-bold text-[var(--color-neon)]">
          {reward.amount}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold text-white">{reward.title}</h3>
      <p className="text-sm leading-relaxed text-[var(--color-mist-dim)]">{reward.description}</p>
    </GlassCard>
  );
}
