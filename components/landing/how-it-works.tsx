"use client";

import { Camera, BookHeart, Wand2, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    icon: Camera,
    title: "Upload a photo",
    body: "Any clear, front-facing snap of your child. That's all we need to begin.",
  },
  {
    icon: BookHeart,
    title: "Pick a story & style",
    body: "Choose an adventure and an art style — storybook, watercolor or lifelike.",
  },
  {
    icon: Wand2,
    title: "Preview the whole book",
    body: "Watch your child appear as the hero, and flip through every page — free.",
  },
  {
    icon: Truck,
    title: "Love it? Order it",
    body: "Only then do you check out. We print it on premium paper and ship it with care.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-coral-dark">
            How it works
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            Four gentle steps to a keepsake
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">
            No accounts, no guesswork, no paying for something you haven&apos;t
            seen. Just a lovely little moment of magic.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
                <span className="font-display absolute right-6 top-5 text-5xl font-semibold text-sand">
                  {i + 1}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coral-soft text-coral-dark">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
