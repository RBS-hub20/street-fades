"use client";

import { featureStrip } from "../data";
import { Glyph } from "./ui";

export function FeatureStrip() {
  return (
    <section className="border-y border-line bg-ink">
      <div className="mx-auto grid max-w-7xl gap-px bg-line sm:grid-cols-3">
        {featureStrip.map((f) => (
          <div key={f.title} className="group bg-ink p-6 transition-colors hover:bg-card sm:p-8">
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg border border-line bg-card text-neon transition-all group-hover:border-neon/60 group-hover:bg-neon/10">
              <Glyph name={f.glyph} className="h-5 w-5" />
            </span>
            <h3 className="font-head text-base tracking-[.14em] text-white">{f.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureStrip;
