"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND, services, barbers, TIME_SLOTS, peso } from "../data";
import { Check, Arrow, Eyebrow, Field, IconStar, Glyph } from "./ui";

const HERO_STATS = [
  { value: "₱399 – ₱4,000", label: "SERVICE RANGE" },
  { value: "25", label: "SIGNATURE STYLES" },
  { value: "98%", label: "SATISFACTION" },
];

const HERO_TRUST = [
  { label: "5.0 RATING", Icon: () => <IconStar className="h-3.5 w-3.5" /> },
  { label: "15+ REVIEWS", Icon: () => <Glyph name="chat" className="h-3.5 w-3.5" /> },
  { label: "WALK-INS WELCOME", Icon: () => <Check className="h-3.5 w-3.5" /> },
];

export function Hero({ onBook }: { onBook: (serviceId?: string) => void }) {
  const [quick, setQuick] = useState({ service: "", barber: "", date: "", time: "" });

  /* The video is desktop-only: on phones we show the poster instead so we
     never pull 2.5 MB over mobile data. Starts false so SSR and the first
     client render agree, then upgrades after mount. */
  const [showVideo, setShowVideo] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setShowVideo(wide.matches && !calm.matches);
    sync();
    wide.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play().catch(() => {});
  };

  return (
    <section id="home" className="stone relative isolate overflow-hidden pt-[64px]">
      {/* ── Background: real studio footage ─────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/images/hero-poster.jpg"
            src="/videos/hero-interior.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Inside Street Fades Hair Studio"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/images/hero-poster.jpg"
            alt="Inside Street Fades Hair Studio — stone walls, neon signs and camo capes"
            className="h-full w-full object-cover"
          />
        )}

        {/* Scrim: keeps the copy readable over the footage */}
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/45" />

        {/* Warm pendant-light bokeh, picked from the lights in the shot */}
        <div className="absolute left-[18%] top-[6%] h-40 w-40 rounded-full bg-amber-300/20 blur-[90px]" />
        <div className="absolute left-[46%] top-[2%] h-52 w-52 rounded-full bg-amber-200/15 blur-[110px]" />
        <div className="absolute right-[12%] top-[14%] h-36 w-36 rounded-full bg-amber-400/15 blur-[85px]" />

        {/* Neon mist */}
        <div className="absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-neon/16 blur-[130px]" />
        <div className="absolute -right-28 bottom-0 h-[380px] w-[380px] rounded-full bg-neon/10 blur-[120px]" />

        {/* Camo texture */}
        <div className="camo absolute inset-0 opacity-[0.18] mix-blend-soft-light" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          {/* ── Left ───────────────────────────────────────────────── */}
          <div className="animate-riseIn">
            <div className="mb-5 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-neon/35 bg-neon/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulseLine rounded-full bg-neon" />
              <span className="font-head text-[10px] tracking-[.22em] text-neon">
                EST. 2024 · ROSARIO, PASIG · {BRAND.rating} ★ {BRAND.reviewCount.toUpperCase()}
              </span>
            </div>

            <h1 className="font-display text-[42px] uppercase leading-[0.88] tracking-tight sm:text-6xl lg:text-7xl">
              <span
                className="text-neon"
                style={{ textShadow: "0 0 20px #7ED321, 0 0 48px rgba(126,211,33,.4)" }}
              >
                PREMIUM
              </span>{" "}
              CUTS.
              <br />
              <span
                className="text-neon"
                style={{ textShadow: "0 0 20px #7ED321, 0 0 48px rgba(126,211,33,.4)" }}
              >
                PREMIUM
              </span>{" "}
              EXPERIENCE.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Barbershop × streetwear × lifestyle.{" "}
              <span className="text-white">{BRAND.address}.</span> Open daily 10 AM –
              9:30 PM.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {HERO_TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 rounded-lg border border-line bg-card/60 px-3 py-2 backdrop-blur"
                >
                  <span className="text-neon">
                    <t.Icon />
                  </span>
                  <span className="font-head text-[10px] tracking-[.16em] text-white/90">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onBook()}
                className="group flex items-center justify-center gap-2.5 rounded-lg bg-blood px-7 py-4 font-head text-sm tracking-[.16em] text-white shadow-blood transition-all hover:scale-[1.02] active:scale-100"
              >
                BOOK YOUR SLOT NOW!
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#lookbook"
                className="flex items-center justify-center gap-2.5 rounded-lg border border-line bg-card/70 px-7 py-4 font-head text-sm tracking-[.16em] text-white backdrop-blur transition-all hover:border-neon hover:text-neon"
              >
                VIEW INTERIOR
              </a>
            </div>
          </div>

          {/* ── Right — quick booking card (glass) ─────────────────── */}
          <div className="animate-riseIn [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-2xl border border-neon/20 bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
              <Eyebrow>PREMIER DESTINATION FOR GROOMING</Eyebrow>
              <h2 className="font-display text-2xl uppercase leading-none tracking-tight sm:text-3xl">
                BOOK AN APPOINTMENT
              </h2>
              <p className="mt-2 text-xs text-muted">
                {BRAND.hours} · {BRAND.taglines[4]}
              </p>

              <div className="mt-5 space-y-3.5">
                <Field label="SELECT SERVICE">
                  <select
                    value={quick.service}
                    onChange={(e) => setQuick({ ...quick, service: e.target.value })}
                    className="w-full appearance-none rounded-lg border border-line bg-ink/80 px-4 py-3.5 text-sm text-white outline-none transition-colors focus:border-neon"
                  >
                    <option value="">Choose a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.price ? peso(s.price) : s.variants ? `from ${peso(1999)}` : s.priceRange}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="SELECT BARBER">
                  <select
                    value={quick.barber}
                    onChange={(e) => setQuick({ ...quick, barber: e.target.value })}
                    className="w-full appearance-none rounded-lg border border-line bg-ink/80 px-4 py-3.5 text-sm text-white outline-none transition-colors focus:border-neon"
                  >
                    <option value="">Any barber</option>
                    {barbers.slice(1).map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.role}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-3.5">
                  <Field label="DATE">
                    <input
                      type="date"
                      value={quick.date}
                      onChange={(e) => setQuick({ ...quick, date: e.target.value })}
                      className="w-full rounded-lg border border-line bg-ink/80 px-4 py-3.5 text-sm text-white outline-none transition-colors focus:border-neon"
                    />
                  </Field>
                  <Field label="TIME">
                    <select
                      value={quick.time}
                      onChange={(e) => setQuick({ ...quick, time: e.target.value })}
                      className="w-full appearance-none rounded-lg border border-line bg-ink/80 px-4 py-3.5 text-sm text-white outline-none transition-colors focus:border-neon"
                    >
                      <option value="">Any time</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <button
                  type="button"
                  onClick={() => onBook(quick.service || undefined)}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-lg bg-neon px-5 py-4 font-head text-sm tracking-[.16em] text-ink transition-all hover:scale-[1.02] hover:shadow-neon active:scale-100"
                >
                  CHECK AVAILABILITY
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-[11px] text-muted">
                  No payment online — confirm your slot, pay at the studio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Floating stats ───────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line/60 backdrop-blur-xl sm:grid-cols-3">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="bg-card/70 px-5 py-4 text-center sm:py-5">
              <p className="font-display text-2xl leading-none text-neon sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1.5 font-head text-[10px] tracking-[.2em] text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footage credit + sound toggle ──────────────────────────── */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 flex items-center gap-2 sm:bottom-6 sm:right-6">
        <span className="rounded-md border border-line bg-ink/70 px-2.5 py-1.5 font-head text-[9px] tracking-[.18em] text-muted backdrop-blur">
          REAL STUDIO — NOT STOCK PHOTO
        </span>
        {showVideo && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute studio sound" : "Mute studio sound"}
            className="pointer-events-auto grid h-9 w-9 place-items-center rounded-md border border-line bg-ink/70 text-muted backdrop-blur transition-all hover:border-neon hover:text-neon"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
              {muted ? (
                <path d="m16 9.5 4 5M20 9.5l-4 5" />
              ) : (
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
              )}
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

export default Hero;
