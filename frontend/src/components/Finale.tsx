"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { SectionFrame } from "@/components/SectionFrame";

export function Finale({ photoSrc = "/photos/05.jpg" }: { photoSrc?: string }) {
  return (
    <SectionFrame tone="deep" padding="lg" className="relative min-h-[70svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={photoSrc}
          alt=""
          fill
          quality={100}
          sizes="100vw"
          unoptimized
          className="object-cover object-[50%_35%]"
        />
      </div>

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <h2 className="serif text-[clamp(30px,3.6vw,64px)] leading-[1.03] tracking-[-0.05em] text-[rgba(250,246,239,0.96)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                Спасибо, что будете рядом с нами.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-[15px] leading-[1.95] text-[rgba(250,246,239,0.92)] max-w-[70ch] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                Ваша любовь, тепло и присутствие сделают эти дни по-настоящему светлыми.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-10 serif text-[clamp(20px,2.4vw,34px)] leading-[1.35] text-[rgba(250,246,239,0.95)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                До встречи на нашем празднике
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
                <a
                  href="https://vk.me/join/XMJPD_ouVAD9tSXuevQnY8SEdaUYRFrPQq8="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-4 text-[13px] hairline transition
                  bg-[rgba(246,239,229,0.14)] hover:bg-[rgba(246,239,229,0.18)] soft-border
                  shadow-[0_0_26px_rgba(246,239,229,0.12)]
                  text-[rgba(250,246,239,0.95)]
                  outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,182,109,0.45)]"
                >
                  Чат-группа VK
                </a>
                <p className="text-[12px] text-[rgba(250,246,239,0.8)] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  Для организационных деталей и быстрых обновлений.
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
