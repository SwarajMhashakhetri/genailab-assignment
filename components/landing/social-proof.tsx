"use client";

import { Star, Quote, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const REVIEWS = [
  {
    quote:
      "My grandson gasped when he saw himself flying a rocket. We read it every single night now.",
    name: "Eleanor M.",
    role: "Grandma of one very happy astronaut",
  },
  {
    quote:
      "Being able to see the whole book first sold me instantly. The likeness was uncanny and so sweet.",
    name: "Priya R.",
    role: "Mum of two",
  },
  {
    quote:
      "Easiest gift I've ever made. I'm not techy at all and it took me five minutes.",
    name: "Walter G.",
    role: "Proud grandpa",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "Full refund if you're not delighted" },
  { icon: Truck, label: "Free shipping & returns" },
  { icon: RefreshCw, label: "Premium 200gsm silk paper" },
];

export function SocialProof() {
  return (
    <section id="love" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-coral-dark">
            Family favourite
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            Loved by parents &amp; grandparents alike
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-paper p-7">
                <Quote className="h-8 w-8 text-coral/40" />
                <div className="mt-3 flex">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-butter text-butter" />
                  ))}
                </div>
                <blockquote className="font-display mt-4 flex-1 text-lg leading-relaxed text-ink">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <div className="font-semibold text-ink">{r.name}</div>
                  <div className="text-sm text-ink-faint">{r.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 text-sm font-semibold text-ink-soft"
              >
                <t.icon className="h-5 w-5 text-teal" />
                {t.label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
