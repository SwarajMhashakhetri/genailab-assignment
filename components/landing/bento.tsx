"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { motion } from "motion/react";
import { Eye, BookOpen, Sparkles, Gift, ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/gallery";
import { Reveal } from "@/components/ui/reveal";

export function Bento() {
  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-coral-dark">
            Why families love it
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-5xl">
            Everything a keepsake should be
          </h2>
        </Reveal>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {/* Big hero tile */}
          <Reveal className="col-span-2 row-span-2" delay={0.05}>
            <Tile className="group h-full">
              <img
                src={IMAGES.reading}
                alt="A child reading their personalized book"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="relative mt-auto">
                <Eye className="h-7 w-7 text-white/90" />
                <h3 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  See the whole book before you pay
                </h3>
                <p className="mt-2 max-w-sm text-white/80">
                  No more buying blind. Flip through every illustrated page, then
                  decide. That&apos;s the whole idea.
                </p>
              </div>
            </Tile>
          </Reveal>

          {/* Stories */}
          <Reveal className="col-span-2" delay={0.12}>
            <Tile className="mesh-dark h-full justify-center text-white">
              <BookOpen className="h-7 w-7 text-butter" />
              <h3 className="font-display mt-3 text-2xl font-semibold">
                Four magical stories
              </h3>
              <p className="mt-1 text-white/70">
                Space, school, royalty &amp; the ABCs — a tale for every dreamer.
              </p>
            </Tile>
          </Reveal>

          {/* Name */}
          <Reveal delay={0.16}>
            <Tile className="group h-full">
              <img
                src={IMAGES.childName}
                alt="The child's name printed in the book"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative mt-auto">
                <h3 className="font-display text-lg font-semibold text-white">
                  Their name, woven in
                </h3>
              </div>
            </Tile>
          </Reveal>

          {/* Premium */}
          <Reveal delay={0.2}>
            <Tile className="group h-full">
              <img
                src={IMAGES.keepsake}
                alt="Premium printed keepsake book"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative mt-auto">
                <Sparkles className="h-5 w-5 text-white/90" />
                <h3 className="font-display mt-1 text-lg font-semibold text-white">
                  Premium 200gsm silk paper
                </h3>
              </div>
            </Tile>
          </Reveal>

          {/* CTA tile */}
          <Reveal className="col-span-2" delay={0.24}>
            <Link href="/create" className="block h-full">
              <Tile className="group h-full justify-between bg-coral text-white transition-colors hover:bg-coral-dark">
                <Gift className="h-7 w-7" />
                <div>
                  <h3 className="font-display text-2xl font-semibold">
                    The easiest gift you&apos;ll ever give
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-2 font-semibold">
                    Start your free preview
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Tile>
            </Link>
          </Reveal>

          {/* Stat */}
          <Reveal className="col-span-2" delay={0.28}>
            <Tile className="h-full justify-center bg-paper">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-semibold text-ink">
                  4.9
                </span>
                <span className="text-butter">★★★★★</span>
              </div>
              <p className="mt-1 text-ink-soft">
                from <span className="font-semibold text-ink">12,000+</span>{" "}
                happy families &amp; counting
              </p>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tile({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-line p-6 shadow-soft ${className}`}
    >
      {children}
    </motion.div>
  );
}
