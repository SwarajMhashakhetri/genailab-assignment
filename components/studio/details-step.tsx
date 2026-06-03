"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { useStudio } from "./studio-context";
import { StepHeading } from "./upload-step";

export function DetailsStep() {
  const { name, setName, age, setAge } = useStudio();

  // Only greet once the parent has stopped typing — a debounce keeps the
  // reassurance line from re-firing on every keystroke (no jittery "Hi, M…").
  const [settledName, setSettledName] = useState(name.trim());
  useEffect(() => {
    const id = setTimeout(() => setSettledName(name.trim()), 650);
    return () => clearTimeout(id);
  }, [name]);

  return (
    <div className="mx-auto max-w-xl text-center">
      <StepHeading
        eyebrow="Let's begin"
        title="Who are we making a book for?"
        subtitle="Just a first name to start — we'll weave it through every single page."
      />

      <div className="mt-10 space-y-8 text-left">
        <div>
          <label
            htmlFor="child-name"
            className="mb-2 block text-base font-bold text-ink"
          >
            Child&apos;s first name
          </label>
          <input
            id="child-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mia"
            autoComplete="off"
            maxLength={20}
            className="w-full rounded-2xl border border-line bg-paper px-5 py-4 text-xl text-ink shadow-sm outline-none transition placeholder:text-ink-faint focus:border-coral"
          />
        </div>

        <div>
          <span className="mb-2 block text-base font-bold text-ink">
            How old are they?
          </span>
          <div className="flex items-center justify-between rounded-2xl border border-line bg-paper px-5 py-3">
            <button
              type="button"
              onClick={() => setAge(Math.max(1, age - 1))}
              aria-label="Decrease age"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink transition hover:bg-coral-soft active:scale-95"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="font-display text-4xl font-semibold leading-none text-ink">
                {age}
              </div>
              <div className="text-sm text-ink-faint">years old</div>
            </div>
            <button
              type="button"
              onClick={() => setAge(Math.min(12, age + 1))}
              aria-label="Increase age"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink transition hover:bg-coral-soft active:scale-95"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-14 text-center">
          <AnimatePresence mode="wait">
            {settledName && (
              <motion.p
                key={settledName}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-display text-2xl text-coral-dark"
              >
                &ldquo;Hi, I&apos;m {settledName}! Let&apos;s go on an
                adventure.&rdquo;
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
