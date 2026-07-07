"use client";

import { useEffect, useRef } from "react";

const WORDS = [
  "GAMBLE",
  "RAIN.GG",
  "CODE: THEZYDAS",
  "WAGER",
  "WIN",
  "JACKPOT",
  "$$$",
  "ALL IN",
  "PAYOUT",
];

const MATRIX_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$€¥";

interface FloatingWord {
  text: string;
  x: number;
  y: number;
  depth: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
}

interface RainColumn {
  x: number;
  y: number;
  speed: number;
  length: number;
  fontSize: number;
  chars: string[];
  opacity: number;
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let words: FloatingWord[] = [];
    let columns: RainColumn[] = [];
    let isFirstResize = true;

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const wordCount = Math.max(10, Math.round((width * height) / 90000));
      words = Array.from({ length: wordCount }, () => createWord());

      const colCount = Math.max(8, Math.round(width / 90));
      columns = Array.from({ length: colCount }, (_, i) =>
        createColumn(i, colCount, isFirstResize)
      );
      isFirstResize = false;
    }

    function createWord(): FloatingWord {
      const depth = 0.3 + Math.random() * 0.7;
      return {
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        size: 12 + depth * 22,
        opacity: 0.04 + depth * 0.08,
        speed: 6 + depth * 18,
        drift: (Math.random() - 0.5) * 8,
      };
    }

    function createColumn(index: number, total: number, initial = false): RainColumn {
      const length = 6 + Math.floor(Math.random() * 14);
      return {
        x: (width / total) * index + Math.random() * 20,
        // On first mount, scatter heads across the full viewport so the rain
        // is already visible immediately instead of falling in from above.
        y: initial ? Math.random() * height : Math.random() * -height,
        speed: 40 + Math.random() * 70,
        length,
        fontSize: 13 + Math.random() * 4,
        chars: Array.from(
          { length },
          () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ),
        opacity: 0.05 + Math.random() * 0.06,
      };
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const displayFontFamily =
      rootStyle.getPropertyValue("--font-orbitron").trim() || "sans-serif";
    const monoFontFamily =
      rootStyle.getPropertyValue("--font-mono-num").trim() || "monospace";

    resize();
    window.addEventListener("resize", resize);

    function onPointerMove(e: PointerEvent) {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    }
    window.addEventListener("pointermove", onPointerMove);

    let lastTime = performance.now();
    let rafId = 0;
    let isVisible = document.visibilityState === "visible";

    function onVisibilityChange() {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        lastTime = performance.now();
        loop(lastTime);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    function loop(now: number) {
      if (!isVisible) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Matrix rain columns
      ctx.textBaseline = "top";
      for (const col of columns) {
        const parallaxX = mouse.x * 6;
        ctx.font = `${col.fontSize}px ${monoFontFamily}, monospace`;
        for (let i = 0; i < col.chars.length; i++) {
          const charY = col.y - i * (col.fontSize + 2);
          if (charY < -20 || charY > height + 20) continue;
          const fade = i === 0 ? col.opacity * 2.2 : col.opacity * (1 - i / col.chars.length);
          ctx.fillStyle = `rgba(0, 255, 136, ${Math.max(0, fade)})`;
          ctx.fillText(col.chars[i], col.x + parallaxX, charY);
        }
        col.y += col.speed * dt;
        if (Math.random() < 0.02) {
          col.chars[Math.floor(Math.random() * col.chars.length)] =
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }
        if (col.y - col.chars.length * (col.fontSize + 2) > height) {
          col.y = Math.random() * -height * 0.5;
        }
      }

      // Floating words
      for (const word of words) {
        const parallaxX = mouse.x * 22 * word.depth;
        const parallaxY = mouse.y * 14 * word.depth;
        ctx.font = `700 ${word.size}px ${displayFontFamily}, sans-serif`;
        ctx.fillStyle = `rgba(0, 255, 136, ${word.opacity})`;
        ctx.fillText(
          word.text,
          word.x + parallaxX + Math.sin(now / 4000 + word.x) * word.drift,
          word.y + parallaxY
        );
        word.y -= word.speed * dt;
        if (word.y < -40) {
          Object.assign(word, createWord(), { y: height + 40 });
        }
      }

      rafId = requestAnimationFrame(loop);
    }

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(loop);
    } else {
      // Static single paint for reduced-motion users
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.font = `700 18px ${displayFontFamily}, sans-serif`;
        for (const word of words) {
          ctx.fillStyle = `rgba(0, 255, 136, ${word.opacity})`;
          ctx.fillText(word.text, word.x, word.y);
        }
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
