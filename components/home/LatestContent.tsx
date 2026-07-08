"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clapperboard, Play, User, Video } from "lucide-react";
import type { ReactNode } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { cn, formatCompactNumber, formatDate, formatDuration } from "@/lib/utils";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";
import type { SiteStats, Vod } from "@/types";

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function ColumnHeader({
  icon,
  title,
  href,
}: {
  icon: ReactNode;
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[var(--color-neon)]">
        {icon}
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-white">
          {title}
        </span>
      </div>
      {href ? (
        <Link
          href={href}
          prefetch={false}
          className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-mist-dim)] transition-colors hover:text-[var(--color-neon)]"
        >
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      ) : null}
    </div>
  );
}

function LatestVideoCard({ vod }: { vod: Vod }) {
  const hue = hashSeed(vod.thumbnail) % 360;

  return (
    <a href={vod.url} target="_blank" rel="noopener noreferrer" className="group block">
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl"
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 60% 12%), hsl(${(hue + 40) % 360} 70% 8%))`,
        }}
      >
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
      </div>
      <h3 className="mt-3 line-clamp-2 font-display text-sm font-bold text-white sm:text-base">
        {vod.title}
      </h3>
      <span className="mt-1 block font-mono text-xs text-[var(--color-mist-dim)]">
        {formatCompactNumber(vod.views)} views &middot; {formatDate(vod.date)}
      </span>
    </a>
  );
}

function ClipRow({ vod }: { vod: Vod }) {
  const hue = hashSeed(vod.thumbnail) % 360;

  return (
    <a
      href={vod.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3"
    >
      <div
        className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg"
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 60% 12%), hsl(${(hue + 40) % 360} 70% 8%))`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-neon)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Play className="h-4 w-4" fill="currentColor" />
        </div>
        <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 font-mono text-[9px] font-semibold text-white">
          {formatDuration(vod.durationSeconds)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-1 font-display text-sm font-bold text-white transition-colors group-hover:text-[var(--color-neon)]">
          {vod.title}
        </h4>
        <span className="font-mono text-xs text-[var(--color-mist-dim)]">
          {formatCompactNumber(vod.views)} views
        </span>
      </div>
    </a>
  );
}

interface LatestContentProps {
  vods: Vod[];
  stats: SiteStats;
}

export default function LatestContent({ vods, stats }: LatestContentProps) {
  const [latestVideo, ...rest] = vods;
  const clips = rest.slice(0, 3);
  const skipInitial = useSkipInitialAnimation("LatestContent");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassCard
          initial={skipInitial ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          hover={false}
          className="flex flex-col gap-4 p-5 sm:p-6"
        >
          <ColumnHeader icon={<Video className="h-4 w-4" />} title="Latest Video" href="/vods" />
          {latestVideo ? <LatestVideoCard vod={latestVideo} /> : null}
        </GlassCard>

        <GlassCard
          initial={skipInitial ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          hover={false}
          className="flex flex-col gap-5 p-5 sm:p-6"
        >
          <ColumnHeader icon={<Clapperboard className="h-4 w-4" />} title="Latest Clips" href="/vods" />
          <div className="flex flex-col gap-4">
            {clips.map((clip) => (
              <ClipRow key={clip.id} vod={clip} />
            ))}
          </div>
        </GlassCard>

        <GlassCard
          initial={skipInitial ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          hover={false}
          className="flex flex-col gap-5 p-5 sm:p-6"
        >
          <ColumnHeader icon={<User className="h-4 w-4" />} title="About Me" />
          <p className="text-sm leading-relaxed text-[var(--color-mist-dim)]">
            Hey, I&apos;m Zydas — I stream slots, live casino, and bonus hunts on Kick. Join the
            community wagering under code <span className="font-semibold text-white">THEZYDAS</span>{" "}
            and follow along for big wins, giveaways, and leaderboard action every month.
          </p>
          <div className="mt-auto grid grid-cols-2 gap-3">
            <div className={cn("flex flex-col gap-1 rounded-xl bg-black/25 px-4 py-3")}>
              <span className="font-mono text-xl font-bold text-white sm:text-2xl">
                +{formatCompactNumber(stats.players)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-mist-dim)]">
                Community
              </span>
            </div>
            <div className={cn("flex flex-col gap-1 rounded-xl bg-black/25 px-4 py-3")}>
              <span className="font-mono text-xl font-bold text-white sm:text-2xl">
                ${formatCompactNumber(stats.prizePool)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-mist-dim)]">
                Prize Pool
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
