"use client";

/* eslint-disable @next/next/no-img-element */
import { SPREADS } from "@/lib/gallery";

function Row({
  items,
  reverse,
  duration,
}: {
  items: string[];
  reverse?: boolean;
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee flex overflow-hidden">
      <div
        className={`marquee-track gap-5 ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative h-56 w-56 shrink-0 overflow-hidden rounded-3xl shadow-soft ring-1 ring-white/40 sm:h-64 sm:w-64"
          >
            <img
              src={src}
              alt="A personalized book"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BookMarquee() {
  const first = SPREADS.slice(0, 8);
  const second = SPREADS.slice(8, 16);

  return (
    <section className="overflow-hidden bg-sand/40 py-16">
      <div className="mx-auto mb-10 max-w-6xl px-5 text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-coral-dark">
          Real books, real children
        </span>
        <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
          Thousands of little heroes, already in print
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        <Row items={first} duration={55} />
        <Row items={second} reverse duration={65} />
      </div>
    </section>
  );
}
