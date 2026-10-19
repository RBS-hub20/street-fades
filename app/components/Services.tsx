"use client";

import { useState } from "react";
import { BRAND, services, ULTIMATE_GLYPHS, peso } from "../data";
import type { Service } from "../data";
import { Glyph, Check, Chevron, BrushBadge, Eyebrow, SectionTitle } from "./ui";

export function ServiceCard({
  svc,
  onBook,
  featured = false,
}: {
  svc: Service;
  onBook: (id: string) => void;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [variantIdx, setVariantIdx] = useState(0);
  const panelId = `includes-${svc.id}`;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-neon/70 hover:bg-cardhi hover:shadow-neon ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-52 sm:h-64" : "h-44"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={svc.image}
          alt={svc.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/55 to-transparent" />
        {svc.badge && (
          <div className="absolute left-4 top-4 z-10">
            <BrushBadge tone={svc.badgeTone ?? "neon"}>{svc.badge}</BrushBadge>
          </div>
        )}
        <div className="absolute right-4 top-4 z-10 rounded-full border border-line/80 bg-ink/80 px-2.5 py-1 font-head text-[10px] tracking-[.18em] text-muted backdrop-blur">
          {svc.duration}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl uppercase leading-[1.05] tracking-tight sm:text-2xl">
          {svc.name}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{svc.tagline}</p>

        {/* Variants */}
        {svc.variants && (
          <div className="mt-4">
            <p className="mb-2 font-head text-[10px] tracking-[.26em] text-neon">CHOOSE YOUR SHADE</p>
            <div className="flex flex-wrap gap-2">
              {svc.variants.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setVariantIdx(i)}
                  aria-pressed={variantIdx === i}
                  className={`rounded-md border px-2.5 py-1.5 font-head text-[10px] tracking-[.1em] transition-all ${
                    variantIdx === i
                      ? "border-neon bg-neon/15 text-neon"
                      : "border-line bg-ink/60 text-muted hover:border-neon/50 hover:text-white"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-muted/90">
              {svc.variants[variantIdx].note}
            </p>
          </div>
        )}

        {/* Braid styles */}
        {svc.styles && (
          <div className="mt-4">
            <p className="mb-2 font-head text-[10px] tracking-[.26em] text-neon">BRAID STYLES</p>
            <div className="flex flex-wrap gap-2">
              {svc.styles.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-ink/60 px-2.5 py-1.5 font-head text-[10px] tracking-[.1em] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 18 icons */}
        {svc.id === "ultimate-999" && (
          <div className="mt-5 grid grid-cols-6 gap-1.5 sm:grid-cols-9">
            {svc.includes.map((label, i) => (
              <div
                key={label}
                title={label}
                className="group/ic grid aspect-square place-items-center rounded-md border border-line bg-ink/70 text-neon transition-colors hover:border-neon/60 hover:bg-neon/10"
              >
                <Glyph name={ULTIMATE_GLYPHS[i]} className="h-3.5 w-3.5" />
                <span className="font-head text-[8px] leading-none text-muted">{i + 1}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-5 flex items-end gap-3">
          {svc.priceRange ? (
            <>
              <BrushBadge>PRICE RANGE</BrushBadge>
              <span className="font-display text-2xl leading-none text-white sm:text-3xl">
                {svc.priceRange}
              </span>
            </>
          ) : (
            <>
              <span className="font-display text-3xl leading-none text-neon sm:text-4xl">
                {svc.variants ? peso(svc.variants[variantIdx].price) : peso(svc.price!)}
              </span>
              {svc.originalPrice && (
                <span className="pb-1 font-head text-base text-muted line-through">
                  {peso(svc.originalPrice)}
                </span>
              )}
            </>
          )}
        </div>

        {/* Collapsible includes */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-5 flex w-full items-center justify-between rounded-lg border border-line bg-ink/60 px-4 py-3 text-left transition-colors hover:border-neon/50 hover:bg-ink"
        >
          <span className="font-head text-[11px] tracking-[.22em] text-white">
            {svc.tag ?? "INCLUDES"}
            <span className="ml-2 text-neon">({svc.includes.length})</span>
          </span>
          <span className="text-neon">
            <Chevron open={open} />
          </span>
        </button>

        <div
          id={panelId}
          className={`grid transition-all duration-400 ease-out ${
            open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className={`space-y-2 ${featured ? "sm:columns-2 sm:gap-6 sm:space-y-0" : ""}`}>
              {svc.includes.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[12px] leading-snug text-white/85 sm:mb-2 sm:break-inside-avoid"
                >
                  <span className="mt-[1px] shrink-0">
                    <Check />
                  </span>
                  <span>
                    {featured && <span className="mr-1.5 font-head text-neon">{i + 1}</span>}
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => onBook(svc.id)}
          className="mt-5 w-full rounded-lg bg-blood px-5 py-3.5 font-head text-sm tracking-[.16em] text-white transition-all hover:scale-[1.02] hover:shadow-blood active:scale-100"
        >
          BOOK THIS SERVICE
        </button>
      </div>
    </article>
  );
}

export function Services({ onBook }: { onBook: (id?: string) => void }) {
  return (
    <section id="services" className="relative border-y border-line bg-card/25 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>OUR SERVICES</Eyebrow>
            <SectionTitle>
              SIGNATURE <span className="text-neon">SERVICES</span>
            </SectionTitle>
            <p className="mt-3 max-w-xl text-sm text-muted">
              Every service includes a free hair consultation. Tap{" "}
              <span className="text-white">INCLUDES</span> to see exactly what you get.
            </p>
          </div>
          <BrushBadge tone="red">BOOK NOW • SIT BACK • GET FADED</BrushBadge>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} svc={s} onBook={onBook} featured={s.id === "ultimate-999"} />
          ))}

          {/* Walk-in tile */}
          <div className="camo relative flex flex-col justify-between overflow-hidden rounded-xl border border-neon/30 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon">
            <div className="absolute inset-0 bg-ink/80" />
            <div className="relative">
              <BrushBadge>ALSO ON THE MENU</BrushBadge>
              <h3 className="mt-4 font-display text-2xl uppercase leading-none tracking-tight">
                HAIRCUT BABY MILO
              </h3>
              <p className="mt-2 text-[13px] text-muted">EVERY CUT. PERSONALIZED.</p>
              <ul className="mt-4 space-y-2">
                {["FREE HAIR CONSULTATION", "HOT TOWEL", "SHAMPOO", "PREMIUM STYLING"].map((i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[12px] text-white/85">
                    <Check />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mt-6">
              <p className="font-head text-[10px] tracking-[.24em] text-muted">STARTS AT</p>
              <p className="font-display text-4xl leading-none text-neon">₱399</p>
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neon/50 px-5 py-3 font-head text-[11px] tracking-[.16em] text-neon transition-all hover:bg-neon hover:text-ink"
              >
                MESSAGE US ON FACEBOOK
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
