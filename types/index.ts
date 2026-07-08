export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  wagered: number;
  prize: number;
}

export interface SiteStats {
  totalWagered: number;
  prizePool: number;
  players: number;
}

export type VodCategory = "Slots" | "Live Casino" | "Big Wins" | "Highlights";

export interface Vod {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  durationSeconds: number;
  category: VodCategory;
  url: string;
  views: number;
}

export interface ScheduleItem {
  day: string;
  time: string;
  title: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  amount: string;
  icon: "gift" | "coins" | "sparkles" | "percent";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "kick" | "twitter" | "discord" | "instagram" | "youtube" | "tiktok";
}
