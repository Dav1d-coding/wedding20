"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionFrame, type SectionTone } from "@/components/SectionFrame";

type DayBlockTheme = "light" | "dark";

type Swatch = {
  name: string;
  color: string;
  note?: string;
};

const swatches: Swatch[] = [
  { name: "Желтый", color: "#e1e294" },
  { name: "Бежевый", color: "#C9AD8A" },
  { name: "Золотой", color: "#d3af37" },
  { name: "Коричневый", color: "#5A3F2B" },
  { name: "Зелёный", color: "#627a4c" },
  { name: "Серый", color: "#626460" },
  { name: "Чёрный", color: "#050505", note: "только для мужчин" },
];

type DayBlockProps = {
  label: string;
  title?: string;
  date?: string;
  text?: string;

  venueName?: string;
  time?: string;

  latitude?: string;
  longitude?: string;
  mapZoom?: number;

  transferNote?: string;

  organizerName?: string;
  organizerPhone?: string;
  organizerPhoneHref?: string;

  /**
   * light — светлая полупрозрачная карточка
   * dark — тёмная полупрозрачная карточка
   */
  theme?: DayBlockTheme;

  /**
   * Показывать ли dress code внутри блока основного дня.
   */
  showDressCode?: boolean;

  tone?: SectionTone;

  /**
   * Оставлены для совместимости со старым вызовом DayBlock.
   * Сейчас внутри компонента не используются.
   */
  details?: { k: string; v: string }[];
  venueThumbnailSrc?: string;
  photoSrc?: string;
  reversed?: boolean;
};

function getThemeClasses(theme: DayBlockTheme) {
  if (theme === "dark") {
    return {
      shell:
        "bg-[rgba(16,13,10,0.74)] text-[rgba(250,246,239,0.96)] shadow-[0_26px_90px_rgba(0,0,0,0.42)] backdrop-blur-[18px]",
      mutedText: "text-[rgba(250,246,239,0.56)]",
      mainText: "text-[rgba(250,246,239,0.92)]",
      softText: "text-[rgba(250,246,239,0.74)]",
      title: "text-[rgba(250,246,239,0.98)]",
      date: "text-[rgba(246,239,229,0.86)]",
      infoCard:
        "bg-[rgba(246,239,229,0.075)] shadow-[0_0_0_1px_rgba(246,239,229,0.10)] backdrop-blur-[14px]",
      innerCard:
        "bg-[rgba(246,239,229,0.07)] shadow-[0_0_0_1px_rgba(246,239,229,0.08)]",
      divider: "bg-[rgba(246,239,229,0.12)]",
      button:
        "bg-[rgba(246,239,229,0.12)] text-[rgba(250,246,239,0.94)] hover:bg-[rgba(246,239,229,0.18)]",
    };
  }

  return {
    shell:
      "bg-[rgba(246,239,229,0.86)] text-[#1A1410] shadow-[0_26px_90px_rgba(0,0,0,0.34)] backdrop-blur-[16px] rounded-t-[80px] rounded-b-[80px] sm:rounded-t-[110px] sm:rounded-b-[110px] lg:rounded-t-[140px] lg:rounded-b-[140px] overflow-hidden",
    mutedText: "text-[rgba(26,20,16,0.52)]",
    mainText: "text-[rgba(26,20,16,0.84)]",
    softText: "text-[rgba(26,20,16,0.72)]",
    title: "text-[#1A1410]",
    date: "text-[rgba(26,20,16,0.82)]",
    infoCard:
      "bg-[rgba(26,20,16,0.045)] shadow-[0_0_0_1px_rgba(26,20,16,0.08)] backdrop-blur-[10px]",
    innerCard:
      "bg-[rgba(26,20,16,0.06)] shadow-[0_0_0_1px_rgba(26,20,16,0.08)]",
    divider: "bg-[rgba(26,20,16,0.12)]",
    button:
      "bg-[rgba(26,20,16,0.08)] text-[#1A1410] hover:bg-[rgba(26,20,16,0.13)]",
  };
}

