import type { LeaderboardUser } from "@/types";
import PodiumCard from "./PodiumCard";

interface PodiumProps {
  users: LeaderboardUser[];
}

export default function Podium({ users }: PodiumProps) {
  const [first, second, third] = users;
  if (!first || !second || !third) return null;

  return (
    <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-end sm:gap-4 md:gap-6">
      <PodiumCard user={second} place={2} />
      <PodiumCard user={first} place={1} />
      <PodiumCard user={third} place={3} />
    </div>
  );
}
