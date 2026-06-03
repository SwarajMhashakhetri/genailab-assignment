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
import { UploadStep } from "@/components/studio/upload-step";
import { TemplateStep } from "@/components/studio/template-step";
import { DetailsStep } from "@/components/studio/details-step";
import { StyleStep } from "@/components/studio/style-step";
import { PreviewStep } from "@/components/studio/preview-step";
import { Button } from "@/components/ui/button";

export default function CreatePage() {
  return (
    <StudioProvider>
      <StudioShell />
    </StudioProvider>
  );
}

function StudioShell() {
  const { step, next, back, canAdvance, name } = useStudio();
  const isPreview = step === STEPS.length - 1;
  const hero = name.trim() || "your little one";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
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

      <div className="mx-auto w-full max-w-5xl px-5 py-8">
        <StepProgress />
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <DetailsStep />}
            {step === 1 && <TemplateStep />}
            {step === 2 && <StyleStep />}
            {step === 3 && <UploadStep />}
            {step === 4 && <PreviewStep />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky footer navigation (hidden on the preview, which has its own CTAs) */}
      {!isPreview && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-line/70 bg-cream/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={back}
              disabled={step === 0}
              className="disabled:opacity-0"
            >
              <ArrowLeft className="h-5 w-5" /> Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={next}
              disabled={!canAdvance}
            >
              {step === 0
                ? `Start ${hero}'s book`
                : step === 3
                  ? `Bring ${hero} to life`
                  : "Continue"}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
