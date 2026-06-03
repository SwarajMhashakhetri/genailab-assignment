"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { STORIES } from "@/lib/templates";
import { Reveal } from "@/components/ui/reveal";

export function StoryShowcase() {
  return (
    <section id="stories" className="bg-sand/50 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-coral-dark">
            The stories
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            A tale for every little dreamer
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">
            Each story is lovingly written so your child isn&apos;t just in the
            book — they&apos;re the hero of it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STORIES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.07}>
              <Link
                href="/create"
                className="group block h-full overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div
                  className="relative h-44 overflow-hidden"
                  style={{ background: s.cover }}
                >
                  <img
                    src={s.image}
                    alt={`${s.title} cover`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/30 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-coral-dark">
                    {s.tagline}
                  </span>
                  <h3 className="font-display mt-1 text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                    {s.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
