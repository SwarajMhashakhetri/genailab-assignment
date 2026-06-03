"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import {
  StudioProvider,
  useStudio,
  STEPS,
} from "@/components/studio/studio-context";
import { StepProgress } from "@/components/studio/step-progress";
import { SummaryPanel } from "@/components/studio/summary-panel";
import { UploadStep } from "@/components/studio/upload-step";
import { TemplateStep } from "@/components/studio/template-step";
import { DetailsStep } from "@/components/studio/details-step";
import { StyleStep } from "@/components/studio/style-step";
import { PreviewStep } from "@/components/studio/preview-step";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CreatePage() {
  return (
    <StudioProvider>
      <StudioShell />
    </StudioProvider>
  );
}

function ActiveStep() {
  const { step } = useStudio();
  switch (step) {
    case 1:
      return <DetailsStep />;
    case 2:
      return <TemplateStep />;
    case 3:
      return <StyleStep />;
    default:
      return null;
  }
}

function StudioShell() {
  const { step } = useStudio();
  const isUpload = step === 0;
  const isPreview = step === STEPS.length - 1;
  const isForm = !isUpload && !isPreview; // steps 1–3

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-semibold text-ink"
          >
            <BookOpen className="h-5 w-5 text-coral" />
            My Clever Pages
          </Link>
          <span className="rounded-full bg-teal-soft/60 px-3 py-1 text-xs font-bold text-teal">
            Free preview · No payment yet
          </span>
        </div>
      </header>

      {!isPreview && (
        <div className="mx-auto w-full max-w-5xl px-5 py-8">
          <StepProgress />
        </div>
      )}

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16">
        {/* Step 1 — the image selector, front and centre. */}
        {isUpload && (
          <div className="mx-auto max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <UploadStep />
                <UploadNav />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Steps 2–4 — the photo is pinned on the left as a building summary
            while the questions progress on the right. */}
        {isForm && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
            <SummaryPanel />

            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <ActiveStep />
                </motion.div>
              </AnimatePresence>
              <StepNav />
            </div>
          </div>
        )}

        {/* Final — the flipbook payoff gets the full stage. */}
        {isPreview && <PreviewStep />}
      </main>
    </div>
  );
}

/** Photo step nav: the Continue button pops in the moment a photo lands. */
function UploadNav() {
  const { canAdvance, next } = useStudio();
  return (
    <div className="mt-10 flex min-h-[3.5rem] justify-center">
      <AnimatePresence>
        {canAdvance && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
          >
            <Button variant="primary" size="xl" onClick={next}>
              Continue <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Back / Next pair. Next stays disabled until the current step is valid. */
function StepNav() {
  const { step, next, back, canAdvance, name } = useStudio();
  const hero = name.trim() || "your little one";
  const isLastData = step === STEPS.length - 2; // Style → Create the book

  return (
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-line/70 pt-6">
      <Button
        variant="ghost"
        size="lg"
        onClick={back}
        disabled={step === 0}
        className="disabled:pointer-events-none disabled:opacity-0"
      >
        <ArrowLeft className="h-5 w-5" /> Back
      </Button>
      <Button variant="primary" size="lg" onClick={next} disabled={!canAdvance}>
        {isLastData ? `Create ${hero}'s book` : "Continue"}
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
