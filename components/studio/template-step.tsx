"use client";

/* eslint-disable @next/next/no-img-element */
import { Check } from "lucide-react";
import { STORIES } from "@/lib/templates";
import { useStudio } from "./studio-context";
import { StepHeading } from "./upload-step";
import { cn } from "@/lib/utils";

export function TemplateStep() {
  const { story, setStory, name } = useStudio();
  const hero = name.trim() || "your child";

  return (
    <div className="mx-auto max-w-4xl text-center">
      <StepHeading
        eyebrow="The story"
        title={`Which world should ${hero} explore?`}
        subtitle={`Every tale is written with ${hero} as the hero. Preview any of them — there's no commitment.`}
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {STORIES.map((s) => {
          const selected = story === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStory(s.id)}
              aria-pressed={selected}
              className={cn(
                "group relative flex items-stretch gap-4 overflow-hidden rounded-3xl border bg-paper p-4 text-left transition-all duration-300",
                selected
                  ? "border-coral shadow-lift ring-2 ring-coral"
                  : "border-line hover:-translate-y-1 hover:shadow-soft"
              )}
            >
              <div
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl"
                style={{ background: s.cover }}
              >
                <img
                  src={s.image}
                  alt={`${s.title} cover`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-coral-dark">
                  {s.tagline}
                </span>
                <span className="font-display text-xl font-semibold text-ink">
                  {s.title}
                </span>
                <span className="mt-1 line-clamp-2 text-sm text-ink-soft">
                  {s.description}
                </span>
                <span className="mt-auto pt-2 text-xs font-semibold text-ink-faint">
                  Ages {s.ageRange}
                </span>
              </div>
              {selected && (
                <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-coral text-white">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
