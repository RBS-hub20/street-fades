"use client";

import { useState, useEffect } from "react";
import { BRAND } from "../data";
import { Arrow, Logo, IconFacebook, IconTikTok } from "./ui";

export const NAV = [
  { label: "HOME", href: "#home" },
  { label: "SERVICES", href: "#services" },
  { label: "LOOKBOOK", href: "#lookbook" },
  { label: "BARBERS", href: "#barbers" },
];

export function Header({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-ink/92 backdrop-blur-xl" : "border-b border-transparent bg-gradient-to-b from-ink/90 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" aria-label="Street Fades Hair Studio — home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative font-head text-xs tracking-[.22em] text-white/75 transition-colors hover:text-white"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-neon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="mr-1 hidden items-center gap-1 sm:flex">
            {[
              { label: "Facebook", href: BRAND.facebook, Icon: IconFacebook },
              { label: "TikTok", href: BRAND.tiktok, Icon: IconTikTok },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} \u2014 opens in a new tab`}
                title={`${BRAND.handle} on ${s.label}`}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-all hover:border-neon hover:text-neon"
              >
                <s.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onBook}
            className="rounded-lg bg-blood px-3 py-2 font-head text-[10px] tracking-[.14em] text-white transition-all hover:scale-[1.03] hover:shadow-blood active:scale-100 sm:px-5 sm:py-2.5 sm:text-xs"
          >
            BOOK NOW
          </button>
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menu}
            className="grid h-10 w-10 place-items-center rounded-lg border border-neon/40 bg-card/70 text-neon transition-colors hover:border-neon lg:hidden"
          >
            <span className="relative block h-3.5 w-4">
              <span className={`absolute left-0 h-[2px] w-full bg-current transition-all ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-[2px] w-full bg-current transition-all ${menu ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-[2px] w-full bg-current transition-all ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`grid overflow-hidden border-line bg-ink/97 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menu ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col px-4 py-3 sm:px-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="flex items-center justify-between border-b border-line/70 py-3.5 font-head text-sm tracking-[.2em] text-white/85 last:border-0"
              >
                {n.label}
                <span className="text-neon">
                  <Arrow className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
