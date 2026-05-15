"use client";

import { useMemo } from "react";

type Spark = {
  left: string;
  size: "s1" | "s2" | "s3" | "s4";
  rise: number; // seconds
  pulse: number; // seconds
  delay: number; // seconds
  drift: number; // px
};

export function SparkParticles({ count = 10, className = "" }: { count?: number; className?: string }) {
  const sparks = useMemo<Spark[]>(() => {
    const sizes: Spark["size"][] = ["s1", "s2", "s3", "s4"];
    const out: Spark[] = [];
    for (let i = 0; i < count; i++) {
      const r = (i * 9301 + 49297) % 233280; // deterministic-ish
      const n = r / 233280;
      const left = `${Math.round(6 + ((i * 37) % 88))}%`;
      const size = sizes[i % sizes.length];
      const rise = 10 + Math.round(((i * 13) % 9)); // 10..18s (точно видно)
      const pulse = 2.6 + (((i * 7) % 20) / 10); // 2.6..4.5s
      const delay = -Math.round(n * 22); // negative for staggered start
      const drift = 40 + ((i * 19) % 90); // px
      out.push({ left, size, rise, pulse, delay, drift });
    }
    return out;
  }, [count]);

  return (
    <div className={`particles ${className}`} aria-hidden>
      {sparks.map((s, idx) => (
        <span
          key={idx}
          className={`spark ${s.size}`}
          style={
            {
              left: s.left,
              ["--rise" as any]: `${s.rise}s`,
              ["--pulse" as any]: `${s.pulse}s`,
              ["--delay" as any]: `${s.delay}s`,
              ["--drift" as any]: `${s.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

