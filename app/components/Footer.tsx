"use client";

import Image from "next/image";

import { BRAND, OPENING_HOURS, AMENITIES } from "../data";
import {
  Logo,
  IconFacebook,
  IconTikTok,
  IconExternal,
  IconStar,
  IconPin,
  IconPhone,
  IconMail,
} from "./ui";

export function Footer({ onBook }: { onBook: () => void }) {
  const socials = [
    { label: "FACEBOOK", href: BRAND.facebook, Icon: IconFacebook },
    { label: "TIKTOK", href: BRAND.tiktok, Icon: IconTikTok },
  ];

  return (
    <footer className="stone relative overflow-hidden bg-ink pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              {BRAND.taglines[0]}
              <br />
              {BRAND.est} · {BRAND.taglines[4]}
            </p>
            <div className="mt-6 inline-block rounded-md border border-neon/30 bg-card/50 px-6 py-5">
              <Image
                src="/images/logo-official.png"
                alt={`${BRAND.name} ${BRAND.sub}`}
                width={768}
                height={870}
                className="h-auto w-[116px] object-contain"
              />
            </div>
          </div>

          <div>
            <h3 className="font-head text-xs tracking-[.26em] text-neon">WORKING HOURS</h3>
            <ul className="mt-4 space-y-2 text-[13px] text-muted">
              {OPENING_HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-white">
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-line pt-3 text-[11px] leading-relaxed text-muted">
              {BRAND.hoursLong}
            </p>
            <p className="mt-2 font-head text-[10px] tracking-[.18em] text-neon">
              WALK-INS WELCOME
            </p>
          </div>

          <div>
            <h3 className="font-head text-xs tracking-[.26em] text-neon">CONTACT US</h3>
            <ul className="mt-4 space-y-3 text-[13px] text-muted">
              <li>
                <a
                  href={BRAND.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 transition-colors hover:text-neon"
                >
                  <span className="mt-[2px] shrink-0 text-neon">
                    <IconPin />
                  </span>
                  <span className="text-white transition-colors group-hover:text-neon">
                    {BRAND.address}
                    <span className="mt-0.5 flex items-center gap-1 font-head text-[10px] tracking-[.16em] text-muted">
                      VIEW ON GOOGLE MAPS
                      <IconExternal className="h-2.5 w-2.5" />
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-neon"
                >
                  <span className="shrink-0 text-neon">
                    <IconPhone />
                  </span>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-neon"
                >
                  <span className="shrink-0 text-neon">
                    <IconMail />
                  </span>
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-neon"
                >
                  <span className="shrink-0 text-neon">
                    <IconFacebook />
                  </span>
                  {BRAND.handle}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-neon"
                >
                  <span className="shrink-0 text-neon">
                    <IconTikTok />
                  </span>
                  {BRAND.tiktokHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-head text-xs tracking-[.26em] text-neon">BOOK YOUR SLOT NOW!</h3>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              Message us on our Facebook page, or lock in your chair right here in
              under a minute.
            </p>

            <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-neon/30 bg-neon/5 px-3.5 py-2.5">
              <span className="flex gap-0.5 text-neon">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar key={i} className="h-3 w-3" />
                ))}
              </span>
              <span className="font-head text-[11px] tracking-[.14em] text-white">
                {BRAND.rating}
                <span className="ml-1.5 text-muted">
                  · {BRAND.reviewCount} · Pasig
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={onBook}
              className="mt-3 w-full rounded-lg bg-blood px-5 py-3.5 font-head text-[12px] tracking-[.16em] text-white transition-all hover:scale-[1.02] hover:shadow-blood"
            >
              BOOK AN APPOINTMENT
            </button>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center gap-1.5 rounded-md border border-line px-3 py-2 font-head text-[10px] tracking-[.14em] text-muted transition-all hover:border-neon hover:text-neon"
                >
                  <s.Icon className="h-3.5 w-3.5" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="border-t border-line py-7">
          <h3 className="font-head text-xs tracking-[.26em] text-neon">
            WHAT YOU GET IN THE CHAIR
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {AMENITIES.map((a) => (
              <li
                key={a}
                className="flex items-center gap-2 rounded-md border border-line bg-card/50 px-3.5 py-2 text-[12px] text-muted"
              >
                <span className="text-neon">
                  <IconStar className="h-3 w-3" />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Big wordmark */}
        <div className="border-t border-line py-10 text-center">
          <p className="font-display text-[12vw] uppercase leading-[0.8] tracking-tighter text-white/5 sm:text-[9vw]">
            FADE EVERYTHING
          </p>
          <p className="-mt-2 font-display text-2xl uppercase tracking-tight text-neon sm:text-4xl">
            BE LEGENDARY.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-muted">
            © {new Date().getFullYear()} Street Fades Hair Studio. All rights reserved.
          </p>
          <p className="font-head text-[10px] tracking-[.22em] text-muted">
            BOOK NOW • SIT BACK • GET FADED
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
