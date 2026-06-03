"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { UploadCloud, ImageUp, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useStudio } from "./studio-context";
import { cn } from "@/lib/utils";

const MAX_MB = 10;

export function UploadStep() {
  const { photoUrl, setPhoto, clearPhoto, name } = useStudio();
  const hero = name.trim() || "your little one";

  const onDrop = useCallback(
    (accepted: File[], rejected: { file: File }[]) => {
      if (rejected.length) {
        toast.error("Please choose a JPG or PNG photo under 10 MB.");
        return;
      }
      const f = accepted[0];
      if (!f) return;
      if (f.size > MAX_MB * 1024 * 1024) {
        toast.error("That photo is a little large — please keep it under 10 MB.");
        return;
      }
      setPhoto(f, URL.createObjectURL(f));
    },
    [setPhoto]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
    noClick: !!photoUrl,
  });

  return (
    <div className="mx-auto max-w-2xl text-center">
      <StepHeading
        eyebrow="Last step ✨"
        title={`Now, let's bring ${hero} to life`}
        subtitle="One clear, front-facing photo — like a school photo — is all it takes. We keep that sweet face recognizable in every illustration."
      />

      {!photoUrl ? (
        <div
          {...getRootProps()}
          className={cn(
            "group relative mt-10 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-paper px-6 py-16 text-center transition-all duration-300",
            isDragActive
              ? "border-coral bg-coral-soft/40 scale-[1.01]"
              : "border-line hover:border-coral/60 hover:bg-sand/40"
          )}
        >
          <input {...getInputProps()} aria-label="Upload a photo of your child" />
          <motion.div
            animate={{ y: isDragActive ? -6 : 0 }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-coral-soft text-coral-dark"
          >
            <UploadCloud className="h-10 w-10" />
          </motion.div>
          <p className="mt-6 text-xl font-bold text-ink">
            {isDragActive ? "Drop the photo right here" : "Drag a photo here"}
          </p>
          <p className="mt-2 text-ink-soft">
            or{" "}
            <span className="font-semibold text-coral-dark underline-offset-4 group-hover:underline">
              browse your device
            </span>
          </p>
          <p className="mt-6 text-sm text-ink-faint">
            JPG, PNG or WebP · up to {MAX_MB} MB
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10"
        >
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={photoUrl}
              alt="Your uploaded photo"
              fill
              unoptimized
              className="object-cover"
            />
            <button
              type="button"
              onClick={clearPhoto}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur transition hover:bg-ink"
              aria-label="Remove photo"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={open}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-coral-dark"
            >
              <ImageUp className="h-4 w-4" /> Choose a different photo
            </button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-soft/60 px-4 py-2 text-sm font-medium text-teal">
            <Sparkles className="h-4 w-4" /> Perfect — {hero} is going to be a
            wonderful hero
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function StepHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <span className="inline-block rounded-full bg-coral-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-coral-dark">
        {eyebrow}
      </span>
      <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">{subtitle}</p>
      )}
    </div>
  );
}
