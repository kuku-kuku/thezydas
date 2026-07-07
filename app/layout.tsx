import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import MatrixBackground from "@/components/background/MatrixBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-num",
  subsets: ["latin"],
});

const SITE_URL = "https://thezydas.gg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TheZydas | rain.gg Leaderboard — Code THEZYDAS",
    template: "%s | TheZydas",
  },
  description:
    "Official TheZydas rain.gg affiliate leaderboard. Wager under code THEZYDAS to climb the ranks, win real prizes, and unlock exclusive bonuses.",
  keywords: [
    "TheZydas",
    "rain.gg",
    "rain.gg leaderboard",
    "gambling leaderboard",
    "rain.gg code",
    "THEZYDAS code",
    "kick streamer",
    "casino affiliate",
  ],
  authors: [{ name: "TheZydas" }],
  openGraph: {
    title: "TheZydas | rain.gg Leaderboard — Code THEZYDAS",
    description:
      "Wager under code THEZYDAS on rain.gg to climb the leaderboard and win real prizes.",
    url: SITE_URL,
    siteName: "TheZydas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheZydas | rain.gg Leaderboard — Code THEZYDAS",
    description:
      "Wager under code THEZYDAS on rain.gg to climb the leaderboard and win real prizes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-[var(--color-void)]">
        <MatrixBackground />
        <div className="relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
