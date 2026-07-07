import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import TopThreeTeaser from "@/components/home/TopThreeTeaser";
import HowItWorks from "@/components/home/HowItWorks";
import PrizeBreakdown from "@/components/home/PrizeBreakdown";
import { getLeaderboard, getStats } from "@/lib/api";

export default async function Home() {
  const [stats, leaderboard] = await Promise.all([getStats(), getLeaderboard()]);

  return (
    <div className="flex flex-col">
      <Hero />
      <StatsSection stats={stats} />
      <TopThreeTeaser users={leaderboard} />
      <HowItWorks />
      <PrizeBreakdown users={leaderboard} />
    </div>
  );
}
