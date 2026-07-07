import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import VodsGrid from "@/components/vods/VodsGrid";
import { getVods } from "@/lib/api";

export const metadata: Metadata = {
  title: "VODs",
  description:
    "Watch TheZydas' best VODs — big wins, bonus hunts, live casino sessions, and highlight reels.",
};

export default async function VodsPage() {
  const vods = await getVods();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Watch Back"
        title="VOD Gallery"
        description="Every big win, every bonus hunt, every clutch session — replay it all."
        revealOnScroll={false}
      />
      <div className="mt-14">
        <VodsGrid vods={vods} />
      </div>
    </div>
  );
}
