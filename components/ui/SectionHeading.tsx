"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /**
   * Whether to reveal on scroll (whileInView) vs. immediately on mount.
   * Use `false` for headings that render at the top of a page — they're
   * already in the viewport on load, and whileInView can occasionally fail
   * to fire for already-visible elements, leaving the heading invisible.
   */
  revealOnScroll?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  revealOnScroll = true,
}: SectionHeadingProps) {
  const skipInitial = useSkipInitialAnimation(`SectionHeading:${title}`);

  // Both branches skip their `initial` on first paint (skipInitial) to avoid
  // a hydration snap-back-then-replay glitch: Framer Motion renders every
  // motion element's *settled* state inline in the SSR'd HTML regardless of
  // whether it's animate- or whileInView-driven, so re-imposing the real
  // `initial` on the very first client render forces a visible snap back
  // before the enter transition replays. Skipping it there means the first
  // paint just shows the already-correct SSR output once; anything mounted
  // later via client-side navigation has no SSR output to reconcile against,
  // so it gets the real `initial` and animates in normally.
  const revealProps = revealOnScroll
    ? {
        initial: skipInitial ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.5 },
      }
    : { initial: skipInitial ? false : { y: 24 }, animate: { y: 0 } };

  return (
    <motion.div
      {...revealProps}
      onAnimationStart={() => console.log(`[anim] SectionHeading "${title}": START`)}
      onAnimationComplete={() => console.log(`[anim] SectionHeading "${title}": COMPLETE`)}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neon)]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-balance text-base text-[var(--color-mist-dim)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
