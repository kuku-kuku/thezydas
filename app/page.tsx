import Hero from "@/components/home/Hero";
import LatestContent from "@/components/home/LatestContent";
import StatsSection from "@/components/home/StatsSection";
import TopThreeTeaser from "@/components/home/TopThreeTeaser";
import HowItWorks from "@/components/home/HowItWorks";
import PrizeBreakdown from "@/components/home/PrizeBreakdown";
import SocialNetworks from "@/components/home/SocialNetworks";
import ContactSection from "@/components/home/ContactSection";
import { getLeaderboard, getSocials, getStats, getVods } from "@/lib/api";

export default async function Home() {
  const [stats, leaderboard, vods, socials] = await Promise.all([
    getStats(),
    getLeaderboard(),
    getVods(),
    getSocials(),
  ]);

  return (
    <div className="flex flex-col">
      <Hero />
      <LatestContent vods={vods} stats={stats} />
      <StatsSection stats={stats} />
      <TopThreeTeaser users={leaderboard} />
      <HowItWorks />
      <PrizeBreakdown users={leaderboard} />
      <SocialNetworks socials={socials} />
      <ContactSection />
    </div>
  );
}
