import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Свадебное приглашение",
  description: "И мы будем идти на свет, который не погаснет",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overscroll-y-none">
        <div className="page-shell flex min-h-full flex-1 flex-col">
          {/* Фоновые слои живут в контейнерах страниц/секций (например .after-hero-shell). */}
          <div className="relative z-[50] flex min-h-0 flex-1 flex-col">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
