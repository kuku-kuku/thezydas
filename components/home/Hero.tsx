"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import GlowButton from "@/components/ui/GlowButton";
import { AFFILIATE_CODE, RAIN_GG_SIGNUP_URL } from "@/lib/api";

const HEADLINE_WORDS = ["WAGER.", "CLIMB.", "WIN."];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-28 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Badge live>Live on Kick</Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="pointer-events-none absolute -inset-5 -z-10 animate-pulse-slow rounded-full bg-[var(--color-neon)]/20 blur-2xl" />
        <div className="animate-float overflow-hidden rounded-full ring-2 ring-[var(--color-neon)]/60 shadow-[0_0_50px_rgba(0,255,136,0.4)]">
          <Image
            src="/theyzdas.webp"
            alt="TheZydas"
            width={160}
            height={160}
            priority
            className="h-32 w-32 object-cover sm:h-40 sm:w-40"
          />
        </div>
      </motion.div>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"
      >
        {HEADLINE_WORDS.map((word, i) => (
          <motion.span
            key={word}
            variants={wordVariant}
            className={i === HEADLINE_WORDS.length - 1 ? "gradient-text-neon glow-text" : ""}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-6 max-w-xl text-balance font-mono text-sm text-[var(--color-mist-dim)] sm:text-base"
      >
        TheZydas&apos; official rain.gg leaderboard. Wager under code{" "}
        <span className="font-bold text-[var(--color-neon)]">{AFFILIATE_CODE}</span> to climb the
        ranks and win real cash prizes every single month.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <GlowButton href="/leaderboard" variant="primary">
          View Leaderboard
        </GlowButton>
        <GlowButton href={RAIN_GG_SIGNUP_URL} external variant="outline">
          Join rain.gg — Code {AFFILIATE_CODE}
        </GlowButton>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[500px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.14),transparent_65%)]"
      />
    </section>
  );
}
