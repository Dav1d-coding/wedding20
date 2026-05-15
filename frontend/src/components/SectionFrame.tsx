"use client";

import { cn } from "@/lib/cn";

export type SectionTone = "deep" | "warm";

export function SectionFrame({
  children,
  className,
  tone = "deep",
  id,
  padding = "md",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
  padding?: "sm" | "md" | "lg";
}) {
  const pad =
    padding === "sm"
      ? "py-10 sm:py-14 lg:py-18"
      : padding === "lg"
        ? "py-18 sm:py-20 lg:py-28"
        : "py-14 sm:py-18 lg:py-24";

  /* Едва различимые оттенки — переход между секциями почти незаметен */
  const bg =
    tone === "warm"
      ? "from-[#100D0A] via-[#12100E] to-[#100D0A]"
      : "from-[#0E0C0A] via-[#100D0A] to-[#0E0C0A]";

  const orbA =
    tone === "warm"
      ? "radial-gradient(620px 340px at 15% 25%, rgba(232,214,189,0.05), transparent 62%)"
      : "radial-gradient(520px 280px at 20% 30%, rgba(90,63,43,0.05), transparent 65%)";

  const orbB =
    tone === "warm"
      ? "radial-gradient(580px 360px at 88% 18%, rgba(242,182,109,0.05), transparent 65%)"
      : "radial-gradient(560px 320px at 85% 20%, rgba(185,145,90,0.04), transparent 68%)";

  return (
    <section
      id={id}
      className={cn("relative isolate overflow-hidden", pad, className)}
      data-tone={tone}
    >
      {/* background that always equals section height */}
      <div className={cn("absolute inset-0 -z-10 bg-gradient-to-b", bg)} />
      <div className="absolute inset-0 -z-10" style={{ background: `${orbA}, ${orbB}` }} />

      {children}
    </section>
  );
}

