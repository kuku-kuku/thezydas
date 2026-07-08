"use client";

import { ArrowRight, Crown } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";
import { cn, formatCurrency } from "@/lib/utils";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";
import type { LeaderboardUser } from "@/types";

interface TopThreeTeaserProps {
  users: LeaderboardUser[];
}

const RANK_STYLE: Record<number, { ring: "gold" | "silver" | "bronze"; text: string; border: string }> = {
  1: { ring: "gold", text: "text-[var(--color-gold)]", border: "border-[var(--color-gold)]/40" },
  2: { ring: "silver", text: "text-[var(--color-silver)]", border: "border-[var(--color-silver)]/30" },
  3: { ring: "bronze", text: "text-[var(--color-bronze)]", border: "border-[var(--color-bronze)]/30" },
};

export default function TopThreeTeaser({ users }: TopThreeTeaserProps) {
  const top3 = users.slice(0, 3);
  const skipInitial = useSkipInitialAnimation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Right Now"
        title="Current Top 3"
        description="A live snapshot of who's leading the pack this cycle."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {top3.map((user, i) => {
          const style = RANK_STYLE[user.rank];
          return (
            <GlassCard
              key={user.id}
              initial={skipInitial ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className={cn("relative flex flex-col items-center gap-3 border p-8 text-center", style.border)}
            >
              {user.rank === 1 ? (
                <Crown className="absolute -top-3 h-6 w-6 text-[var(--color-gold)]" fill="currentColor" />
              ) : null}
              <Avatar seed={user.avatar} username={user.username} size={64} ring={style.ring} />
              <span className="font-display text-lg font-bold text-white">{user.username}</span>
              <span className={cn("font-mono text-xs font-bold uppercase tracking-widest", style.text)}>
                Rank #{user.rank}
              </span>
              <div className="mt-2 flex w-full items-center justify-between rounded-lg bg-black/25 px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-mist-dim)]">
                  Prize
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {formatCurrency(user.prize)}
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <GlowButton href="/leaderboard" variant="outline">
          <span className="flex items-center gap-2">
            View Full Leaderboard <ArrowRight className="h-4 w-4" />
          </span>
        </GlowButton>
      </div>
    </section>
  );
}
