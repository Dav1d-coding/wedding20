"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";

function mediaKind(src: string): "video" | "gif" | "image" {
  /** Отдаётся через Route Handler (fs + Range) — не зависит от статики Next из public */
  if (src === "/api/hero-background") return "video";
  const ext = src.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "mp4" || ext === "webm" || ext === "ogg") return "video";
  if (ext === "gif") return "gif";
  return "image";
}

function HeroBackdrop({
  src,
  fallbackSrc,
  className,
}: {
  src: string;
  /** Если видео не отдалось (404 и т.д.) — картинка из public */
  fallbackSrc?: string;
  className?: string;
}) {
  const kind = useMemo(() => mediaKind(src), [src]);
  const [videoFailed, setVideoFailed] = useState(false);

  if (kind === "video" && !videoFailed) {
    return (
      <video
        src={src}
        className={cn("absolute inset-0 h-full w-full object-cover object-[50%_32%]", className)}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        onError={() => setVideoFailed(true)}
      />
    );
  }

  const displaySrc =
    kind === "video" && videoFailed && fallbackSrc ? fallbackSrc : kind === "video" && videoFailed ? null : src;
  if (displaySrc === null) {
    return <div className={cn("absolute inset-0 bg-[#14100d]", className)} aria-hidden />;
  }

  const displayKind = mediaKind(displaySrc);
  if (displayKind === "gif") {
    return (
      <img
        src={displaySrc}
        alt=""
        role="presentation"
        className={cn("absolute inset-0 h-full w-full object-cover object-[50%_32%]", className)}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={displaySrc}
      alt=""
      fill
      priority
      quality={100}
      sizes="100vw"
      unoptimized
      className={cn("object-cover object-[50%_32%]", className)}
    />
  );
}

const easeOut = [0.22, 1, 0.36, 1] as const;
/** Медленнее и мягче именно opacity — ощущение «выцветания» из тьмы */
const fadeEase = [0.45, 0, 0.55, 1] as const;

/** Длительности по свойствам — задержки следующих блоков считаем от max(...) + пауза */
const heroReveal = {
  names: { opacity: 2.2, y: 1.5, filter: 1.75 },
  dates: { opacity: 1.85, y: 1.2, filter: 1.55 },
  tagline: { opacity: 2.1, y: 1.4, filter: 1.8 },
  scroll: { opacity: 1.35 },
} as const;

function maxReveal(d: { opacity: number; y?: number; filter?: number }) {
  return Math.max(d.opacity, d.y ?? 0, d.filter ?? 0);
}

const heroTarget = {
  names: { opacity: 1, y: 0, filter: "blur(0px)" },
  dates: { opacity: 1, y: 0, filter: "blur(0px)" },
  tagline: { opacity: 1, y: 0, filter: "blur(0px)" },
  scroll: { opacity: 1 },
} as const;

const heroRest = {
  names: { opacity: 0, y: 28, filter: "blur(14px)" },
  dates: { opacity: 0, y: 18, filter: "blur(8px)" },
  tagline: { opacity: 0, y: 16, filter: "blur(10px)" },
  scroll: { opacity: 0 },
} as const;

/**
 * Порядок появления через таймеры (не через delay у motion):
 * FM12 часто игнорирует корневой delay, если заданы вложенные transition по свойствам.
 */
function useHeroRevealStep(reduceMotion: boolean) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(4);
      return;
    }

    setStep(0);
    const s = 1000;
    const pauseBefore = 0.65 * s;
    const pauseBetween = 0.5 * s;
    const tNames = maxReveal(heroReveal.names) * s;
    const tDates = maxReveal(heroReveal.dates) * s;
    const tTag = maxReveal(heroReveal.tagline) * s;

    const ids = [
      window.setTimeout(() => setStep(1), pauseBefore),
      window.setTimeout(() => setStep(2), pauseBefore + tNames + pauseBetween),
      window.setTimeout(() => setStep(3), pauseBefore + tNames + pauseBetween + tDates + pauseBetween),
      window.setTimeout(
        () => setStep(4),
        pauseBefore + tNames + pauseBetween + tDates + pauseBetween + tTag + pauseBetween * 0.85,
      ),
    ];

    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [reduceMotion]);

  return step;
}

