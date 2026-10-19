"use client";

import { barbers, stats } from "../data";
import { BarberPhoto, BrushBadge, Eyebrow, SectionTitle } from "./ui";

export function Barbers({ onBook }: { onBook: () => void }) {
  return (
    <section id="barbers" className="stone relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Eyebrow>
            <span className="sr-only">Section: </span>OUR BARBERS
          </Eyebrow>
          <SectionTitle>
            MEET OUR HAIR AND
            <br />
            BEARD CUTTING <span className="text-neon">EXPERTS</span>
          </SectionTitle>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {barbers.slice(1).map((b) => (
            <article
              key={b.id}
              className="group relative overflow-hidden rounded-xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-neon/70 hover:shadow-neon"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <BarberPhoto
                  x={b.photoX}
                  y={37.5}
                  className="block h-full w-full transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
                <div className="absolute left-4 top-4">
                  <BrushBadge>{b.years}</BrushBadge>
                </div>
              </div>
              <div className="relative -mt-14 p-5">
                <p className="font-head text-[10px] tracking-[.26em] text-neon">{b.role}</p>
                <h3 className="mt-1 font-display text-xl uppercase leading-none tracking-tight">
                  {b.name}
                </h3>
                <p className="mt-2 text-[12px] text-muted">{b.specialty}</p>
                <button
                  type="button"
                  onClick={onBook}
                  className="mt-4 w-full rounded-lg border border-line bg-ink/60 py-3 font-head text-[11px] tracking-[.16em] text-white transition-all hover:border-neon hover:bg-neon hover:text-ink"
                >
                  BOOK WITH {b.name.split(" ")[0]}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6 text-center transition-colors hover:bg-cardhi sm:p-8">
              <p className="font-display text-4xl leading-none text-white sm:text-5xl">
                {s.value}
              </p>
              <p className="mx-auto mt-2 max-w-[150px] font-head text-[10px] leading-relaxed tracking-[.16em] text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Barbers;
