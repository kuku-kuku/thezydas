"use client";

import { Coins, Trophy, Users } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import type { SiteStats } from "@/types";

export default function StatsSection({ stats }: { stats: SiteStats }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          label="Total Wagered"
          value={stats.totalWagered}
          prefix="$"
          icon={<Coins className="h-6 w-6" />}
          index={0}
        />
        <StatCard
          label="Prize Pool"
          value={stats.prizePool}
          prefix="$"
          icon={<Trophy className="h-6 w-6" />}
          index={1}
        />
        <StatCard
          label="Active Players"
          value={stats.players}
          icon={<Users className="h-6 w-6" />}
          index={2}
        />
      </div>
    </section>
  );
}
