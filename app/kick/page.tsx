import type { Metadata } from "next";
import { AtSign, Camera, MessageCircle, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";
import GlassCard from "@/components/ui/GlassCard";
import KickEmbed from "@/components/kick/KickEmbed";
import ScheduleGrid from "@/components/kick/ScheduleGrid";
import { KICK_URL, getSchedule, getStreamStatus } from "@/lib/api";

export const metadata: Metadata = {
  title: "Watch Live on Kick",
  description:
    "Watch TheZydas live on Kick. Catch the stream schedule and never miss a high-stakes session.",
};

const SOCIALS = [
  { label: "Kick", href: KICK_URL, icon: Zap },
  { label: "Twitter", href: "https://twitter.com/thezydas", icon: AtSign },
  { label: "Discord", href: "https://discord.gg/thezydas", icon: MessageCircle },
  { label: "Instagram", href: "https://instagram.com/thezydas", icon: Camera },
];

export default async function KickPage() {
  const [status, schedule] = await Promise.all([getStreamStatus(), getSchedule()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Watch Live"
        title="TheZydas on Kick"
        description="High-stakes wagers, big wins, and live leaderboard chases — every stream."
        revealOnScroll={false}
      />

      <div className="mx-auto mt-12 max-w-4xl">
        <KickEmbed status={status} />
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <GlowButton href={KICK_URL} external variant="primary">
            Follow on Kick
          </GlowButton>
          <div className="flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-mist)] transition-all hover:-translate-y-0.5 hover:text-[var(--color-neon)] hover:shadow-[0_0_16px_rgba(0,255,136,0.3)]"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="Weekly" title="Stream Schedule" align="center" />
        <div className="mt-10">
          <ScheduleGrid schedule={schedule} />
        </div>
      </div>

      <GlassCard className="mx-auto mt-16 max-w-3xl p-6 text-center">
        <p className="text-sm text-[var(--color-mist-dim)]">
          All times shown in UTC and subject to change. Turn on notifications on Kick and Discord
          to get pinged the moment TheZydas goes live.
        </p>
      </GlassCard>
    </div>
  );
}
