"use client";

import { Reveal } from "@/components/motion/Reveal";

const items = [
  { t: "15:30", label: "Сбор гостей" },
  { t: "16:00", label: "Церемония" },
  { t: "17:00", label: "Праздничный ужин" },
  { t: "19:00", label: "Танцы и поздравления" },
  { t: "22:00", label: "Финальная часть вечера" },
];

export function Timeline() {
  return (
    <div className="mt-10">
      <Reveal>
        <p className="hairline text-[12px] text-[rgba(250,246,239,0.82)]">Тайминг</p>
      </Reveal>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <Reveal delay={0.08}>
            <p className="serif text-[clamp(18px,2.1vw,28px)] leading-[1.35] text-[rgba(250,246,239,0.92)]">
              Как в хорошей сцене:
              <br />
              без спешки, с паузами, со светом.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-[linear-gradient(to_bottom,rgba(242,182,109,0.0),rgba(242,182,109,0.35),rgba(246,239,229,0.10),rgba(242,182,109,0.0))]" />

            <div className="flex flex-col gap-5">
              {items.map((it, idx) => (
                <Reveal key={it.t} delay={0.06 + idx * 0.04}>
                  <div className="relative rounded-[18px] glass px-5 py-4">
                    <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[rgba(242,182,109,0.65)] shadow-[0_0_24px_rgba(242,182,109,0.35)]" />
                    <div className="grid grid-cols-12 gap-3 items-baseline">
                      <p className="col-span-4 md:col-span-3 serif text-[20px] tracking-[-0.04em] text-[rgba(246,239,229,0.92)]">
                        {it.t}
                      </p>
                      <p className="col-span-8 md:col-span-9 text-[14px] leading-[1.7] text-[rgba(250,246,239,0.88)]">
                        {it.label}
                      </p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-700 [background:radial-gradient(260px_120px_at_20%_30%,rgba(242,182,109,0.10),transparent_70%)] hover:opacity-100" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

