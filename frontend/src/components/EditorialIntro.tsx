"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionFrame } from "@/components/SectionFrame";

export function EditorialIntro() {
  return (
    <SectionFrame tone="warm" padding="md" className="py-16 sm:py-20 lg:py-28">
      <div className="container-editorial">
        <div className="relative z-10 mx-auto max-w-[min(40rem,92vw)] text-center">
          <Reveal>
            <h2 className="font-script text-[clamp(32px,7vw,70px)] leading-[1.05] text-[rgba(250,246,239,0.98)] [text-shadow:0_8px_36px_rgba(0,0,0,0.35)]">
              Дорогие гости!
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="serif mt-10 text-[clamp(17px,2.4vw,22px)] leading-[1.85] tracking-[-0.02em] text-[rgba(250,246,239,0.9)]">
              В нашей жизни состоится торжественное и знаменательное событие. Мы хотим соединить наши судьбы и
              наши сердца, и нам будет очень приятно разделить с вами этот счастливый момент.
            </p>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
