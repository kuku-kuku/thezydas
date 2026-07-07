"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { cn, formatDate, formatDuration } from "@/lib/utils";
import type { Vod } from "@/types";

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface VodCardProps {
  vod: Vod;
  index: number;
}

export default function VodCard({ vod, index }: VodCardProps) {
  const hue = hashSeed(vod.thumbnail) % 360;

  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      exit={{ opacity: 0, y: -10 }}
    >
      <a href={vod.url} target="_blank" rel="noopener noreferrer" className="group block">
        <GlassCard hover={false} className="overflow-hidden p-0">
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{
              background: `linear-gradient(135deg, hsl(${hue} 60% 12%), hsl(${(hue + 40) % 360} 70% 8%))`,
            }}
          >
            <div
              className="absolute inset-0 opacity-30 mix-blend-screen transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(0,255,136,0.15) 0px, rgba(0,255,136,0.15) 2px, transparent 2px, transparent 10px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="glass flex h-14 w-14 items-center justify-center rounded-full text-[var(--color-neon)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
              </motion.div>
            </div>
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 font-mono text-[11px] font-semibold text-white">
              {formatDuration(vod.durationSeconds)}
            </span>
            <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-neon)]">
              {vod.category}
            </span>
          </div>
          <div
            className={cn(
              "flex flex-col gap-1 p-4 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(0,255,136,0.12)]"
            )}
          >
            <h3 className="line-clamp-2 font-display text-sm font-bold text-white sm:text-base">
              {vod.title}
            </h3>
            <span className="font-mono text-xs text-[var(--color-mist-dim)]">
              {formatDate(vod.date)}
            </span>
          </div>
        </GlassCard>
      </a>
    </motion.div>
  );
}
