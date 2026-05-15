"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { SectionFrame, type SectionTone } from "@/components/SectionFrame";

const HIGHLIGHT_KEYS = new Set(["Дата", "Время"]);

export function DayBlock({
  label,
  title,
  text,
  photoSrc,
  details,
  venueThumbnailSrc,
  reversed = false,
  tone = "deep",
}: {
  label: string;
  title: string;
  text: string;
  details?: { k: string; v: string }[];
  /** Маленькое изображение рядом с строкой «Место» (например логотип площадки) */
  venueThumbnailSrc?: string;
  photoSrc: string;
  reversed?: boolean;
  tone?: SectionTone;
}) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [isMobile ? "1.5%" : "5%", isMobile ? "-1.5%" : "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, isMobile ? 1.06 : 1.12]);

  return (
    <SectionFrame tone={tone} padding="md">
      <div ref={ref} className="container-editorial">
        <div
          className={cn(
            "grid grid-cols-12 gap-6 items-start",
            reversed && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] glass">
                <div className="relative aspect-[4/5]">
                  <motion.div className="absolute inset-0" style={{ y, scale }}>
                  <Image
                    src={photoSrc}
                    alt=""
                    fill
                    className="object-cover object-[50%_30%]"
                    quality={100}
                    sizes="(max-width: 640px) 92vw, (min-width: 1024px) 42vw, 80vw"
                    unoptimized
                  />
                  </motion.div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-10">
            <Reveal>
              <p className="hairline text-[12px] text-[rgba(250,246,239,0.8)]">{label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="serif mt-5 text-[clamp(26px,3.3vw,54px)] leading-[1.04] text-[rgba(250,246,239,0.96)]">
                {title}
              </h3>
            </Reveal>

            {details?.length ? (
              <Reveal delay={0.12}>
                <div className="mt-7 grid grid-cols-12 gap-y-4 rounded-[22px] glass px-5 py-5">
                  {details.map((d) => (
                    <div key={d.k} className="col-span-12 md:col-span-6">
                      {venueThumbnailSrc && d.k === "Место" ? (
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="hairline text-[11px] text-[rgba(250,246,239,0.78)]">{d.k}</p>
                            <p className="mt-1 text-[14px] leading-[1.6] text-[rgba(250,246,239,0.9)]">{d.v}</p>
                          </div>
                          <div
                            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] soft-border bg-[rgba(246,239,229,0.06)] shadow-[0_6px_24px_rgba(0,0,0,0.35)] sm:h-[60px] sm:w-[60px]"
                            aria-hidden
                          >
                            {/* обычный img: в проде не зависит от /_next/image и sharp */}
                            <img
                              src={venueThumbnailSrc}
                              alt=""
                              width={52}
                              height={52}
                              className="max-h-[44px] max-w-[44px] object-contain sm:max-h-[50px] sm:max-w-[50px]"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="hairline text-[11px] text-[rgba(250,246,239,0.78)]">{d.k}</p>
                          {HIGHLIGHT_KEYS.has(d.k) ? (
                            <p className="mt-1 serif text-[20px] tracking-[-0.04em] text-[rgba(246,239,229,0.92)]">
                              {d.v}
                            </p>
                          ) : (
                            <p className="mt-1 text-[14px] leading-[1.6] text-[rgba(250,246,239,0.9)]">
                              {d.v}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[70ch] text-[15px] leading-[1.95] text-[rgba(250,246,239,0.88)] whitespace-pre-line">
                {text}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

