"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";

const swatches = [
  { name: "Ivory", color: "#F6EFE5" },
  { name: "Champagne", color: "#E8D6BD" },
  { name: "Beige", color: "#C9AD8A" },
  { name: "Soft gold", color: "#B9915A" },
  { name: "Muted brown", color: "#5A3F2B" },
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
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10">
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
                  background: `linear-gradient(180deg, ${s.color} 0%, rgba(16,13,10,0.12) 120%)`,
                }}
              />
              <div className="px-3 py-3 flex items-center justify-between">
                <p className="text-[12px] text-[rgba(250,246,239,0.86)]">{s.name}</p>
                <span
                  className="h-2.5 w-2.5 rounded-full"
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

