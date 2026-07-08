import Link from "next/link";
import { AtSign, Camera, MessageCircle, Zap } from "lucide-react";
import { AFFILIATE_CODE, KICK_URL, RAIN_GG_SIGNUP_URL } from "@/lib/api";

const SOCIALS = [
  { label: "Kick", href: KICK_URL, icon: Zap },
  { label: "Twitter", href: "https://twitter.com/thezydas", icon: AtSign },
  { label: "Discord", href: "https://discord.gg/thezydas", icon: MessageCircle },
  { label: "Instagram", href: "https://instagram.com/thezydas", icon: Camera },
];

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Kick", href: "/kick" },
  { label: "VODs", href: "/vods" },
  { label: "Rewards", href: "/rewards" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-neon)]/10 bg-[var(--color-void-deep)]/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[var(--color-neon)]" strokeWidth={2.5} />
              <span className="font-display text-lg font-bold tracking-widest text-white">
                THE<span className="gradient-text-neon">ZYDAS</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-[var(--color-mist-dim)]">
              Official rain.gg affiliate leaderboard. Wager under code{" "}
              <span className="font-mono font-semibold text-[var(--color-neon)]">
                {AFFILIATE_CODE}
              </span>{" "}
              to climb the ranks and win real prizes.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-mist)] transition-all hover:-translate-y-0.5 hover:text-[var(--color-neon)] hover:shadow-[0_0_16px_rgba(45,224,224,0.3)]"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neon)]">
              Navigate
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-sm text-[var(--color-mist-dim)] transition-colors hover:text-[var(--color-neon)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neon)]">
              Get Started
            </h3>
            <p className="mt-4 text-sm text-[var(--color-mist-dim)]">
              New to rain.gg? Sign up with code{" "}
              <span className="font-mono font-semibold text-white">{AFFILIATE_CODE}</span> and
              start climbing the leaderboard today.
            </p>
            <a
              href={RAIN_GG_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-sm font-semibold text-[var(--color-neon)] underline decoration-[var(--color-neon)]/40 underline-offset-4 hover:decoration-[var(--color-neon)]"
            >
              rain.gg/r/thezydas &rarr;
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-neon)]/10 pt-6">
          <div className="glass rounded-xl px-5 py-4">
            <p className="text-xs leading-relaxed text-[var(--color-mist-faint)]">
              <span className="font-semibold text-[var(--color-mist-dim)]">18+ · Play Responsibly.</span>{" "}
              Gambling involves risk and can be addictive. This site is a fan-run leaderboard hub
              for the rain.gg affiliate program and does not itself offer gambling services.
              TheZydas and this site do not guarantee any winnings, outcomes, or availability of
              promotions. Only wager what you can afford to lose. If you or someone you know has
              a gambling problem, contact the National Council on Problem Gambling at 1-800-522-4700
              or visit ncpgambling.org for confidential support.
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-[var(--color-mist-faint)]">
            &copy; {new Date().getFullYear()} TheZydas. Not affiliated with or endorsed by rain.gg
            beyond the standard affiliate partnership.
          </p>
        </div>
      </div>
    </footer>
  );
}
