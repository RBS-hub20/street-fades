"use client";


export function Marquee() {
  const items = [
    "BARBERSHOP",
    "STREETWEAR",
    "LIFESTYLE",
    "PREMIUM CUTS",
    "WALK-INS WELCOME",
    "GET FADED",
    "EST. 2024",
  ];
  const line = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-line bg-card/40 py-4">
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {[...line, ...line].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-head text-sm tracking-[.3em] text-muted">
            {t}
            <span className="text-neon">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
