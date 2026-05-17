"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";

const swatches = [
  { name: "Желтый", color: "#e1e294" },
  { name: "Бежевый", color: "#C9AD8A" },
  { name: "Золотой", color: "#d3af37" },
  { name: "Коричневый", color: "#5A3F2B" },
  { name: "Зелёный", color: "#627a4c" },
  { name: "Серый", color: "#626460" },
  { name: "Чёрный", color: "#050505", note: "только для мужчин" },
];

export function DressCode() {
  return (
    <div className="mt-14 rounded-[26px] glass p-6 lg:p-8 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.9]">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(242,182,109,0.10)] blur-[2px] soft-float" />
        <div className="absolute -bottom-28 right-[-60px] h-80 w-80 rounded-full bg-[rgba(246,239,229,0.07)] blur-[2px] soft-float" />
      </div>
      <Reveal>
        <p className="hairline text-[12px] text-[rgba(250,246,239,0.82)]">Dress code</p>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-5 serif text-[clamp(18px,2.1vw,28px)] leading-[1.4] text-[rgba(250,246,239,0.92)]">
          Мы будем рады, если в образах вы поддержите светлую, нежную и элегантную палитру вечера.
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
          {swatches.map((s) => (
            <motion.div
              key={s.name}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-[18px] soft-border overflow-hidden"
              style={{
                boxShadow: "0 0 0 1px rgba(246,239,229,0.10), 0 0 34px rgba(242,182,109,0.06)",
              }}
            >
              <div
                className="h-14"
                style={{
                  background: `${s.color}`,
                }}
              />
              <div className="px-3 py-3 flex min-h-[62px] items-start justify-between gap-2">
                <div>
                  <p className="text-[12px] text-[rgba(250,246,239,0.86)]">{s.name}</p>

                  {"note" in s && s.note ? (
                    <p className="mt-1 text-[10px] leading-[1.25] text-[rgba(250,246,239,0.58)]">
                      {s.note}
                    </p>
                  ) : null}
                </div>

                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: s.color,
                    boxShadow: "0 0 18px rgba(242,182,109,0.10)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

