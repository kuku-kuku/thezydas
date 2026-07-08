"use client";

import { motion } from "framer-motion";
import { Crown, Medal } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import CountUpNumber from "@/components/ui/CountUpNumber";
import type { LeaderboardUser } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";

interface PodiumCardProps {
  user: LeaderboardUser;
  place: 1 | 2 | 3;
}

const PLACE_CONFIG = {
  1: {
    order: "order-1 sm:order-2",
    delay: 0.6,
    height: "pb-10 pt-14 sm:pt-16",
    avatarSize: 96,
    ring: "gold" as const,
    label: "1st",
    labelColor: "gradient-text-gold",
    border: "border-2 border-[var(--color-gold)]/50",
    glow: "shadow-[0_0_60px_rgba(255,215,0,0.25)]",
    amountColor: "text-[var(--color-gold)]",
    icon: Crown,
    iconColor: "text-[var(--color-gold)]",
    scale: "sm:scale-105",
  },
  2: {
    order: "order-2 sm:order-1",
    delay: 0.3,
    height: "pb-8 pt-10",
    avatarSize: 76,
    ring: "silver" as const,
    label: "2nd",
    labelColor: "text-[var(--color-silver)]",
    border: "border border-[var(--color-silver)]/40",
    glow: "shadow-[0_0_36px_rgba(201,211,214,0.15)]",
    amountColor: "text-[var(--color-silver)]",
    icon: Medal,
    iconColor: "text-[var(--color-silver)]",
    scale: "",
  },
  3: {
    order: "order-3 sm:order-3",
    delay: 0,
    height: "pb-6 pt-10",
    avatarSize: 68,
    ring: "bronze" as const,
    label: "3rd",
    labelColor: "text-[var(--color-bronze)]",
    border: "border border-[var(--color-bronze)]/40",
    glow: "shadow-[0_0_30px_rgba(205,127,50,0.15)]",
    amountColor: "text-[var(--color-bronze)]",
    icon: Medal,
    iconColor: "text-[var(--color-bronze)]",
    scale: "",
  },
} as const;

export default function PodiumCard({ user, place }: PodiumCardProps) {
  const config = PLACE_CONFIG[place];
  const Icon = config.icon;
  const skipInitial = useSkipInitialAnimation();

  return (
    <motion.div
      initial={skipInitial ? false : { y: 160, scale: 0.85 }}
      animate={{ y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
        delay: config.delay,
      }}
      className={cn("relative flex flex-1 flex-col items-center", config.order, config.scale)}
    >
      {place === 1 ? (
        <motion.div
          initial={skipInitial ? false : { y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: config.delay + 0.5, duration: 0.4 }}
        >
          <Crown
            className="mb-2 h-8 w-8 text-[var(--color-gold)] drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]"
            fill="currentColor"
          />
        </motion.div>
      ) : null}

      <div className="relative">
        {place === 1 ? (
          <div className="pointer-events-none absolute -inset-6 -z-10 animate-pulse-slow rounded-full bg-[var(--color-gold)]/15 blur-2xl" />
        ) : null}
        <Avatar
          seed={user.avatar}
          username={user.username}
          size={config.avatarSize}
          ring={config.ring}
        />
      </div>

      <span className="mt-3 max-w-[9rem] truncate font-display text-sm font-bold text-white sm:max-w-[10rem] sm:text-base">
        {user.username}
      </span>

      <div className="mt-1 flex items-center gap-1.5">
        {place !== 1 ? <Icon className={cn("h-3.5 w-3.5", config.iconColor)} /> : null}
        <span className={cn("font-mono text-xs font-bold uppercase tracking-widest", config.labelColor)}>
          {config.label} Place
        </span>
      </div>

      <div
        className={cn(
          "relative mt-4 w-full overflow-hidden rounded-t-2xl glass",
          config.border,
          config.glow,
          config.height
        )}
      >
        {place === 1 ? (
          <div className="shimmer-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gold)]/15 to-transparent" />
        ) : null}
        <div className="relative flex flex-col items-center gap-1 px-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-mist-dim)]">
            Wagered
          </span>
          <CountUpNumber
            value={user.wagered}
            prefix="$"
            duration={2.2}
            className={cn("font-mono text-xl font-bold sm:text-2xl", config.amountColor)}
          />
          <div className="mt-2 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-mist-dim)]">
              Prize
            </span>
            <span className="font-mono text-xs font-bold text-white">
              {formatCurrency(user.prize)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
