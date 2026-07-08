"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  strong?: boolean;
  hover?: boolean;
}

export default function GlassCard({
  strong,
  hover = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : "glass",
        hover &&
          "transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(45,224,224,0.18)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
