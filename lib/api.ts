import type {
  FaqItem,
  LeaderboardUser,
  Reward,
  ScheduleItem,
  SiteStats,
  SocialLink,
  Vod,
} from "@/types";

/**
 * ---------------------------------------------------------------------------
 * DATA LAYER
 * ---------------------------------------------------------------------------
 * Every export below is an async function returning mock data shaped exactly
 * like the payloads the real rain.gg affiliate API would return. When the
 * real integration is ready, swap the mock implementation inside each
 * function for a `fetch()` call against the rain.gg affiliate endpoint
 * (e.g. `https://api.rain.gg/affiliates/thezydas/leaderboard`) — nothing
 * outside this file needs to change since components only ever import from
 * "@/lib/api".
 * ---------------------------------------------------------------------------
 */

const USERNAMES = [
  "VoidReaper",
  "LuckyNova",
  "CryptoKingz",
  "ShadowSlayer",
  "EmeraldEdge",
  "HighRollerHQ",
  "PixelBandit",
  "NightWagers",
  "GhostStacks",
  "RainMakerX",
  "SpinCityKid",
  "TiltProof",
  "VelvetVenom",
  "ZeroHourZed",
  "BlazeBets99",
];

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function buildLeaderboard(): LeaderboardUser[] {
  const rand = seededRandom(1337);
  const prizeTable = [
    5000, 2500, 1250, 750, 500, 350, 250, 200, 150, 125, 100, 75, 50, 40, 25,
  ];

  const users = USERNAMES.map((username, i) => {
    const base = 180000 - i * (10000 + rand() * 3000);
    const wagered = Math.max(1200, Math.round(base * (0.85 + rand() * 0.3)));
    return {
      id: `user-${i + 1}`,
      username,
      avatar: username.toLowerCase(),
      wagered,
    };
  }).sort((a, b) => b.wagered - a.wagered);

  return users.map((u, i) => ({
    ...u,
    rank: i + 1,
    prize: prizeTable[i] ?? 0,
  }));
}

const MOCK_LEADERBOARD = buildLeaderboard();

const MOCK_STATS: SiteStats = {
  totalWagered: MOCK_LEADERBOARD.reduce((sum, u) => sum + u.wagered, 0) * 6,
  prizePool: MOCK_LEADERBOARD.reduce((sum, u) => sum + u.prize, 0),
  players: 4821,
};

const MOCK_VODS: Vod[] = [
  {
    id: "vod-1",
    title: "$50K Bonus Buy Session — Insane Gates of Olympus Run",
    thumbnail: "olympus",
    date: "2026-07-02",
    durationSeconds: 5423,
    category: "Big Wins",
    url: "https://kick.com/thezydas",
  },
  {
    id: "vod-2",
    title: "Live Blackjack High Stakes vs The House",
    thumbnail: "blackjack",
    date: "2026-06-29",
    durationSeconds: 7210,
    category: "Live Casino",
    url: "https://kick.com/thezydas",
  },
  {
    id: "vod-3",
    title: "Sweet Bonanza Bonus Hunt — 20 Slots Opened",
    thumbnail: "bonanza",
    date: "2026-06-26",
    durationSeconds: 4890,
    category: "Slots",
    url: "https://kick.com/thezydas",
  },
  {
    id: "vod-4",
    title: "TOP 5 WINS OF THE MONTH — June Highlight Reel",
    thumbnail: "highlights",
    date: "2026-06-24",
    durationSeconds: 1260,
    category: "Highlights",
    url: "https://kick.com/thezydas",
  },
  {
    id: "vod-5",
    title: "Crazy Time Live — Chasing the Bonus Wheel",
    thumbnail: "crazytime",
    date: "2026-06-21",
    durationSeconds: 6120,
    category: "Live Casino",
    url: "https://kick.com/thezydas",
  },
  {
    id: "vod-6",
    title: "Wanted Dead or a Wild — Max Win Attempt",
    thumbnail: "wanted",
    date: "2026-06-18",
    durationSeconds: 3980,
    category: "Slots",
    url: "https://kick.com/thezydas",
  },
  {
    id: "vod-7",
    title: "$100K Wagered in One Night — Full VOD",
    thumbnail: "wagerfest",
    date: "2026-06-14",
    durationSeconds: 9840,
    category: "Big Wins",
    url: "https://kick.com/thezydas",
  },
  {
    id: "vod-8",
    title: "Roulette Streaks — Green Run Compilation",
    thumbnail: "roulette",
    date: "2026-06-10",
    durationSeconds: 980,
    category: "Highlights",
    url: "https://kick.com/thezydas",
  },
];

