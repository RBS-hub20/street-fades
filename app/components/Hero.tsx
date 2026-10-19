"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { BRAND, services, barbers, TIME_SLOTS, peso } from "../data";
import { Check, Arrow, Eyebrow, Field, IconStar, Glyph } from "./ui";

const HERO_STATS = [
  { value: "₱399 – ₱4,000", label: "SERVICE RANGE" },
  { value: "25", label: "SIGNATURE STYLES" },
  { value: "98%", label: "SATISFACTION" },
];

/* The first two carry the proof; the rest are desktop-only so phones get
   one clean row instead of a cramped 2x2 grid. */
const HERO_TRUST = [
  { label: "5.0 · 15 REVIEWS", render: () => <IconStar className="h-4 w-4" />, mobile: true },
  { label: "WALK-INS WELCOME", render: () => <Check className="h-4 w-4" />, mobile: true },
  { label: "PREMIUM CUTS", render: () => <Glyph name="scissors" className="h-4 w-4" />, mobile: false },
  { label: "HOT TOWEL", render: () => <Glyph name="towel" className="h-4 w-4" />, mobile: false },
];

/** Neon that keeps its letterforms: tight bright core, graduated halo. */
const NEON: CSSProperties = {
  textShadow:
    "0 0 6px rgba(190,255,120,.95), 0 0 16px rgba(126,211,33,.8), 0 0 38px rgba(126,211,33,.45), 0 0 70px rgba(126,211,33,.25)",
};

/** Same glow, plus a dark edge and drop shadow so it lifts off the footage
    at small sizes where the halo would otherwise swallow the letters. */
const NEON_MOBILE: CSSProperties = {
  textShadow:
    "0 2px 10px rgba(0,0,0,.8), 0 0 6px rgba(190,255,120,.9), 0 0 18px rgba(126,211,33,.6)",
  WebkitTextStroke: "1px #0a0a0a",
};

