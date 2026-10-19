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
  { label: "5.0 RATING", render: () => <IconStar className="h-3.5 w-3.5" /> },
  { label: "PREMIUM CUTS", render: () => <Glyph name="scissors" className="h-3.5 w-3.5" /> },
  { label: "HOT TOWEL", render: () => <Glyph name="towel" className="h-3.5 w-3.5" /> },
  { label: "WALK-INS WELCOME", render: () => <Check className="h-3.5 w-3.5" /> },
];

/** poster = no video at all (reduced motion); mobile = 0.5 MB cut; desktop = 2 MB cut. */
type Mode = "poster" | "mobile" | "desktop";

const SRC: Record<Mode, string | null> = {
  poster: null,
  mobile: "/videos/hero-interior-mobile.mp4",
  desktop: "/videos/hero-interior.mp4",
};

/** Neon that keeps its letterforms: tight bright core, graduated halo. */
const NEON: React.CSSProperties = {
  textShadow:
    "0 0 6px rgba(190,255,120,.95), 0 0 16px rgba(126,211,33,.8), 0 0 38px rgba(126,211,33,.45), 0 0 70px rgba(126,211,33,.25)",
};

export function Hero({ onBook }: { onBook: (serviceId?: string) => void }) {
  const [quick, setQuick] = useState({ service: "", barber: "", date: "", time: "" });

  /* Starts at "poster" so SSR and first client render agree, then upgrades. */
  const [mode, setMode] = useState<Mode>("poster");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () =>
      setMode(calm.matches ? "poster" : wide.matches ? "desktop" : "mobile");
    sync();
    wide.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  const src = SRC[mode];

  return (
    <section
      id="home"
      className="stone relative isolate flex min-h-screen flex-col justify-center overflow-hidden pt-[64px]"
    >
      {/* ══ The studio itself ══════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10">
        {src ? (
          <video
            key={src}
            ref={videoRef}
            className="animate-kenBurns h-full w-full object-cover"
            style={{ filter: "brightness(1.1) contrast(1.2) saturate(1.05)" }}
            poster="/images/hero-poster.jpg"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/images/hero-poster.jpg"
            alt="Inside Street Fades Hair Studio — stone walls, neon signs, camo capes"
            className="h-full w-full object-cover"
          />
        )}

        {/* Light scrim only — the interior is the point */}
        <div className="absolute inset-0 bg-ink/40" />
        {/* Darken the left so the headline stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/20 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-ink via-ink/65 to-transparent" />
        {/* Seat the hero into the page below */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        {/* Cinematic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 30%, rgba(5,5,5,.6) 100%)",
          }}
        />
        {/* Camo from the capes, barely there */}
        <div className="camo absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
        {/* Neon spill */}
        <div className="absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-neon/12 blur-[130px]" />
        <div className="absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full bg-neon/10 blur-[120px]" />
        {/* Neon edge glow, like the sign in the shot */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          {/* ══ Left ════════════════════════════════════════════════ */}
          <div className="animate-riseIn">
            {/* Video badge */}
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-neon/40 bg-ink/60 px-3.5 py-1.5 backdrop-blur">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-neon text-[7px] text-ink">
                ▶
              </span>
              <span className="font-head text-[10px] tracking-[.2em] text-neon">
                REAL STUDIO TOUR — 24 DR. SIXTO AVE
              </span>
            </div>

            <h1 className="font-display text-[46px] uppercase leading-[0.86] tracking-tight sm:text-6xl lg:text-7xl xl:text-[78px]">
              <span className="block text-neon" style={NEON}>
                PREMIUM
              </span>
              <span className="block text-white mix-blend-difference">CUTS.</span>
              <span className="block text-neon" style={NEON}>
                PREMIUM
              </span>
              <span className="block text-white mix-blend-difference">EXPERIENCE.</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Barbershop × streetwear × lifestyle.{" "}
              <span className="text-white">{BRAND.address}.</span> Open daily 10 AM –
              9:30 PM.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {HERO_TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-ink/50 px-3 py-2 backdrop-blur-md"
                >
                  <span className="text-neon">{t.render()}</span>
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
                className="flex items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-ink/50 px-7 py-4 font-head text-sm tracking-[.16em] text-white backdrop-blur-md transition-all hover:border-neon hover:text-neon"
              >
                VIEW INTERIOR
              </a>
            </div>
          </div>

          {/* ══ Right — booking card, studio visible behind ═════════ */}
          <div className="animate-riseIn [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-2xl border border-neon/30 bg-ink/60 p-5 shadow-[0_0_0_1px_rgba(126,211,33,.08),0_24px_70px_-20px_rgba(126,211,33,.35)] backdrop-blur-2xl sm:p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />

              {/* Live peek at the floor */}
              {mode === "desktop" && (
                <div className="relative mb-5 overflow-hidden rounded-xl border border-neon/25">
                  <video
                    className="h-20 w-full object-cover"
                    src="/videos/hero-interior-mobile.mp4"
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
                  className="group flex w-full items-center justify-center gap-2.5 rounded-lg bg-neon px-5 py-3.5 font-head text-sm tracking-[.16em] text-ink transition-all hover:scale-[1.02] hover:shadow-neon active:scale-100"
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
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl sm:grid-cols-3">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="bg-ink/50 px-5 py-4 text-center">
              <p className="font-display text-2xl leading-none text-neon sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1.5 font-head text-[10px] tracking-[.2em] text-white/55">
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
