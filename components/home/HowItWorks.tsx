"use client";

import { motion, type Variants } from "framer-motion";
import { Coins, TrendingUp, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { AFFILIATE_CODE } from "@/lib/api";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";

const STEPS = [
  {
    icon: Coins,
    title: "Sign Up & Enter Code",
    description: `Create your rain.gg account and enter code ${AFFILIATE_CODE} to link your wagers to this leaderboard.`,
  },
  {
    icon: TrendingUp,
    title: "Wager On Your Games",
    description:
      "Play slots, live casino, or any game on rain.gg — every dollar wagered under the code counts toward your rank.",
  },
  {
    icon: Trophy,
    title: "Climb & Win Prizes",
    description:
      "Track your position live on the leaderboard and cash out real prizes when the monthly reset hits.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function HowItWorks() {
  const skipInitial = useSkipInitialAnimation("HowItWorks");

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Getting Started"
        title="How It Works"
        description="Three steps between you and the top of the leaderboard."
      />

      <motion.div
        variants={container}
        initial={skipInitial ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {STEPS.map((step, i) => (
          <motion.div key={step.title} variants={item}>
            <GlassCard className="flex h-full flex-col gap-4 p-8">
              <div className="flex items-center gap-4">
                <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[var(--color-neon)]">
                  <step.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-3xl font-black text-[var(--color-neon)]/25">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-mist-dim)]">
                {step.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
