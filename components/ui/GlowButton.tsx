"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  external,
}: GlowButtonProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.25 });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold tracking-wide uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-[var(--color-neon-dark)] to-[var(--color-neon-bright)] text-[#031616] shadow-[0_0_25px_rgba(45,224,224,0.35)] hover:shadow-[0_0_45px_rgba(45,224,224,0.6)]",
    outline:
      "border border-[var(--color-neon)]/40 text-[var(--color-neon)] hover:border-[var(--color-neon)] hover:bg-[var(--color-neon)]/10 hover:shadow-[0_0_30px_rgba(45,224,224,0.25)]",
    ghost: "text-[var(--color-mist)] hover:text-[var(--color-neon)]",
  };

  const content = (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 14, mass: 0.4 }}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} prefetch={false}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick}>
      {content}
    </button>
  );
}
