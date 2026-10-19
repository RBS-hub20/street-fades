"use client";

import { useState } from "react";
import { reviews } from "../data";
import { Eyebrow, SectionTitle } from "./ui";

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const r = reviews[idx];

  return (
    <section className="relative overflow-hidden border-y border-line bg-card/25 py-16 sm:py-24">
      <div className="camo absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Eyebrow>
          <span className="sr-only">Section: </span>TESTIMONIALS
        </Eyebrow>
        <SectionTitle>
          WHAT PEOPLE <span className="text-neon">SAY</span>
        </SectionTitle>

        <blockquote key={idx} className="mt-8 animate-fadeIn">
          <p className="text-base leading-relaxed text-white/90 sm:text-xl sm:leading-relaxed">
            &ldquo;{r.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <p className="font-display text-lg uppercase tracking-tight text-white">{r.name}</p>
            <p className="mt-1 font-head text-[10px] tracking-[.24em] text-neon">{r.meta}</p>
          </footer>
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              aria-current={i === idx}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-8 bg-neon" : "w-1.5 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
