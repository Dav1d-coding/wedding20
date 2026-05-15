"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    const prevOverscroll = html.style.overscrollBehaviorY;
    html.style.overscrollBehaviorY = "none";

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      html.style.overscrollBehaviorY = prevOverscroll;
    };
  }, []);

  return children;
}

