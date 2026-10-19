"use client";

import Image from "next/image";

import { useState, useEffect, useMemo } from "react";
import { BRAND, services, barbers, TIME_SLOTS, peso, hash, isSlotTaken, dateKeyOf, MONTHS, DOW, prettyDate, servicePrice } from "../data";
import type { Variant, Service, Barber } from "../data";
import { Glyph, BarberPhoto, Check, Arrow, BrushBadge, Logo, Field } from "./ui";

export const STEPS = ["SERVICE", "BARBER", "DATE & TIME", "YOUR DETAILS"];

export function BookingModal({
  initialServiceId,
  onClose,
}: {
  initialServiceId?: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(initialServiceId ?? "");
  const [variantIdx, setVariantIdx] = useState(0);
  const [barberId, setBarberId] = useState("");
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", fb: "" });
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const svc = services.find((s) => s.id === serviceId);
  const barber = barbers.find((b) => b.id === barberId);
  const todayKey = dateKeyOf(today);

  /* Lock scroll + Esc to close */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  /* Clear a chosen time if the date or barber changes */
  useEffect(() => {
    setTime("");
  }, [dateKey, barberId]);

  const calendarCells = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const pad = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const cells: (Date | null)[] = Array.from({ length: pad }, () => null);
    for (let d = 1; d <= total; d++) cells.push(new Date(y, m, d));
    return cells;
  }, [cursor]);

  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 60);
    return d;
  }, [today]);

  const canNext =
    (step === 1 && !!serviceId) ||
    (step === 2 && !!barberId) ||
    (step === 3 && !!dateKey && !!time) ||
    step === 4;

  const formValid = form.name.trim().length >= 2 && form.phone.trim().length >= 7;
  const priceLabel = svc ? servicePrice(svc, variantIdx) : "";

  const go = (n: number) => setStep(Math.min(4, Math.max(1, n)));

  const confirm = () => {
    setTouched(true);
    if (!formValid) return;
    setDone(true);
  };

  const monthAtStart = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 animate-fadeIn bg-ink/88 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book an appointment"
        className="relative flex max-h-[94vh] w-full animate-popIn flex-col overflow-hidden rounded-t-2xl border border-line bg-card shadow-2xl sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0">
            <Logo compact />
            <p className="mt-1.5 font-head text-[10px] tracking-[.24em] text-neon">
              {done ? "SLOT CONFIRMED" : `STEP ${step} OF 4 — ${STEPS[step - 1]}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-blood hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* ── Progress ── */}
        {!done && (
          <div className="flex gap-1.5 px-5 pt-4 sm:px-7">
            {STEPS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => i + 1 < step && go(i + 1)}
                disabled={i + 1 > step}
                className="group flex-1 text-left disabled:cursor-default"
              >
                <span
                  className={`block h-1 rounded-full transition-colors ${
                    i + 1 <= step ? "bg-neon" : "bg-line"
                  }`}
                />
                <span
                  className={`mt-2 hidden font-head text-[9px] tracking-[.16em] transition-colors sm:block ${
                    i + 1 <= step ? "text-white" : "text-muted"
                  }`}
                >
                  {s}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── Body ── */}
        <div className="modal-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {done ? (
            <SuccessPanel
              svc={svc!}
              priceLabel={priceLabel}
              variantIdx={variantIdx}
              barber={barber!}
              dateKey={dateKey}
              time={time}
              name={form.name}
            />
          ) : (
            <>
              {/* STEP 1 — SERVICE */}
              {step === 1 && (
                <div className="animate-fadeIn">
                  <h3 className="font-display text-xl uppercase tracking-tight sm:text-2xl">
                    WHAT ARE WE DOING TODAY?
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">
                    Every service starts with a free consultation.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => {
                      const active = serviceId === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setServiceId(s.id);
                            setVariantIdx(0);
                          }}
                          className={`group relative flex gap-3.5 overflow-hidden rounded-xl border p-3 text-left transition-all hover:scale-[1.02] ${
                            active
                              ? "border-neon bg-neon/10 shadow-neon"
                              : "border-line bg-ink/60 hover:border-neon/50 hover:bg-cardhi"
                          }`}
                        >
                          <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={s.image} alt="" className="h-full w-full object-cover object-top" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-head text-[12px] leading-tight tracking-[.1em] text-white">
                              {s.name}
                            </span>
                            <span className="mt-1 block font-display text-lg leading-none text-neon">
                              {s.priceRange ?? (s.variants ? `FROM ${peso(1999)}` : peso(s.price!))}
                            </span>
                            <span className="mt-1 block text-[10px] tracking-[.1em] text-muted">
                              {s.duration} · {s.includes.length} INCLUSIONS
                            </span>
                          </span>
                          {active && (
                            <span className="absolute right-2.5 top-2.5">
                              <Check className="h-4 w-4" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Variant picker */}
                  {svc?.variants && (
                    <div className="mt-5 rounded-xl border border-line bg-ink/60 p-4">
                      <p className="font-head text-[10px] tracking-[.24em] text-neon">
                        CHOOSE YOUR SHADE
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {svc.variants.map((v, i) => (
                          <button
                            key={v.name}
                            type="button"
                            onClick={() => setVariantIdx(i)}
                            className={`flex items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left transition-all ${
                              variantIdx === i
                                ? "border-neon bg-neon/10"
                                : "border-line hover:border-neon/50"
                            }`}
                          >
                            <span className="min-w-0">
                              <span className="block font-head text-[11px] tracking-[.1em] text-white">
                                {v.name}
                              </span>
                              <span className="mt-0.5 block text-[10px] leading-snug text-muted">
                                {v.note}
                              </span>
                            </span>
                            <span className="shrink-0 font-display text-base text-neon">
                              {peso(v.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Braid styles */}
                  {svc?.styles && (
                    <div className="mt-5 rounded-xl border border-line bg-ink/60 p-4">
                      <p className="font-head text-[10px] tracking-[.24em] text-neon">
                        TELL YOUR BARBER THE STYLE
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {svc.styles.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-line px-3 py-1.5 font-head text-[10px] tracking-[.1em] text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2 — BARBER */}
              {step === 2 && (
                <div className="animate-fadeIn">
                  <h3 className="font-display text-xl uppercase tracking-tight sm:text-2xl">
                    PICK YOUR BARBER
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">
                    No preference? Any Available Barber gets you the earliest chair.
                  </p>

                  <div className="mt-5 space-y-3">
                    {barbers.map((b) => {
                      const active = barberId === b.id;
                      const isAny = b.id === "any";
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBarberId(b.id)}
                          className={`flex w-full items-center gap-4 rounded-xl border p-3.5 text-left transition-all hover:scale-[1.01] ${
                            active
                              ? "border-neon bg-neon/10 shadow-neon"
                              : "border-line bg-ink/60 hover:border-neon/50 hover:bg-cardhi"
                          }`}
                        >
                          <span
                            className={`grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg ${
                              isAny ? "border border-neon/40 bg-ink/70" : ""
                            }`}
                          >
                            {isAny ? (
                              <Image
                                src="/images/sf-monogram.png"
                                alt=""
                                width={96}
                                height={96}
                                className="h-9 w-9 object-contain"
                              />
                            ) : (
                              <BarberPhoto x={b.photoX} y={27} className="block h-full w-full" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-head text-[12px] tracking-[.12em] text-white">
                              {b.name}
                            </span>
                            <span className="mt-0.5 block font-head text-[10px] tracking-[.18em] text-neon">
                              {b.role}
                            </span>
                            <span className="mt-1 block text-[11px] text-muted">{b.specialty}</span>
                          </span>
                          {active && <Check className="h-5 w-5 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3 — DATE & TIME */}
              {step === 3 && (
                <div className="animate-fadeIn">
                  <h3 className="font-display text-xl uppercase tracking-tight sm:text-2xl">
                    WHEN ARE YOU COMING IN?
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">{BRAND.hours}</p>

                  <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                    {/* Calendar */}
                    <div className="rounded-xl border border-line bg-ink/60 p-4">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          disabled={monthAtStart}
                          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                          className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors hover:border-neon hover:text-neon disabled:opacity-25 disabled:hover:border-line disabled:hover:text-muted"
                          aria-label="Previous month"
                        >
                          <Arrow className="h-3.5 w-3.5 rotate-180" />
                        </button>
                        <p className="font-head text-xs tracking-[.2em] text-white">
                          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
                        </p>
                        <button
                          type="button"
                          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                          className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors hover:border-neon hover:text-neon"
                          aria-label="Next month"
                        >
                          <Arrow className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-7 gap-1">
                        {DOW.map((d, i) => (
                          <span key={i} className="grid h-8 place-items-center font-head text-[10px] text-muted">
                            {d}
                          </span>
                        ))}
                        {calendarCells.map((d, i) => {
                          if (!d) return <span key={`p${i}`} />;
                          const key = dateKeyOf(d);
                          const past = d < today;
                          const far = d > maxDate;
                          const disabled = past || far;
                          const active = key === dateKey;
                          const isToday = key === todayKey;
                          return (
                            <button
                              key={key}
                              type="button"
                              disabled={disabled}
                              onClick={() => setDateKey(key)}
                              className={`grid h-9 w-9 place-items-center rounded-md font-head text-[12px] transition-all ${
                                active
                                  ? "bg-neon text-ink"
                                  : disabled
                                  ? "cursor-not-allowed text-muted/25 line-through"
                                  : isToday
                                  ? "border border-neon/60 text-neon hover:bg-neon/15"
                                  : "text-white/80 hover:bg-cardhi hover:text-neon"
                              }`}
                            >
                              {d.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className="rounded-xl border border-line bg-ink/60 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-head text-[10px] tracking-[.24em] text-neon">
                          AVAILABLE SLOTS
                        </p>
                        <span className="font-head text-[10px] tracking-[.14em] text-muted">
                          {dateKey ? prettyDate(dateKey) : "PICK A DATE FIRST"}
                        </span>
                      </div>

                      {!dateKey ? (
                        <div className="mt-6 grid place-items-center rounded-lg border border-dashed border-line py-10 text-center">
                          <Glyph name="chat" className="h-6 w-6 text-muted" />
                          <p className="mt-2 max-w-[180px] text-[12px] text-muted">
                            Choose a date to see open chairs.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map((t, i) => {
                              const taken = isSlotTaken(dateKey, barberId, i);
                              const hour = 10 + i;
                              const passed =
                                dateKey === todayKey && new Date().getHours() >= hour;
                              const disabled = taken || passed;
                              const active = time === t;
                              return (
                                <button
                                  key={t}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => setTime(t)}
                                  className={`rounded-lg border px-2 py-2.5 font-head text-[11px] tracking-[.06em] transition-all ${
                                    active
                                      ? "border-neon bg-neon text-ink"
                                      : disabled
                                      ? "cursor-not-allowed border-line/60 bg-ink/40 text-muted/30 line-through"
                                      : "border-line text-white/85 hover:scale-[1.04] hover:border-neon hover:text-neon"
                                  }`}
                                >
                                  {t}
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-4 flex items-center gap-2 text-[11px] text-muted">
                            <span className="h-2 w-2 rounded-sm bg-line" />
                            Struck-through slots are already booked.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 — DETAILS */}
              {step === 4 && svc && (
                <div className="animate-fadeIn grid gap-5 lg:grid-cols-[1fr_300px]">
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-tight sm:text-2xl">
                      LAST STEP — YOUR DETAILS
                    </h3>
                    <p className="mt-1 text-[13px] text-muted">
                      We only use this to confirm your slot. No online payment.
                    </p>

                    <div className="mt-5 space-y-3.5">
                      <Field label="FULL NAME *">
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Juan Dela Cruz"
                          className={`w-full rounded-lg border bg-ink px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-muted/50 focus:border-neon ${
                            touched && form.name.trim().length < 2 ? "border-blood" : "border-line"
                          }`}
                        />
                      </Field>
                      <Field label="MOBILE NUMBER *">
                        <input
                          value={form.phone}
                          inputMode="tel"
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="0917 123 4567"
                          className={`w-full rounded-lg border bg-ink px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-muted/50 focus:border-neon ${
                            touched && form.phone.trim().length < 7 ? "border-blood" : "border-line"
                          }`}
                        />
                      </Field>
                      <Field label="FACEBOOK NAME / LINK (OPTIONAL)">
                        <input
                          value={form.fb}
                          onChange={(e) => setForm({ ...form, fb: e.target.value })}
                          placeholder="facebook.com/yourname"
                          className="w-full rounded-lg border border-line bg-ink px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-muted/50 focus:border-neon"
                        />
                      </Field>
                      {touched && !formValid && (
                        <p className="font-head text-[11px] tracking-[.12em] text-blood">
                          NAME AND MOBILE NUMBER ARE REQUIRED.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <aside className="relative overflow-hidden rounded-xl border border-neon/40 bg-ink/70 p-5">
                    <div className="camo absolute inset-0 opacity-[0.14] mix-blend-soft-light" />
                    <div className="relative">
                      <BrushBadge>YOUR BOOKING</BrushBadge>
                      <dl className="mt-4 space-y-3 text-[12px]">
                        <SummaryRow label="SERVICE" value={svc.name} />
                        {svc.variants && (
                          <SummaryRow label="SHADE" value={svc.variants[variantIdx].name} />
                        )}
                        <SummaryRow label="BARBER" value={barber?.name ?? "—"} />
                        <SummaryRow label="DATE" value={dateKey ? prettyDate(dateKey) : "—"} />
                        <SummaryRow label="TIME" value={time || "—"} />
                        <SummaryRow label="DURATION" value={svc.duration} />
                      </dl>

                      <div className="mt-4 border-t border-line pt-4">
                        <p className="font-head text-[10px] tracking-[.24em] text-muted">TOTAL</p>
                        <p className="font-display text-3xl leading-none text-neon">{priceLabel}</p>
                        {svc.originalPrice && (
                          <p className="mt-1 font-head text-[11px] text-muted line-through">
                            {peso(svc.originalPrice)}
                          </p>
                        )}
                        <p className="mt-3 font-head text-[10px] leading-relaxed tracking-[.16em] text-white">
                          SAVE TIME · LOOK GOOD · FEEL GREAT
                        </p>
                      </div>
                    </div>
                  </aside>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-line bg-card px-5 py-4 sm:px-7">
          {done ? (
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-line py-3.5 text-center font-head text-[12px] tracking-[.16em] text-white transition-all hover:border-neon hover:text-neon"
              >
                MESSAGE US ON FACEBOOK
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg bg-neon py-3.5 font-head text-[12px] tracking-[.16em] text-ink transition-all hover:scale-[1.02] hover:shadow-neon"
              >
                DONE
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => (step === 1 ? onClose() : go(step - 1))}
                className="rounded-lg border border-line px-5 py-3.5 font-head text-[12px] tracking-[.16em] text-muted transition-colors hover:border-white hover:text-white"
              >
                {step === 1 ? "CANCEL" : "BACK"}
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={() => go(step + 1)}
                  className="group flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-neon px-5 py-3.5 font-head text-[12px] tracking-[.16em] text-ink transition-all hover:scale-[1.02] hover:shadow-neon disabled:cursor-not-allowed disabled:bg-line disabled:text-muted disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  CONTINUE
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={confirm}
                  className="flex-1 rounded-lg bg-blood px-5 py-3.5 font-head text-[12px] tracking-[.14em] text-white transition-all hover:scale-[1.02] hover:shadow-blood"
                >
                  CONFIRM BOOKING — {priceLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 font-head text-[10px] tracking-[.18em] text-muted">{label}</dt>
      <dd className="text-right text-[11px] leading-snug text-white">{value}</dd>
    </div>
  );
}

export function SuccessPanel({
  svc,
  priceLabel,
  variantIdx,
  barber,
  dateKey,
  time,
  name,
}: {
  svc: Service;
  priceLabel: string;
  variantIdx: number;
  barber: Barber;
  dateKey: string;
  time: string;
  name: string;
}) {
  const ref = useMemo(
    () => "SF-" + hash(`${svc.id}${barber.id}${dateKey}${time}${name}`).toString(36).toUpperCase().slice(0, 6),
    [svc.id, barber.id, dateKey, time, name],
  );

  return (
    <div className="animate-fadeIn text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neon/15 ring-1 ring-neon/50">
        <Check className="h-9 w-9" />
      </div>

      <h3 className="mt-5 font-display text-2xl uppercase leading-none tracking-tight sm:text-3xl">
        FADE EVERYTHING
        <br />
        <span className="text-neon">BE LEGENDARY.</span>
      </h3>
      <p className="mt-3 text-sm text-white">
        Slot confirmed{name ? `, ${name.split(" ")[0].toUpperCase()}` : ""}! See you at the studio.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-xl border border-line bg-ink/70 p-5 text-left">
        <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
          <span className="font-head text-[10px] tracking-[.24em] text-muted">REFERENCE</span>
          <span className="font-display text-base tracking-tight text-neon">{ref}</span>
        </div>
        <dl className="space-y-3">
          <SummaryRow label="SERVICE" value={svc.name} />
          {svc.variants && <SummaryRow label="SHADE" value={svc.variants[variantIdx].name} />}
          <SummaryRow label="BARBER" value={barber.name} />
          <SummaryRow label="WHEN" value={`${prettyDate(dateKey)} · ${time}`} />
          <SummaryRow label="TOTAL" value={priceLabel} />
        </dl>
        <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
          Pay at the studio. Please arrive 5 minutes early — if you&apos;re running
          late, message us on Facebook so we can hold your chair.
        </p>
      </div>

      <p className="mt-5 font-head text-[11px] tracking-[.2em] text-neon">
        BOOK NOW • SIT BACK • GET FADED
      </p>
    </div>
  );
}

export default BookingModal;
