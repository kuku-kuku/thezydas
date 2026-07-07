import { cn } from "@/lib/utils";

interface AvatarProps {
  seed: string;
  username: string;
  size?: number;
  ring?: "gold" | "silver" | "bronze" | "neon" | "none";
  className?: string;
}

const RING_STYLES: Record<string, string> = {
  gold: "ring-2 ring-[var(--color-gold)] shadow-[0_0_24px_rgba(255,215,0,0.45)]",
  silver: "ring-2 ring-[var(--color-silver)] shadow-[0_0_18px_rgba(201,211,214,0.35)]",
  bronze: "ring-2 ring-[var(--color-bronze)] shadow-[0_0_18px_rgba(205,127,50,0.35)]",
  neon: "ring-2 ring-[var(--color-neon)]/50 shadow-[0_0_14px_rgba(0,255,136,0.25)]",
  none: "",
};

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function Avatar({
  seed,
  username,
  size = 48,
  ring = "none",
  className,
}: AvatarProps) {
  const hash = hashSeed(seed);
  const hueA = hash % 360;
  const hueB = (hueA + 60 + (hash % 40)) % 360;
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-display font-bold text-black/80",
        RING_STYLES[ring],
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, hsl(${hueA} 85% 55%), hsl(${hueB} 85% 45%))`,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
