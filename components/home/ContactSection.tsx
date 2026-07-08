"use client";

import { Mail } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import CopyCodeButton from "@/components/rewards/CopyCodeButton";
import { CONTACT_EMAIL } from "@/lib/api";
import { useSkipInitialAnimation } from "@/lib/useSkipInitialAnimation";

export default function ContactSection() {
  const skipInitial = useSkipInitialAnimation("ContactSection");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-4">
        <span className="h-px w-8 bg-[var(--color-neon)]/30" />
        <div className="flex items-center gap-2 text-[var(--color-neon)]">
          <Mail className="h-4 w-4" />
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Contact
          </h2>
        </div>
        <span className="h-px w-8 bg-[var(--color-neon)]/30" />
      </div>

      <GlassCard
        initial={skipInitial ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        hover={false}
        className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between sm:p-8"
      >
        <p className="max-w-sm text-center text-sm text-[var(--color-mist-dim)] sm:text-left">
          For business inquiries or collaboration requests, reach out by email.
        </p>
        <CopyCodeButton code={CONTACT_EMAIL} label="Email" valueClassName="text-base sm:text-lg" />
      </GlassCard>
    </section>
  );
}
