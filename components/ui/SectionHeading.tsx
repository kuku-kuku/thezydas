"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  // Page-top headings (revealOnScroll=false) skip the opacity dip: Framer
  // Motion renders `initial` inline in the SSR'd HTML, so an opacity:0 start
  // means the title is invisible until JS hydrates — very noticeable on a
  // slow/cold load since it's the first thing on the page. Below-the-fold
  // headings keep the fade since JS has plenty of time to hydrate before a
  // user scrolls to them.
  const revealProps = revealOnScroll
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.5 },
      }
    : { initial: { y: 24 }, animate: { y: 0 } };

  return (
    <motion.div
      {...revealProps}
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
