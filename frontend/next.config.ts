import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Корректная self-host отдача статики (public/, в т.ч. видео) в Docker — см. Dockerfile */
  output: "standalone",
  /** Без sharp в Alpine: иначе next/image для /public/* в проде может не отдаваться */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
