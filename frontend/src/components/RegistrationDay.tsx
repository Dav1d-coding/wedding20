"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionFrame } from "@/components/SectionFrame";

const DETAILS: { k: string; v: string }[] = [
  { k: "Место", v: "Центр семьи Казан. «Чаша»" },
  { k: "Время", v: "14:30" },
  {
    k: "Примечание",
    v: "Пожалуйста, прибудьте за полчаса до начала — так мы сможем встретить вас без спешки и в полном порядке.",
  },
];

export function RegistrationDay() {
  return (
    <SectionFrame tone="deep" padding="md">
      <div className="container-editorial">
        <div className="mx-auto flex max-w-[min(36rem,94vw)] flex-col items-center text-center">
          <Reveal>
            <h2 className="font-script text-[clamp(38px,9vw,92px)] leading-[1.04] text-[rgba(250,246,239,0.98)] [text-shadow:0_8px_36px_rgba(0,0,0,0.35)]">
              День регистрации!
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="serif mt-8 text-[clamp(32px,6.5vw,64px)] leading-none tracking-[0.12em] text-[rgba(246,239,229,0.95)]">
              08.06.2026
            </p>
          </Reveal>

          {/* Без Reveal: до inView motion оставлял opacity 0 — казалось «не рисуется». Обычный img — без fill/next-image */}
          <div className="registration-bowl-frame mx-auto mt-12 flex h-[40vh] w-full max-w-[min(92vw,560px)] min-h-[180px] items-center justify-center bg-transparent">
            <img
              src="/photos/bowl.svg"
              alt=""
              width={960}
              height={960}
              className="registration-bowl max-h-full max-w-full object-contain object-center"
              loading="eager"
              decoding="async"
            />
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 w-full max-w-xl rounded-[22px] glass px-6 py-6 text-center">
              <div className="space-y-5">
                {DETAILS.map((row) => (
                  <div key={row.k}>
                    <p className="hairline text-[11px] text-[rgba(250,246,239,0.78)]">{row.k}</p>
                    {row.k === "Время" ? (
                      <p className="mt-1 serif text-[22px] tracking-[-0.03em] text-[rgba(246,239,229,0.94)] sm:text-[24px]">
                        {row.v}
                      </p>
                    ) : (
                      <p className="mt-1 text-[14px] leading-[1.65] text-[rgba(250,246,239,0.9)] sm:text-[15px]">
                        {row.v}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