export function DayBlock({
  label,
  title = "Основной день торжества",
  date = "09.07.2026",
  text = "",

  venueName,
  time,

  latitude,
  longitude,
  mapZoom = 16,

  transferNote,

  organizerName,
  organizerPhone,
  organizerPhoneHref,

  theme = "light",
  showDressCode = false,

  tone = "warm",
}: DayBlockProps) {
  const t = getThemeClasses(theme);

  const hasVenue = Boolean(venueName?.trim());
  const hasTime = Boolean(time?.trim());
  const hasMap = Boolean(latitude?.trim() && longitude?.trim());
  const hasTransferNote = Boolean(transferNote?.trim());
  const hasOrganizer = Boolean(organizerName?.trim() || organizerPhone?.trim());

  const hasInfoBlock = hasVenue || hasTime || hasMap || hasTransferNote || hasOrganizer;

  const yandexMapsUrl = hasMap
    ? `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=${mapZoom}&pt=${longitude},${latitude},pm2rdm`
    : "";

  const yandexMapWidgetUrl = hasMap
    ? `https://yandex.ru/map-widget/v1/?ll=${longitude}%2C${latitude}&z=${mapZoom}&pt=${longitude},${latitude},pm2rdm`
    : "";

  const phoneHref = organizerPhoneHref || organizerPhone?.replace(/[^\d+]/g, "") || "";

  return (
    <SectionFrame tone={tone} padding="md" className="px-0">
      <div className="w-full">
        <Reveal>
          <div className={`w-full ${t.shell}`}>
            <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
              <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
                <p className={`hairline text-[11px] ${t.mutedText}`}>{label}</p>

                <h3
                  className={`font-script mt-5 text-center text-[clamp(34px,7vw,74px)] leading-[1.05] ${t.title}`}
                >
                  {title}
                </h3>

                {date ? (
                  <p
                    className={`serif mt-6 text-center text-[clamp(24px,4.8vw,44px)] leading-none tracking-[0.08em] ${t.date}`}
                  >
                    {date}
                  </p>
                ) : null}

                {text ? (
                  <p
                    className={`mt-7 max-w-[64ch] whitespace-pre-line text-center text-[15px] leading-[1.9] ${t.softText}`}
                  >
                    {text}
                  </p>
                ) : null}
              </div>

              {hasInfoBlock ? (
                <div
                  className={`mx-auto mt-10 max-w-[860px] rounded-[30px] px-5 py-6 text-center sm:px-7 sm:py-8 lg:mt-12 lg:px-9 lg:py-10 ${t.infoCard}`}
                >
                  <div className="grid grid-cols-12 gap-6">
                    {hasVenue ? (
                      <div className="col-span-12 md:col-span-6">
                        <p className={`hairline text-[11px] ${t.mutedText}`}>Место</p>
                        <p className={`mt-1 text-[15px] leading-[1.65] sm:text-[16px] ${t.mainText}`}>
                          {venueName}
                        </p>
                      </div>
                    ) : null}

                    {hasTime ? (
                      <div className="col-span-12 md:col-span-6">
                        <p className={`hairline text-[11px] ${t.mutedText}`}>Время</p>
                        <p className={`mt-1 serif text-[24px] tracking-[-0.03em] sm:text-[28px] ${t.title}`}>
                          {time}
                        </p>
                      </div>
                    ) : null}

                    {hasMap ? (
                      <div className="col-span-12">
                        <p className={`hairline text-[11px] ${t.mutedText}`}>Локация</p>

                        {venueName ? (
                          <p className={`mt-1 text-[14px] leading-[1.65] sm:text-[15px] ${t.softText}`}>
                            {venueName}
                          </p>
                        ) : null}

                        <div className={`mt-4 overflow-hidden rounded-[22px] ${t.innerCard}`}>
                          <iframe
                            src={yandexMapWidgetUrl}
                            title={`${venueName || "Локация"} на Яндекс Картах`}
                            className="h-[220px] w-full border-0 sm:h-[280px]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>

                        <div className="flex justify-center">
                          <a
                            href={yandexMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-4 inline-flex items-center justify-center rounded-full px-5 py-3 text-[12px] hairline transition ${t.button}`}
                          >
                            Открыть в Яндекс Картах
                          </a>
                        </div>
                      </div>
                    ) : null}

                    {(hasMap && (hasTransferNote || hasOrganizer)) ||
                      (hasTransferNote && hasOrganizer) ? (
                      <div className="col-span-12">
                        <div className={`h-px w-full ${t.divider}`} />
                      </div>
                    ) : null}

                    {hasTransferNote ? (
                      <div className="col-span-12">
                        <p className={`hairline text-[11px] ${t.mutedText}`}>Примечание</p>
                        <p className={`mt-1 text-[14px] leading-[1.75] sm:text-[15px] ${t.softText}`}>
                          {transferNote}
                        </p>
                      </div>
                    ) : null}

                    {hasOrganizer ? (
                      <div className="col-span-12">
                        <div className={`rounded-[22px] px-5 py-5 text-center ${t.innerCard}`}>
                          <p className={`hairline text-[11px] ${t.mutedText}`}>Контакт организатора</p>

                          {organizerName ? (
                            <p className={`mt-2 serif text-[24px] leading-[1.15] tracking-[-0.04em] ${t.title}`}>
                              {organizerName}
                            </p>
                          ) : null}

                          {organizerPhone ? (
                            <a
                              href={phoneHref ? `tel:${phoneHref}` : undefined}
                              className={`mt-2 inline-block text-[15px] underline underline-offset-4 transition ${t.softText}`}
                            >
                              {organizerPhone}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {showDressCode ? (
                <div
                  className={`mx-auto mt-10 max-w-[980px] rounded-[30px] px-5 py-6 text-center sm:px-7 sm:py-8 lg:mt-12 lg:px-9 lg:py-10 ${t.infoCard}`}
                >
                  <p className={`hairline text-[11px] ${t.mutedText}`}>Dress code</p>

                  <p className={`mx-auto mt-5 max-w-[62ch] serif text-[clamp(18px,2.1vw,28px)] leading-[1.4] ${t.mainText}`}>
                    Мы будем рады, если в образах вы поддержите тёплую, природную и элегантную палитру вечера.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
                    {swatches.map((s) => (
                      <div
                        key={s.name}
                        className={`overflow-hidden rounded-[18px] ${t.innerCard}`}
                      >
                        <div
                          className="h-14"
                          style={{
                            background: `${s.color}`
                          }}
                        />

                        <div className="flex min-h-[66px] items-start justify-between gap-2 px-3 py-3 text-left">
                          <div>
                            <p className={`text-[12px] ${t.mainText}`}>{s.name}</p>

                            {s.note ? (
                              <p className={`mt-1 text-[10px] leading-[1.25] ${t.mutedText}`}>
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
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}