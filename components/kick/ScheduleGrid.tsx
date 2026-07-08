"use client";

import { Calendar } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";
import type { ScheduleItem } from "@/types";

export default function ScheduleGrid({ schedule }: { schedule: ScheduleItem[] }) {
  const skipInitial = useSkipInitialAnimation("ScheduleGrid");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {schedule.map((item, i) => {
        const isOff = item.time === "Off";
        return (
          <GlassCard
            key={item.day}
            initial={skipInitial ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={cn(
              "flex flex-col gap-2 p-5",
              isOff ? "opacity-50" : ""
            )}
          >
            <div className="flex items-center gap-2 text-[var(--color-neon)]">
              <Calendar className="h-4 w-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                {item.day}
              </span>
            </div>
            <span className="font-display text-base font-bold text-white">{item.title}</span>
            <span className="font-mono text-xs text-[var(--color-mist-dim)]">{item.time}</span>
          </GlassCard>
        );
      })}
    </div>
  );
}
