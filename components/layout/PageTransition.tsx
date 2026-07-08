"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  console.log(`[anim] PageTransition render for "${pathname}"`);

  useEffect(() => {
    console.log(`[anim] PageTransition effect: scrolling to top for "${pathname}"`);
    window.scrollTo(0, 0);
    return () => {
      console.log(`[anim] PageTransition cleanup for "${pathname}"`);
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/*
        No opacity here on purpose. This wrapper re-mounts on every route
        change and contains the entire page, so it's the highest-stakes
        place an opacity-driven entrance can hit the Chromium
        backdrop-filter compositing bug (content renders but never gets
        painted — visible interactively, invisible visually — until a
        forced reflow like a resize). A slide is enough of a transition
        without that risk.
      */}
      <motion.div
        key={pathname}
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        exit={{ y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
