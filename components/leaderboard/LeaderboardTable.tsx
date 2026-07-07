"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import type { LeaderboardUser } from "@/types";
import LeaderboardRow from "./LeaderboardRow";

interface LeaderboardTableProps {
  users: LeaderboardUser[];
}

export default function LeaderboardTable({ users }: LeaderboardTableProps) {
  return (
    <GlassCard hover={false} className="overflow-hidden p-2 sm:p-3">
      <div className="grid grid-cols-[3rem_1fr_auto_auto] gap-3 px-4 pb-2 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-mist-faint)] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:gap-4 sm:px-5">
        <span>Rank</span>
        <span>Player</span>
        <span className="hidden sm:block">Wagered</span>
        <span>Prize</span>
      </div>
      <LayoutGroup>
        <div className="flex flex-col gap-1">
          <AnimatePresence initial={false}>
            {users.map((user, index) => (
              <LeaderboardRow key={user.id} user={user} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </GlassCard>
  );
}
