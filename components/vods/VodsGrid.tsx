"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Vod, VodCategory } from "@/types";
import VodCard from "./VodCard";

const CATEGORIES: Array<VodCategory | "All"> = [
  "All",
  "Slots",
  "Live Casino",
  "Big Wins",
  "Highlights",
];

export default function VodsGrid({ vods }: { vods: Vod[] }) {
  const [active, setActive] = useState<VodCategory | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? vods : vods.filter((v) => v.category === active)),
    [active, vods]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {CATEGORIES.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "relative px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors sm:px-5",
                isActive ? "text-[var(--color-neon)]" : "text-[var(--color-mist-dim)] hover:text-white"
              )}
            >
              {category}
              {isActive ? (
                <motion.span
                  layoutId="vod-tab-underline"
                  className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-[var(--color-neon)] shadow-[0_0_10px_rgba(45,224,224,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((vod, i) => (
            <VodCard key={vod.id} vod={vod} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center font-mono text-sm text-[var(--color-mist-dim)]">
          No VODs in this category yet.
        </p>
      ) : null}
    </div>
  );
}