export function CinematicHero({
  className,
  /** По умолчанию `/api/hero-background` — читает `public/videos/hero.mp4` с диска (надёжно в Docker) */
  mediaSrc = "/api/hero-background",
  /** Запасной кадр, если видео недоступно (нет файла в образе, 404) */
  fallbackImageSrc = "/photos/03.png",
}: {
  className?: string;
  mediaSrc?: string;
  fallbackImageSrc?: string;
}) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "6%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, isMobile ? 1.07 : 1.16]);

  const revealStep = useHeroRevealStep(!!reduceMotion);

  return (
    <section
      ref={ref}
      className={cn(
        "relative min-h-[100svh] overflow-hidden flex flex-col justify-end",
        "bg-[#0c0a08]",
        "pt-24 pb-20 sm:pb-24 lg:pt-28 lg:pb-16",
        className,
      )}
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <HeroBackdrop src={mediaSrc} fallbackSrc={fallbackImageSrc} />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(246,239,229,0.10)] via-[rgba(246,239,229,0.03)] to-transparent"
          aria-hidden
        />
      </motion.div>

      <div className="container-editorial relative z-10 flex w-full flex-col items-center text-center">
        <div className="flex w-full max-w-[min(42rem,92vw)] flex-col items-center gap-5 sm:gap-6">
          {/* 1) Имена — расписной шрифт */}
          <motion.div
            initial={heroRest.names}
            animate={revealStep >= 1 ? heroTarget.names : heroRest.names}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : {
                    opacity: { duration: heroReveal.names.opacity, ease: fadeEase },
                    y: { duration: heroReveal.names.y, ease: easeOut },
                    filter: { duration: heroReveal.names.filter, ease: easeOut },
                  }
            }
            className="flex flex-col items-center"
          >
            <p className="font-script text-[clamp(58px,19vw,148px)] leading-[1.02] text-[rgba(250,246,239,0.98)] [text-shadow:0_10px_40px_rgba(0,0,0,0.5)]">
              Давид
            </p>
            <span className="font-script block leading-none text-[clamp(34px,11vw,88px)] text-[rgba(250,246,239,0.92)] [text-shadow:0_10px_40px_rgba(0,0,0,0.5)]">
              {"&"}
            </span>
            <p className="font-script text-[clamp(58px,19vw,148px)] leading-[1.02] text-[rgba(250,246,239,0.98)] [text-shadow:0_10px_40px_rgba(0,0,0,0.5)]">
              Настя
            </p>
          </motion.div>

          <motion.div
            initial={heroRest.dates}
            animate={revealStep >= 2 ? heroTarget.dates : heroRest.dates}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : {
                    opacity: { duration: heroReveal.dates.opacity, ease: fadeEase },
                    y: { duration: heroReveal.dates.y, ease: easeOut },
                    filter: { duration: heroReveal.dates.filter, ease: easeOut },
                  }
            }
          >
            <p className="hairline text-[13px] sm:text-[14px] tracking-[0.12em] text-[rgba(250,246,239,0.88)]">
              8–10 июля 2026
            </p>
          </motion.div>

          <motion.div
            initial={heroRest.tagline}
            animate={revealStep >= 3 ? heroTarget.tagline : heroRest.tagline}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : {
                    opacity: { duration: heroReveal.tagline.opacity, ease: fadeEase },
                    y: { duration: heroReveal.tagline.y, ease: easeOut },
                    filter: { duration: heroReveal.tagline.filter, ease: easeOut },
                  }
            }
          >
            <p className="serif text-[clamp(26px,5.5vw,52px)] leading-[1.15] tracking-[-0.03em] text-[rgba(250,246,239,0.95)] [text-shadow:0_8px_32px_rgba(0,0,0,0.45)]">
              Свет, который не погаснет
            </p>
          </motion.div>

        </div>

        <motion.div
          initial={heroRest.scroll}
          animate={revealStep >= 4 ? heroTarget.scroll : heroRest.scroll}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { opacity: { duration: heroReveal.scroll.opacity, ease: fadeEase } }
          }
          className="mt-12 flex items-center justify-center gap-3 pb-2 text-[12px] text-[rgba(250,246,239,0.75)]"
        >
          <span className="hairline">Scroll</span>
          <span className="relative h-[30px] w-[18px] rounded-full soft-border">
            <motion.span
              className="absolute left-1/2 top-[6px] h-[6px] w-[2px] -translate-x-1/2 rounded-full bg-[rgba(242,182,109,0.65)]"
              animate={{ y: [0, 12, 0], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1], repeat: Infinity }}
            />
          </span>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute right-[-120px] bottom-[-140px] h-[320px] w-[320px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(242,182,109,0.16), transparent 60%)",
          filter: "blur(0.2px)",
        }}
        animate={{ opacity: [0.4, 0.65, 0.4], y: [0, -10, 0] }}
        transition={{ duration: 9, ease: [0.4, 0, 0.2, 1], repeat: Infinity }}
      />
    </section>
  );
}
