"use client";

import { BRAND, lookbook } from "../data";
import { Eyebrow, SectionTitle } from "./ui";

export function Lookbook() {
  return (
    <section id="lookbook" className="border-y border-line bg-card/25 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <Eyebrow>
            <span className="sr-only">Section: </span>THE GALLERY
          </Eyebrow>
          <SectionTitle className="mx-auto">
            TRENDS & <span className="text-neon">STYLES</span>
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
            Perms, color, braids and signature fades straight from the chair.
            Follow {BRAND.handle} for the daily drop.
          </p>
        </div>

        <div className="columns-2 gap-4 lg:columns-4 [&>*]:mb-4">
          {lookbook.map((item) => (
            <figure
              key={item.src + item.label}
              className={`group relative block w-full overflow-hidden rounded-xl border border-line ${
                item.tall ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-ink/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink via-ink/85 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-head text-[11px] tracking-[.18em] text-neon">
                  {item.label}
                </span>
              </figcaption>
              <span className="absolute right-3 top-3 h-7 w-7 rounded-full border border-neon/0 transition-colors group-hover:border-neon/70" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Lookbook;
