"use client";

import { motion } from "framer-motion";
import Avatar from "@/components/ui/Avatar";
import CountUpNumber from "@/components/ui/CountUpNumber";
import type { LeaderboardUser } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";

interface LeaderboardRowProps {
  user: LeaderboardUser;
  index: number;
}

export default function LeaderboardRow({ user, index }: LeaderboardRowProps) {
  return (
    <motion.div
      layout
      layoutId={user.id}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={cn(
        "grid grid-cols-[3rem_1fr_auto_auto] items-center gap-3 rounded-xl px-4 py-3 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(45,224,224,0.15)] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:gap-4 sm:px-5",
        index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent",
        "border border-transparent hover:border-[var(--color-neon)]/20"
      )}
    >
      <span className="font-mono text-sm font-bold text-[var(--color-mist-dim)] sm:text-base">
        #{user.rank}
      </span>

      <div className="flex min-w-0 items-center gap-3">
        <Avatar seed={user.avatar} username={user.username} size={36} ring="neon" />
        <span className="truncate font-display text-sm font-semibold text-white sm:text-base">
          {user.username}
        </span>
      </div>

      <CountUpNumber
        value={user.wagered}
        prefix="$"
        duration={1.4}
        className="hidden font-mono text-sm font-semibold text-[var(--color-mist)] sm:block sm:text-base"
      />

      <span className="font-mono text-sm font-bold text-[var(--color-neon)] sm:text-base">
        {formatCurrency(user.prize)}
      </span>
    </motion.div>
  );
}
