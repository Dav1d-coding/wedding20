"use client";

import { useEffect, useState } from "react";

import { SparkParticles } from "@/components/SparkParticles";
import { cn } from "@/lib/cn";

export function AfterHeroParticles({ count = 18 }: { count?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const afterHero = document.querySelector(".after-hero-shell");

      if (!afterHero) {
        setVisible(false);
        return;
      }

      const rect = afterHero.getBoundingClientRect();

      /**
       * Показываем шарики, когда блок после hero уже дошёл до viewport,
       * и скрываем, если пользователь ушёл выше hero.
       */
      const isAfterHeroVisible = rect.top <= window.innerHeight && rect.bottom > 0;

      setVisible(isAfterHeroVisible);
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed-particles-layer",
        visible ? "fixed-particles-layer--visible" : "fixed-particles-layer--hidden",
      )}
      aria-hidden
    >
      <SparkParticles count={count} />
    </div>
  );
}