const MOCK_SCHEDULE: ScheduleItem[] = [
  { day: "Monday", time: "8:00 PM UTC", title: "Slots & Chill" },
  { day: "Tuesday", time: "Off", title: "No Stream" },
  { day: "Wednesday", time: "8:00 PM UTC", title: "High Stakes Wednesday" },
  { day: "Thursday", time: "9:00 PM UTC", title: "Bonus Hunt Grind" },
  { day: "Friday", time: "9:00 PM UTC", title: "Community Wager Night" },
  { day: "Saturday", time: "6:00 PM UTC", title: "Marathon Stream" },
  { day: "Sunday", time: "7:00 PM UTC", title: "Leaderboard Finale" },
];

const MOCK_REWARDS: Reward[] = [
  {
    id: "reward-1",
    title: "Welcome Deposit Bonus",
    description:
      "Sign up on rain.gg with code THEZYDAS and get an instant boost on your first deposit.",
    amount: "Up to $1,000",
    icon: "gift",
  },
  {
    id: "reward-2",
    title: "Free Case Drop",
    description:
      "Redeem a free case every day just for being part of the THEZYDAS community.",
    amount: "Daily",
    icon: "coins",
  },
  {
    id: "reward-3",
    title: "Rakeback Boost",
    description:
      "Earn elevated rakeback on every wager placed under the affiliate code.",
    amount: "+15%",
    icon: "percent",
  },
  {
    id: "reward-4",
    title: "VIP Fast-Track",
    description:
      "Skip the line into rain.gg's VIP program with exclusive perks and faster withdrawals.",
    amount: "Instant",
    icon: "sparkles",
  },
];

const MOCK_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I use the code THEZYDAS?",
    answer:
      "Sign up at rain.gg and enter THEZYDAS in the affiliate code field during registration, or sign up directly through the link on this site to have it applied automatically.",
  },
  {
    id: "faq-2",
    question: "Is the leaderboard wager based?",
    answer:
      "Yes. Rankings are calculated from your total wagered amount on rain.gg while using code THEZYDAS during the active leaderboard period.",
  },
  {
    id: "faq-3",
    question: "When does the leaderboard reset?",
    answer:
      "The leaderboard resets on a rolling monthly cycle. The exact countdown is always visible at the top of the leaderboard page.",
  },
  {
    id: "faq-4",
    question: "How and when are prizes paid out?",
    answer:
      "Prizes are distributed within 48 hours of a leaderboard reset, directly to your rain.gg wallet balance.",
  },
  {
    id: "faq-5",
    question: "Do bonuses stack with the leaderboard?",
    answer:
      "Yes — deposit bonuses, rakeback, and free cases all stack independently from your leaderboard position and prize.",
  },
];

const MOCK_SOCIALS: SocialLink[] = [
  { id: "kick", label: "Kick", href: "https://kick.com/thezydas", icon: "kick" },
  {
    id: "twitter",
    label: "Twitter / X",
    href: "https://twitter.com/thezydas",
    icon: "twitter",
  },
  {
    id: "discord",
    label: "Discord",
    href: "https://discord.gg/thezydas",
    icon: "discord",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/thezydas",
    icon: "instagram",
  },
];

const NETWORK_DELAY_MS = 120;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

export async function getLeaderboard(): Promise<LeaderboardUser[]> {
  // TODO(real API): replace with
  //   const res = await fetch("https://api.rain.gg/affiliates/thezydas/leaderboard", { next: { revalidate: 60 } });
  //   return res.json();
  return delay(MOCK_LEADERBOARD);
}

export async function getStats(): Promise<SiteStats> {
  // TODO(real API): replace with fetch to rain.gg affiliate stats endpoint
  return delay(MOCK_STATS);
}

export async function getVods(): Promise<Vod[]> {
  return delay(MOCK_VODS);
}

export async function getSchedule(): Promise<ScheduleItem[]> {
  return delay(MOCK_SCHEDULE);
}

export async function getRewards(): Promise<Reward[]> {
  return delay(MOCK_REWARDS);
}

export async function getFaqs(): Promise<FaqItem[]> {
  return delay(MOCK_FAQS);
}

export async function getSocials(): Promise<SocialLink[]> {
  return delay(MOCK_SOCIALS);
}

export interface StreamStatus {
  isLive: boolean;
  title?: string;
  viewers?: number;
}

const MOCK_STREAM_STATUS: StreamStatus = {
  isLive: false,
  title: "Offline — check the schedule below for the next stream",
};

export async function getStreamStatus(): Promise<StreamStatus> {
  // TODO(real API): replace with a fetch to the Kick public API,
  //   e.g. `https://kick.com/api/v2/channels/thezydas`, and map `livestream !== null`.
  return delay(MOCK_STREAM_STATUS);
}

export function getNextResetDate(): Date {
  const now = new Date();
  const reset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));
  return reset;
}

export const AFFILIATE_CODE = "THEZYDAS";
export const RAIN_GG_SIGNUP_URL = "https://rain.gg/r/thezydas";
export const KICK_CHANNEL = "thezydas";
export const KICK_URL = `https://kick.com/${KICK_CHANNEL}`;
