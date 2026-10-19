"use client";

import { BRAND } from "../data";
import { Arrow, BrushBadge, Eyebrow, SectionTitle, IconPin, IconExternal } from "./ui";

export function About() {
  return (
    <section className="stone relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/milo.jpg" alt="Baby Milo haircut" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/interior.jpg" alt="Inside the studio" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2">
            <BrushBadge>WALK-INS WELCOME</BrushBadge>
          </div>
        </div>

        <div>
          <Eyebrow>WHO WE ARE</Eyebrow>
          <SectionTitle>
            MAKING PEOPLE LOOK
            <br />
            <span className="text-neon">LEGENDARY</span> SINCE 2024
          </SectionTitle>
          <p className="mt-5 text-sm font-semibold leading-relaxed text-white sm:text-base">
            OPEN FOR WALK IN 💈 More than a haircut — a complete grooming
            experience.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Personalized cuts, premium styling, and expert barbers dedicated to
            helping you look your best. Every chair starts with a free consultation
            based on your facial structure — because a fade that suits the next guy
            isn&apos;t automatically the fade that suits you.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Premium products, sanitized tools, hot towels and barbers who care about
            the details. From a ₱399 clean-up to the full 18-in-1 transformation,
            you get the same standard every time.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:max-w-md">
            {[
              { k: "PREMIUM PRODUCTS", v: "Salon-grade only" },
              { k: "EXPERT BARBERS", v: "Consultation first" },
              { k: "SATISFACTION", v: "Guaranteed finish" },
              { k: "STREET STYLE", v: "Trends, done right" },
            ].map((x) => (
              <div key={x.k} className="rounded-lg border border-line bg-card p-4">
                <p className="font-head text-[11px] tracking-[.16em] text-neon">{x.k}</p>
                <p className="mt-1 text-[12px] text-muted">{x.v}</p>
              </div>
            ))}
          </div>

          <a
            href={BRAND.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 flex items-start gap-3 rounded-xl border border-line bg-card p-4 transition-all hover:border-neon/60 hover:bg-cardhi sm:max-w-md"
          >
            <span className="mt-0.5 shrink-0 text-neon">
              <IconPin />
            </span>
            <span className="min-w-0">
              <span className="block font-head text-[11px] tracking-[.2em] text-neon">
                FIND US IN PASIG
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-white">
                {BRAND.address}
              </span>
              <span className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted">
                {BRAND.hoursLong}
              </span>
              <span className="mt-1.5 flex items-center gap-1.5 font-head text-[10px] tracking-[.16em] text-muted transition-colors group-hover:text-neon">
                OPEN IN GOOGLE MAPS
                <IconExternal className="h-2.5 w-2.5" />
              </span>
            </span>
          </a>

          <a
            href="#services"
            className="group mt-7 inline-flex items-center gap-2.5 border-b border-neon pb-1 font-head text-sm tracking-[.18em] text-neon"
          >
            SEE THE FULL MENU
            <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
