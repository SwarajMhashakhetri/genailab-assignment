"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { STEPS, useStudio } from "./studio-context";
import { cn } from "@/lib/utils";

export function StepProgress() {
  const { step, goTo, name } = useStudio();
  const hero = name.trim();
  const percent = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <nav aria-label="Progress" className="w-full">
      {/* Goal-gradient header: a visible, naming progress meter that makes the
          finished book feel within reach and pulls the parent forward. */}
      <div className="mx-auto mb-6 max-w-md text-center">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-ink">
            {hero ? `${hero}'s book` : "Your book"}
          </span>
          <span className="font-bold text-coral-dark">{percent}% ready</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-coral to-teal"
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs font-semibold text-teal"
          >
            {step >= 3 ? "So close — one last touch! 🎉" : "You're more than halfway there!"}
          </motion.p>
        )}
      </div>

      <ol className="flex items-center justify-center gap-1.5 sm:gap-3">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex items-center gap-1.5 sm:gap-3">
              <button
                type="button"
                onClick={() => i <= step && goTo(i)}
                disabled={i > step}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "group flex items-center gap-2 rounded-full px-2 py-1 transition",
                  i <= step ? "cursor-pointer" : "cursor-default"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                    done && "bg-teal text-white",
                    active && "bg-coral text-white",
                    !done && !active && "bg-sand text-ink-faint"
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-semibold sm:inline transition-colors",
                    active ? "text-ink" : "text-ink-faint"
                  )}
                >
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span className="relative block h-0.5 w-5 overflow-hidden rounded-full bg-sand sm:w-10">
                  <motion.span
                    className="absolute inset-0 bg-teal"
                    initial={false}
                    animate={{ scaleX: done ? 1 : 0 }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
