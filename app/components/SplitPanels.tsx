"use client";


export function SplitPanels({ onBook }: { onBook: (id?: string) => void }) {
  const panels = [
    {
      title: "STYLING",
      img: "/images/interior.jpg",
      body: "Perms, color and premium styling that holds its shape long after you leave the chair.",
      id: "perm",
    },
    {
      title: "HAIRCUTS",
      img: "/images/team.jpg",
      body: "Skin fades, hair art and blade shaves — the signature cuts we built our name on.",
      id: "bape-599",
    },
  ];

  return (
    <section className="grid gap-px bg-line sm:grid-cols-2">
      {panels.map((p) => (
        <div key={p.title} className="group relative h-[300px] overflow-hidden sm:h-[380px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.img}
            alt={p.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-all duration-700 group-hover:scale-[1.05] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-ink/72 transition-colors group-hover:bg-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <h3 className="font-display text-4xl uppercase leading-none tracking-tight sm:text-5xl">
              {p.title}
            </h3>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(5,5,5,.95)]">
              {p.body}
            </p>
            <button
              type="button"
              onClick={() => onBook(p.id)}
              className="mt-5 rounded-lg border border-white/25 bg-ink/70 px-6 py-3 font-head text-[11px] tracking-[.18em] text-white backdrop-blur transition-all hover:border-neon hover:bg-neon hover:text-ink"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default SplitPanels;
