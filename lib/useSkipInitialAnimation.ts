"use client";

import { useEffect, useState } from "react";

// Module-scoped: shared across every component instance for the lifetime of
// the page (until a full reload), not per-component.
let appHasHydrated = false;

/**
 * Returns true only for components present during the very first client
 * paint (the initial page load). Framer Motion renders the `animate` end
 * state inline in the SSR'd HTML for elements with no opacity change in
 * their `initial` prop, so on hydration it has to snap back to `initial`
 * before replaying the enter transition — a visible "plays, resets, plays
 * again" glitch. Passing `initial={false}` when this returns true skips
 * that replay entirely, since the content is already correct from SSR.
 *
 * Components that mount later — via client-side navigation to a new page,
 * for instance — see `false` and animate in normally, since there's no SSR
 * mismatch to reconcile at that point.
 */
export function useSkipInitialAnimation() {
  const [skip] = useState(() => !appHasHydrated);

  useEffect(() => {
    appHasHydrated = true;
  }, []);

  return skip;
}
