import { cn } from "@/lib/utils";

interface BadgeProps {
  live?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ live, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-neon)]",
        className
      )}
    >
      {live ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-neon)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-neon)]" />
        </span>
      ) : null}
      {children}
    </span>
  );
}
