"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { SectionFrame } from "@/components/SectionFrame";

type Attendance = "yes" | "no" | "maybe";
type MealChoice = "" | "meat" | "fish";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

function Segment<T extends string>({
  value,
  setValue,
  options,
}: {
  value: T;
  setValue: (v: T) => void;
  options: { v: T; label: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-[18px] glass p-2">
      {options.map((o) => {
        const active = o.v === value;
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => setValue(o.v)}
            className={cn(
              "rounded-[14px] px-3 py-3 text-[13px] transition",
              "flex items-center justify-center text-center leading-[1.1]",
              "outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,182,109,0.35)]",
              active
                ? "bg-[rgba(246,239,229,0.10)] text-[rgba(246,239,229,0.92)] shadow-[0_0_0_1px_rgba(246,239,229,0.18)]"
                : "text-[rgba(250,246,239,0.78)] hover:text-[rgba(250,246,239,0.92)]",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <p className="hairline text-[11px] text-[rgba(250,246,239,0.82)]">{label}</p>
        {hint ? <p className="text-[11px] text-[rgba(250,246,239,0.65)]">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function RsvpForm() {
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("yes");
  const [day1, setDay1] = useState(false);
  const [day2, setDay2] = useState(true);
  const [day3, setDay3] = useState(false);
  const [needsTransfer, setNeedsTransfer] = useState(false);
  const [mealChoice, setMealChoice] = useState<MealChoice>("");
  const [allergies, setAllergies] = useState("");
  const [comment, setComment] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const canPickMeal = attendance === "yes";

  const payload = useMemo(
    () => ({
      fullName,
      attendance,
      days: { day1, day2, day3 },
      needsTransfer,
      mealChoice: canPickMeal ? mealChoice : "",
      allergies,
      comment,
    }),
    [allergies, attendance, canPickMeal, comment, day1, day2, day3, fullName, mealChoice, needsTransfer],
  );

  async function submit() {
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/api/rsvp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { ok: boolean };
      setStatus(data.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionFrame id="rsvp" tone="warm" padding="lg">
      <div className="container-editorial">
        <Reveal>
          <p className="hairline text-[12px] text-[rgba(250,246,239,0.82)]">RSVP</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="serif mt-6 text-[clamp(30px,3.5vw,56px)] leading-[1.02] tracking-[-0.05em] text-[rgba(250,246,239,0.96)]">
            Ответ — как тихая сцена.
            <br />
            Пожалуйста, заполните форму.
          </h2>
        </Reveal>

        <div className="mt-8 sm:mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-[28px] glass p-6 lg:p-8">
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12">
                    <Field label="ФИО" hint="Как в списке гостей">
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={cn(
                          "w-full rounded-[18px] px-4 py-4 text-[14px]",
                          "bg-[rgba(16,13,10,0.35)] soft-border",
                          "outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,182,109,0.35)]",
                          "placeholder:text-[rgba(246,239,229,0.35)]",
                        )}
                        placeholder="Имя Фамилия"
                      />
                    </Field>
                  </div>

                  <div className="col-span-12">
                    <Field label="Придёте ли вы?">
                      <Segment<Attendance>
                        value={attendance}
                        setValue={setAttendance}
                        options={[
                          { v: "yes", label: "Приду" },
                          { v: "maybe", label: "Не уверен(а)" },
                          { v: "no", label: "Не смогу" },
                        ]}
                      />
                    </Field>
                  </div>

                  <div className="col-span-12">
                    <Field label="Какие дни посетите?">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { on: day1, set: setDay1, label: "8 июля" },
                          { on: day2, set: setDay2, label: "9 июля" },
                          { on: day3, set: setDay3, label: "10 июля" },
                        ].map((x) => (
                          <button
                            key={x.label}
                            type="button"
                            onClick={() => x.set(!x.on)}
                            className={cn(
                              "rounded-[18px] px-3 py-4 text-[13px] transition glass",
                              "flex items-center justify-center text-center leading-[1.1]",
                              x.on
                                ? "shadow-[0_0_0_1px_rgba(242,182,109,0.30)] text-[rgba(246,239,229,0.90)]"
                                : "text-[rgba(250,246,239,0.78)] hover:text-[rgba(250,246,239,0.92)]",
                            )}
                          >
                            {x.label}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <Field label="Нужен ли трансфер?">
                      <div className="grid grid-cols-2 gap-2 rounded-[18px] glass p-2">
                        {[
                          { v: false, label: "Нет" },
                          { v: true, label: "Да" },
                        ].map((o) => {
                          const active = o.v === needsTransfer;
                          return (
                            <button
                              key={o.label}
                              type="button"
                              onClick={() => setNeedsTransfer(o.v)}
                              className={cn(
                                "rounded-[14px] px-3 py-3 text-[13px] transition",
                                "flex items-center justify-center text-center leading-[1.1]",
                                active
                                  ? "bg-[rgba(246,239,229,0.10)] text-[rgba(246,239,229,0.92)] shadow-[0_0_0_1px_rgba(246,239,229,0.18)]"
                                  : "text-[rgba(250,246,239,0.78)] hover:text-[rgba(250,246,239,0.92)]",
                              )}
                            >
                              {o.label}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <Field label="Выбор блюда" hint={canPickMeal ? "Для основного дня" : "Не требуется"}>
                      <div className={cn("grid grid-cols-2 gap-2 rounded-[18px] glass p-2", !canPickMeal && "opacity-50")}>
                        {[
                          { v: "meat" as const, label: "Мясо" },
                          { v: "fish" as const, label: "Рыба" },
                        ].map((o) => {
                          const active = o.v === mealChoice;
                          return (
                            <button
                              key={o.v}
                              type="button"
                              disabled={!canPickMeal}
                              onClick={() => setMealChoice(o.v)}
                              className={cn(
                                "rounded-[14px] px-3 py-3 text-[13px] transition",
                                "flex items-center justify-center text-center leading-[1.1]",
                                "disabled:cursor-not-allowed",
                                active
                                  ? "bg-[rgba(246,239,229,0.10)] text-[rgba(246,239,229,0.92)] shadow-[0_0_0_1px_rgba(246,239,229,0.18)]"
                                  : "text-[rgba(250,246,239,0.78)] hover:text-[rgba(250,246,239,0.92)]",
                              )}
                            >
                              {o.label}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  </div>

                  <div className="col-span-12">
                    <Field label="Аллергии / ограничения">
                      <textarea
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        rows={3}
                        className={cn(
                          "w-full rounded-[18px] px-4 py-4 text-[14px] resize-none",
                          "bg-[rgba(16,13,10,0.35)] soft-border",
                          "outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,182,109,0.35)]",
                          "placeholder:text-[rgba(246,239,229,0.35)]",
                        )}
                        placeholder="Если есть — напишите"
                      />
                    </Field>
                  </div>

                  <div className="col-span-12">
                    <Field label="Комментарий">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className={cn(
                          "w-full rounded-[18px] px-4 py-4 text-[14px] resize-none",
                          "bg-[rgba(16,13,10,0.35)] soft-border",
                          "outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,182,109,0.35)]",
                          "placeholder:text-[rgba(246,239,229,0.35)]",
                        )}
                        placeholder="Любая деталь, которая поможет нам всё сделать красиво"
                      />
                    </Field>
                  </div>

                  <div className="col-span-12 flex flex-col md:flex-row items-start md:items-center gap-4 md:justify-between pt-2">
                    <button
                      type="button"
                      onClick={submit}
                      disabled={status === "sending" || !fullName.trim()}
                      className={cn(
                        "rounded-full px-6 py-4 text-[13px] hairline",
                        "bg-[rgba(242,182,109,0.18)] hover:bg-[rgba(242,182,109,0.22)]",
                        "soft-border shadow-[0_0_30px_rgba(242,182,109,0.16)]",
                        "transition disabled:opacity-50 disabled:cursor-not-allowed",
                        "outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,182,109,0.35)]",
                      )}
                    >
                      {status === "sending" ? "Отправляем…" : "Отправить ответ"}
                    </button>

                    <p className="text-[12px] text-[rgba(250,246,239,0.78)]">
                      {status === "ok"
                        ? "Спасибо. Мы получили ваш ответ."
                        : status === "error"
                          ? "Не удалось отправить. Попробуйте ещё раз."
                          : " "}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={0.14}>
              <div className="rounded-[28px] glass p-6 lg:p-8">
                <p className="hairline text-[11px] text-[rgba(250,246,239,0.82)]">Сюрпризы</p>
                <p className="mt-5 text-[14px] leading-[1.9] text-[rgba(250,246,239,0.88)]">
                  Если вы планируете поздравление, выступление или сюрприз, пожалуйста, заранее
                  свяжитесь с организатором, чтобы мы красиво вписали это в программу вечера.
                </p>
                <div className="mt-7 rounded-[20px] bg-[rgba(16,13,10,0.35)] soft-border p-5">
                  <p className="hairline text-[11px] text-[rgba(250,246,239,0.82)]">Контакт</p>
                  <p className="mt-2 text-[14px] text-[rgba(250,246,239,0.92)]">[Имя]</p>
                  <p className="mt-1 text-[13px] text-[rgba(250,246,239,0.8)]">
                    [Телефон / Telegram]
                  </p>
                </div>

                <div className="mt-10">
                  <p className="hairline text-[11px] text-[rgba(250,246,239,0.82)]">Тишина</p>
                  <p className="mt-2 serif text-[18px] leading-[1.55] text-[rgba(250,246,239,0.9)]">
                    Мы очень ценим камерность.
                    <br />
                    Спасибо, что вы — часть этой истории.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

