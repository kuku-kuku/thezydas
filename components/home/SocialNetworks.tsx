"use client";

import { motion } from "framer-motion";
import { AtSign, Camera, Globe, MessageCircle, Music2, MonitorPlay, Zap } from "lucide-react";
import type { ComponentType } from "react";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";
import type { SocialLink } from "@/types";

const ICON_MAP: Record<SocialLink["icon"], ComponentType<{ className?: string }>> = {
  kick: Zap,
  twitter: AtSign,
  discord: MessageCircle,
  instagram: Camera,
  youtube: MonitorPlay,
  tiktok: Music2,
};

export default function SocialNetworks({ socials }: { socials: SocialLink[] }) {
  const skipInitial = useSkipInitialAnimation("SocialNetworks");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4">
        <span className="h-px w-8 bg-[var(--color-neon)]/30" />
        <div className="flex items-center gap-2 text-[var(--color-neon)]">
          <Globe className="h-4 w-4" />
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Social Networks
          </h2>
        </div>
        <span className="h-px w-8 bg-[var(--color-neon)]/30" />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {socials.map((social, i) => {
          const Icon = ICON_MAP[social.icon];
          return (
            <motion.a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={skipInitial ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-6 text-center transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(45,224,224,0.18)]"
            >
              <Icon className="h-5 w-5 text-[var(--color-neon)]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white">
                {social.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