export function Hero({ onBook }: { onBook: (serviceId?: string) => void }) {
  const [quick, setQuick] = useState({ service: "", barber: "", date: "", time: "" });

  /* Starts "false" so SSR and the first client render agree. */
  const [isDesktop, setIsDesktop] = useState(false);
  const [calm, setCalm] = useState(false);
  /* Phones get a poster until the visitor asks for the video — no autoplay
     download on mobile data. */
  const [playMobile, setPlayMobile] = useState(false);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsDesktop(wide.matches);
      setCalm(reduce.matches);
    };
    sync();
    wide.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const showDesktopVideo = isDesktop && !calm;
  const showMobileVideo = !isDesktop && !calm && playMobile;

  return (
    <section
      id="home"
      className="stone relative isolate flex min-h-[86vh] flex-col justify-center overflow-hidden pt-[64px] md:min-h-screen"
    >
      {/* ══ The studio itself ══════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10">
        {showDesktopVideo ? (
          <video
            className="animate-kenBurns h-full w-full object-cover"
            style={{ filter: "brightness(1.1) contrast(1.2) saturate(1.05)" }}
            poster="/images/hero-poster.jpg"
            src="/videos/hero-interior.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : showMobileVideo ? (
          <video
            ref={mobileVideoRef}
            className="h-full w-full object-cover"
            style={{ filter: "brightness(1.2) contrast(1.15) saturate(1.05)" }}
            poster="/images/hero-poster-mobile.jpg"
            src="/videos/hero-interior-mobile.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={isDesktop ? "/images/hero-poster.jpg" : "/images/hero-poster-mobile.jpg"}
            alt="Inside Street Fades Hair Studio — chairs with camo capes, mirrors, neon signs"
            className="h-full w-full object-cover"
            style={{ filter: isDesktop ? undefined : "brightness(1.2)" }}
          />
        )}

        <div className="absolute inset-0 bg-ink/25 md:bg-ink/40" />
        {/* Mobile reads top-to-bottom, desktop left-to-right */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/30 to-ink/80 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/90 via-ink/20 to-transparent md:block" />
        <div className="absolute inset-y-0 left-0 hidden w-full max-w-3xl bg-gradient-to-r from-ink via-ink/65 to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 30%, rgba(5,5,5,.6) 100%)",
          }}
        />
        <div className="camo absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
        <div className="absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-neon/12 blur-[130px]" />
        <div className="absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full bg-neon/10 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
      </div>

      {/* Tap to play — mobile only, and only while the poster is showing */}
      {!isDesktop && !calm && !playMobile && (
        <button
          type="button"
          onClick={() => setPlayMobile(true)}
          aria-label="Play the studio tour"
          className="group absolute right-5 top-[84px] z-10 flex items-center gap-2 rounded-full border border-neon/50 bg-ink/70 py-2 pl-2 pr-3.5 backdrop-blur-md"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-neon text-[10px] text-ink">
            ▶
          </span>
          <span className="font-head text-[10px] tracking-[.18em] text-neon">
            PLAY TOUR
          </span>
        </button>
      )}

      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          {/* ══ Left ════════════════════════════════════════════════ */}
          <div className="animate-riseIn">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-neon/40 bg-ink/60 px-3.5 py-1.5 backdrop-blur">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-neon text-[7px] text-ink">
                ▶
              </span>
              <span className="font-head text-[9px] tracking-[.18em] text-neon sm:text-[10px] sm:tracking-[.2em]">
                REAL STUDIO TOUR — 24 DR. SIXTO AVE
              </span>
            </div>

            <h1 className="font-display text-[42px] uppercase leading-[0.9] tracking-tight sm:text-6xl sm:leading-[0.86] lg:text-7xl xl:text-[78px]">
              <span className="block text-neon" style={isDesktop ? NEON : NEON_MOBILE}>
                PREMIUM
              </span>
              <span className="block text-white md:mix-blend-difference">CUTS.</span>
              <span className="block text-neon" style={isDesktop ? NEON : NEON_MOBILE}>
                PREMIUM
              </span>
              <span className="block text-white md:mix-blend-difference">
                EXPERIENCE.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base">
              <span className="font-semibold text-white">
                {BRAND.address.split(",")[0]}
              </span>
              , Rosario, Pasig · Open daily 10 AM – 9:30 PM
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6">
              {HERO_TRUST.map((t) => (
                <div
                  key={t.label}
                  className={`flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-ink/60 px-4 backdrop-blur-md ${
                    t.mobile ? "" : "hidden md:flex"
                  }`}
                >
                  <span className="text-neon">{t.render()}</span>
                  <span className="font-head text-[11px] tracking-[.14em] text-white">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={() => onBook()}
                className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-lg bg-blood px-7 font-head text-sm tracking-[.16em] text-white shadow-blood transition-all hover:scale-[1.02] active:scale-100 sm:h-auto sm:w-auto sm:py-4"
              >
                BOOK YOUR SLOT NOW!
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#lookbook"
                className="flex h-14 w-full items-center justify-center gap-2.5 rounded-lg border border-white/30 px-7 font-head text-sm tracking-[.16em] text-white/90 transition-all hover:border-neon hover:text-neon sm:h-auto sm:w-auto sm:bg-ink/50 sm:py-4 sm:backdrop-blur-md"
              >
                VIEW INTERIOR
              </a>
            </div>
          </div>

          {/* ══ Right — booking card ═══════════════════════════════ */}
          <div className="animate-riseIn [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-2xl border border-neon/30 bg-ink/70 p-5 shadow-[0_0_0_1px_rgba(126,211,33,.08),0_24px_70px_-20px_rgba(126,211,33,.35)] backdrop-blur-xl sm:p-6 md:bg-ink/60 md:backdrop-blur-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />

              {showDesktopVideo && (
                <div className="relative mb-5 overflow-hidden rounded-xl border border-neon/25">
                  <video
                    className="h-20 w-full object-cover"
                    src="/videos/hero-interior.mp4"
                    poster="/images/hero-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute bottom-2 left-3 font-head text-[9px] tracking-[.2em] text-neon">
                    ● LIVE FROM THE FLOOR
                  </span>
                </div>
              )}

              <Eyebrow>PREMIER DESTINATION FOR GROOMING</Eyebrow>
              <h2 className="font-display text-2xl uppercase leading-none tracking-tight sm:text-3xl">
                BOOK AN APPOINTMENT
              </h2>
              <p className="mt-2 text-xs text-white/60">
                {BRAND.hours} · {BRAND.taglines[4]}
              </p>

              <div className="mt-4 space-y-3">
                <Field label="SELECT SERVICE">
                  <select
                    value={quick.service}
                    onChange={(e) => setQuick({ ...quick, service: e.target.value })}
                    className="w-full appearance-none rounded-lg border border-white/15 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-neon"
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
                    className="w-full appearance-none rounded-lg border border-white/15 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-neon"
                  >
                    <option value="">Any barber</option>
                    {barbers.slice(1).map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.role}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="DATE">
                    <input
                      type="date"
                      value={quick.date}
                      onChange={(e) => setQuick({ ...quick, date: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-neon"
                    />
                  </Field>
                  <Field label="TIME">
                    <select
                      value={quick.time}
                      onChange={(e) => setQuick({ ...quick, time: e.target.value })}
                      className="w-full appearance-none rounded-lg border border-white/15 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-neon"
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
                  className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-lg bg-neon px-5 font-head text-sm tracking-[.16em] text-ink transition-all hover:scale-[1.02] hover:shadow-neon active:scale-100 sm:h-auto sm:py-3.5"
                >
                  CHECK AVAILABILITY
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-[11px] text-white/50">
                  No payment online — confirm your slot, pay at the studio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Stats ════════════════════════════════════════════════ */}
        <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="bg-ink/50 px-2 py-4 text-center sm:px-5">
              <p className="font-display text-base leading-none text-neon sm:text-2xl lg:text-3xl">
                {s.value}
              </p>
              <p className="mt-1.5 font-head text-[8px] leading-tight tracking-[.14em] text-white/55 sm:text-[10px] sm:tracking-[.2em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
