"use client";

import { pricingLeft, pricingRight } from "../data";
import type { Barber, PriceRow } from "../data";
import { Eyebrow, SectionTitle } from "./ui";

export function Pricing({ onBook }: { onBook: () => void }) {
  const Row = ({ r }: { r: PriceRow }) => (
    <div className="group flex items-start justify-between gap-5 border-b border-line py-4 transition-colors last:border-0 hover:border-neon/40">
      <div className="min-w-0">
        <p className="font-head text-sm tracking-[.12em] text-white transition-colors group-hover:text-neon">
          {r.name}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-muted">{r.note}</p>
      </div>
      <p className="shrink-0 font-display text-lg leading-none text-neon sm:text-xl">{r.price}</p>
    </div>
  );

  return (
    <section id="pricing" className="stone relative overflow-hidden py-16 sm:py-24">
      {/* Barber pole accent */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-64 w-9 -translate-y-1/2 overflow-hidden rounded-full border border-line opacity-25 lg:block">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#7ED321 0 14px,#121212 14px 28px,#E11D48 28px 42px,#121212 42px 56px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Eyebrow>PRICING TABLE</Eyebrow>
        <SectionTitle>
          VIEW OUR BARBER
          <br />
          <span className="text-neon">PRICING LIST</span>
        </SectionTitle>

        <div className="mt-10 grid gap-x-12 gap-y-0 rounded-2xl border border-line bg-card p-5 sm:p-8 lg:grid-cols-2">
          <div>
            {pricingLeft.map((r) => (
              <Row key={r.name} r={r} />
            ))}
          </div>
          <div>
            {pricingRight.map((r) => (
              <Row key={r.name} r={r} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:p-6">
          <p className="text-center font-head text-sm tracking-[.14em] text-white sm:text-left">
            PRICES MAY VARY BY HAIR LENGTH & STYLE.
            <span className="block text-[11px] tracking-[.1em] text-muted">
              Final quote confirmed during your free consultation.
            </span>
          </p>
          <button
            type="button"
            onClick={onBook}
            className="w-full shrink-0 rounded-lg bg-blood px-7 py-3.5 font-head text-sm tracking-[.16em] text-white transition-all hover:scale-[1.02] hover:shadow-blood sm:w-auto"
          >
            BOOK YOUR SLOT NOW!
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
