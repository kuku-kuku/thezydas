"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import GlowButton from "@/components/ui/GlowButton";
import { RAIN_GG_SIGNUP_URL } from "@/lib/api";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/kick", label: "Kick" },
  { href: "/vods", label: "VODs" },
  { href: "/rewards", label: "Rewards" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-[var(--color-neon)]/10">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" prefetch={false} className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Zap className="h-5 w-5 text-[var(--color-neon)]" strokeWidth={2.5} />
            <span className="font-display text-lg font-bold tracking-widest text-white">
              THE<span className="gradient-text-neon">ZYDAS</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className={cn(
                      "relative px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors",
                      active ? "text-[var(--color-neon)]" : "text-[var(--color-mist)] hover:text-white"
                    )}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-[var(--color-neon)] shadow-[0_0_10px_rgba(45,224,224,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <GlowButton href={RAIN_GG_SIGNUP_URL} external variant="primary" className="px-5 py-2.5 text-xs">
              Join rain.gg
            </GlowButton>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-neon)] lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong overflow-hidden border-b border-[var(--color-neon)]/10 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {LINKS.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 font-mono text-sm font-semibold uppercase tracking-widest",
                        active
                          ? "bg-[var(--color-neon)]/10 text-[var(--color-neon)]"
                          : "text-[var(--color-mist)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <GlowButton
                  href={RAIN_GG_SIGNUP_URL}
                  external
                  variant="primary"
                  className="w-full px-5 py-3 text-xs"
                >
                  Join rain.gg
                </GlowButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
