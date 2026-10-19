"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { BRAND } from "../data";

export type GlyphKey = "scissors" | "drop" | "spark" | "hands" | "mist" | "mask" | "comb" | "towel" | "chat";

export function Glyph({ name, className = "h-4 w-4" }: { name: GlyphKey; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<GlyphKey, JSX.Element> = {
    scissors: (
      <g {...p}>
        <circle cx="6" cy="18" r="2.6" />
        <circle cx="18" cy="18" r="2.6" />
        <path d="M8.1 16.1 19 4M15.9 16.1 5 4" />
      </g>
    ),
    drop: (
      <g {...p}>
        <path d="M12 3s5.5 6.1 5.5 9.8A5.5 5.5 0 0 1 12 18.3a5.5 5.5 0 0 1-5.5-5.5C6.5 9.1 12 3 12 3Z" />
      </g>
    ),
    spark: (
      <g {...p}>
        <path d="M12 3.2 13.7 9l5.8 1.7-5.8 1.7L12 18.2l-1.7-5.8L4.5 10.7 10.3 9 12 3.2Z" />
      </g>
    ),
    hands: (
      <g {...p}>
        <path d="M8 13V5.6a1.6 1.6 0 0 1 3.2 0V11M11.2 11V4.4a1.6 1.6 0 0 1 3.2 0V11" />
        <path d="M14.4 11V6.4a1.6 1.6 0 0 1 3.2 0V15a5.5 5.5 0 0 1-5.5 5.5h-1A5.1 5.1 0 0 1 6 15.4L4.8 12a1.5 1.5 0 0 1 2.6-1.4L8 11.8" />
      </g>
    ),
    mist: (
      <g {...p}>
        <path d="M4 14h6M4 17.5h8M4 10.5h4" />
        <path d="M14 6.5h3.5a2.5 2.5 0 0 1 0 5H14z" />
        <path d="M18 4.5v2M20.5 6.2l-1.4 1.1" />
      </g>
    ),
    mask: (
      <g {...p}>
        <path d="M4.5 7.5c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3c0 5.6-2.7 12-7.5 12S4.5 13.1 4.5 7.5Z" />
        <path d="M9 10.5h.01M15 10.5h.01M9.8 15.2c1.4.9 3 .9 4.4 0" />
      </g>
    ),
    comb: (
      <g {...p}>
        <path d="M3.5 9.5h17M6 9.5v8M10 9.5v8M14 9.5v8M18 9.5v8M3.5 6.5h17" />
      </g>
    ),
    towel: (
      <g {...p}>
        <path d="M5 5.5h11a3 3 0 0 1 3 3v10H8a3 3 0 0 1-3-3z" />
        <path d="M16 5.5a3 3 0 0 0-3 3v10" />
      </g>
    ),
    chat: (
      <g {...p}>
        <path d="M20 12.5a7 7 0 0 1-7 7H8l-4 2.5.9-3.4A7 7 0 0 1 4.9 8 7 7 0 0 1 13 5.5a7 7 0 0 1 7 7Z" />
        <path d="M9 12.3h.01M12 12.3h.01M15 12.3h.01" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/**
 * Crops one person out of the group shot. `object-fit: cover` only ever hides
 * ~45% of this photo, so we oversize the image and pan instead.
 */
export function BarberPhoto({
  x,
  y = 12,
  zoom = 5,
  className = "",
}: {
  x: number;
  y?: number;
  zoom?: number;
  className?: string;
}) {
  const posX = Math.min(100, Math.max(0, ((zoom * x - 0.5) / (zoom - 1)) * 100));
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        backgroundImage: "url(/images/team.jpg)",
        backgroundSize: `${zoom * 100}% auto`,
        backgroundPosition: `${posX}% ${y}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export function Check({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#7ED321" />
      <path d="m7.8 12.3 2.8 2.8 5.6-5.9" fill="none" stroke="#050505" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BrushBadge({
  children,
  tone = "neon",
  className = "",
}: {
  children: ReactNode;
  tone?: "neon" | "red";
  className?: string;
}) {
  return (
    <span
      className={`brush inline-block px-4 py-1.5 ${
        tone === "red" ? "bg-blood" : "bg-neon"
      } ${className}`}
    >
      <span
        className={`brush-inner block font-head text-[11px] tracking-[.14em] ${
          tone === "red" ? "text-white" : "text-ink"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-8 bg-neon" />
      <span className="font-head text-xs tracking-[.3em] text-neon">{children}</span>
    </div>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/images/sf-monogram.png"
        alt={`${BRAND.name} ${BRAND.sub}`}
        width={96}
        height={96}
        priority
        className={`shrink-0 object-contain ${compact ? "h-9 w-9" : "h-9 w-9 sm:h-11 sm:w-11"}`}
      />
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[17px] uppercase leading-none tracking-tight text-white sm:text-[19px]">
            {BRAND.name}
            <span className="align-super text-[8px] text-neon">®</span>
          </span>
          <span className="mt-[3px] block font-head text-[9px] tracking-[.32em] text-muted">
            {BRAND.sub}
          </span>
        </span>
      )}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-head text-[10px] tracking-[.24em] text-muted">{label}</span>
      {children}
    </label>
  );
}

/* ── Social + utility marks ─────────────────────────────────────────── */

export function IconFacebook({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5H16l.45-3H13.5V8.6c0-.87.24-1.46 1.49-1.46h1.59V4.46c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.87 1.4-3.87 3.98v2.18H8v3h2.39V21h3.11z" />
    </svg>
  );
}

export function IconTikTok({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 3h-3.05v12.3a2.56 2.56 0 1 1-1.84-2.46v-3.1a5.63 5.63 0 1 0 4.89 5.57V9.2a6.9 6.9 0 0 0 4.03 1.29V7.43A3.9 3.9 0 0 1 16.6 3z" />
    </svg>
  );
}

export function IconInstagram({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconExternal({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function IconStar({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="m12 3.5 2.6 5.27 5.82.85-4.21 4.1 1 5.78L12 16.77 6.79 19.5l1-5.78-4.21-4.1 5.82-.85L12 3.5z" />
    </svg>
  );
}

export function IconMail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconPhone({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}
