"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { KICK_CHANNEL } from "@/lib/api";
import type { StreamStatus } from "@/lib/api";

export default function KickEmbed({ status }: { status: StreamStatus }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-[var(--color-neon-dark)]/40 via-[var(--color-neon)]/20 to-[var(--color-neon-dark)]/40 blur-xl" />
      <div className="glow-border overflow-hidden rounded-2xl border border-[var(--color-neon)]/25 bg-black">
        <div className="flex items-center justify-between px-4 py-3 sm:px-5">
          <Badge live={status.isLive}>{status.isLive ? "Live Now" : "Offline"}</Badge>
          <span className="font-mono text-xs text-[var(--color-mist-dim)]">
            kick.com/{KICK_CHANNEL}
          </span>
        </div>
        <div className="aspect-video w-full bg-[var(--color-void-deep)]">
          <iframe
            src={`https://player.kick.com/${KICK_CHANNEL}`}
            title={`${KICK_CHANNEL} Kick stream`}
            loading="lazy"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
