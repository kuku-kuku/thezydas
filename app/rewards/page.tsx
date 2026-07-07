import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";
import CopyCodeButton from "@/components/rewards/CopyCodeButton";
import RewardCard from "@/components/rewards/RewardCard";
import FaqAccordion from "@/components/rewards/FaqAccordion";
import { AFFILIATE_CODE, RAIN_GG_SIGNUP_URL, getFaqs, getRewards } from "@/lib/api";

export const metadata: Metadata = {
  title: "Rewards & Bonuses",
  description:
    "Unlock deposit bonuses, free cases, and VIP perks on rain.gg with code THEZYDAS.",
};

export default async function RewardsPage() {
  const [rewards, faqs] = await Promise.all([getRewards(), getFaqs()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Affiliate Perks"
        title="Rewards & Bonuses"
        description="Everything you unlock by playing on rain.gg under code THEZYDAS."
      />

      <div className="mt-12 flex flex-col items-center gap-6">
        <CopyCodeButton code={AFFILIATE_CODE} />
        <GlowButton href={RAIN_GG_SIGNUP_URL} external variant="primary">
          Claim on rain.gg
        </GlowButton>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rewards.map((reward, i) => (
          <RewardCard key={reward.id} reward={reward} index={i} />
        ))}
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="Questions" title="Frequently Asked" />
        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
