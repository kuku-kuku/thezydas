import { Zap } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Zap
        className="h-8 w-8 animate-pulse text-[var(--color-neon)]"
        strokeWidth={2.5}
      />
    </div>
  );
}
