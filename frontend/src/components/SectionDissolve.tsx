"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/cn";

export function SectionDissolve({
  className,
  from = "rgba(16,13,10,0.0)",
  mid = "rgba(16,13,10,0.55)",
  to = "rgba(16,13,10,0.0)",
}: {
  className?: string;
  from?: string;
  mid?: string;
  to?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.0, 1.0, 0.0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10px", "10px"]);

  return (
    <div ref={ref} className={cn("hidden sm:block relative h-8 lg:h-20", className)}>
      <motion.div
        style={{
          opacity,
          y,
          background: `linear-gradient(180deg, ${from} 0%, ${mid} 50%, ${to} 100%)`,
        }}
        className="absolute inset-0"
      />
      <motion.div
        style={{
          opacity,
          y,
          background:
            "radial-gradient(420px 120px at 50% 45%, rgba(242,182,109,0.07), transparent 70%)",
        }}
        className="absolute inset-0"
      />
    </div>
  );
}

