"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SPREADS } from "@/lib/gallery";

export function InsideGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-80%"]);

  const cards = SPREADS.slice(0, 10);

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 max-w-6xl px-5 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blush">
            Peek inside
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-5xl">
            Every page is a little piece of magic
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-[5vw]">
          {cards.map((src, i) => (
            <div
              key={i}
              className="relative h-[58vh] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/10 sm:w-[460px]"
            >
              <img
                src={src}
                alt={`Inside a personalized book, page ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 font-display text-sm font-semibold text-ink backdrop-blur">
                {i + 1}
              </span>
            </div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-white/50">
          Keep scrolling to wander through the shelf →
        </p>
      </div>
    </section>
  );
}
