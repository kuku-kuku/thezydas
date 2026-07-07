import type { Metadata } from "next";
import Podium from "@/components/leaderboard/Podium";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import SectionHeading from "@/components/ui/SectionHeading";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { getLeaderboard, getNextResetDate } from "@/lib/api";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Live rain.gg leaderboard for TheZydas — code THEZYDAS. See the top wagerers and prize payouts updated in real time.",
};

export default async function LeaderboardPage() {
  const users = await getLeaderboard();
  const top3 = users.slice(0, 3);
  const rest = users.slice(3, 15);
  const resetDate = getNextResetDate();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Rain.gg · Code THEZYDAS"
        title="Leaderboard"
        description="Top wagerers this cycle, ranked live. Climb the board, take home real prizes."
      />

      <div className="mt-10 flex justify-center">
        <div className="glass max-w-full rounded-2xl px-3 py-5 sm:px-10">
          <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-mist-dim)]">
            Resets In
          </p>
          <CountdownTimer target={resetDate} />
        </div>
      </div>

      <div className="mt-20">
        <Podium users={top3} />
      </div>

      <div className="mt-20">
        <LeaderboardTable users={rest} />
      </div>
    </div>
  );
}
