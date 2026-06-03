"use client";

/* eslint-disable @next/next/no-img-element */
import { Check } from "lucide-react";
import { STYLES } from "@/lib/templates";
import { useStudio } from "./studio-context";
import { StepHeading } from "./upload-step";
import { cn } from "@/lib/utils";

export function StyleStep() {
  const { style, setStyle, name } = useStudio();
  const hero = name.trim() || "your child";

  return (
    <div className="mx-auto max-w-4xl text-center">
      <StepHeading
        eyebrow="The look"
        title={`How should ${hero} be painted?`}
        subtitle="The same lovable face — three beautiful ways. Pick a favorite; you can try the others in a moment."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {STYLES.map((s) => {
          const selected = style === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyle(s.id)}
              aria-pressed={selected}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-paper p-5 text-center transition-all duration-300",
                selected
                  ? "border-coral shadow-lift ring-2 ring-coral"
                  : "border-line hover:-translate-y-1.5 hover:shadow-soft"
              )}
            >
              <div
                className="relative mx-auto h-32 w-full overflow-hidden rounded-2xl"
                style={{ background: s.swatch }}
              >
                <img
                  src={s.image}
                  alt={`${s.title} art style sample`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{s.description}</p>
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
