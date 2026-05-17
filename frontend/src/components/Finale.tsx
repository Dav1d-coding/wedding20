"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionFrame } from "@/components/SectionFrame";

type FinaleProps = {
  photos?: string[];
  vkUrl?: string;
  intervalMs?: number;
};

const defaultPhotos = [
  "/photos/01.png",
  "/photos/02.png",
  "/photos/03.png",
  "/photos/04.png",
];

export function Finale({
  photos = defaultPhotos,
  vkUrl = "https://vk.me/join/XMJPD_ouVAD9tSXuevQnY8SEdaUYRFrPQq8=",
  intervalMs = 4200,
}: FinaleProps) {
  const slides = useMemo(() => photos.filter(Boolean), [photos]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  const activePhoto = slides[active] ?? defaultPhotos[0];

  return (
    <SectionFrame tone="deep" padding="lg" className="relative overflow-hidden">
      <div className="container-editorial relative z-10">
        <div className="mx-auto max-w-[980px]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] glass shadow-[0_28px_100px_rgba(0,0,0,0.38)]">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhoto}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.035, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.025, filter: "blur(8px)" }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={activePhoto}
                      alt=""
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 92vw, 980px"
                      unoptimized
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(16,13,10,0.42)] via-transparent to-[rgba(16,13,10,0.08)]"
                  aria-hidden
                />

                {slides.length > 1 ? (
                  <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                    {slides.map((src, index) => (
                      <button
                        key={`${src}-${index}`}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`Показать фото ${index + 1}`}
                        className={[
                          "h-2 rounded-full transition-all duration-500",
                          index === active
                            ? "w-8 bg-[rgba(246,239,229,0.9)]"
                            : "w-2 bg-[rgba(246,239,229,0.42)] hover:bg-[rgba(246,239,229,0.7)]",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-[760px] text-center sm:mt-14">
            <Reveal delay={0.08}>
              <h2 className="serif text-[clamp(30px,3.6vw,58px)] leading-[1.04] tracking-[-0.05em] text-[rgba(250,246,239,0.96)]">
                Спасибо, что будете рядом с нами.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-7 max-w-[62ch] text-[15px] leading-[1.95] text-[rgba(250,246,239,0.86)]">
                Ваша любовь, тепло и присутствие сделают эти дни по-настоящему светлыми.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-9 serif text-[clamp(20px,2.4vw,32px)] leading-[1.35] text-[rgba(250,246,239,0.94)]">
                До встречи на нашем празднике
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-col items-center gap-4">
                <a
                  href={vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-[360px] items-center justify-center rounded-full bg-[rgba(246,239,229,0.14)] px-6 py-4 text-[13px] hairline text-[rgba(250,246,239,0.95)] shadow-[0_0_26px_rgba(246,239,229,0.12)] transition hover:bg-[rgba(246,239,229,0.18)] soft-border outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,182,109,0.45)]"
                >
                  Перейти в группу VK
                </a>

                <p className="max-w-[360px] text-[12px] leading-[1.65] text-[rgba(250,246,239,0.72)]">
                  Там будут организационные детали, быстрые обновления и вся важная информация по празднику.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[220px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          background:
            "radial-gradient(600px 200px at 50% 100%, rgba(246,239,229,0.14), transparent 65%), radial-gradient(700px 260px at 50% 100%, rgba(242,182,109,0.12), transparent 70%)",
        }}
      />
    </SectionFrame>
  );
}