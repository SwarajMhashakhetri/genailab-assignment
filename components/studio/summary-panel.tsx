"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ImageUp, Check } from "lucide-react";
import { useStudio } from "./studio-context";
import { getStory, getStyle } from "@/lib/templates";

/**
 * The static, sticky companion to the wizard. The uploaded photo is the
 * emotional anchor and never moves; the details fill in beneath it as the
 * parent progresses, so the book visibly takes shape in real time.
 */
export function SummaryPanel() {
  const { photoUrl, name, age, story, style, goTo } = useStudio();

  const trimmed = name.trim();
  const storyMeta = story ? getStory(story) : null;
  const styleMeta = style ? getStyle(style) : null;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
        {/* The photo — the constant hero of the experience. */}
        <div className="relative aspect-square w-full bg-sand">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt="Your child's photo"
              fill
              unoptimized
              className="object-cover"
            />
          ) : null}
          <button
            type="button"
            onClick={() => goTo(0)}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-ink"
          >
            <ImageUp className="h-3.5 w-3.5" /> Change photo
          </button>
        </div>

        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-coral-dark">
            Your book so far
          </p>

          <dl className="mt-3 space-y-2.5">
            <SummaryRow
              show={!!trimmed}
              label="Hero"
              value={trimmed ? `${trimmed} · ${age} years` : ""}
              onEdit={() => goTo(1)}
            />
            <SummaryRow
              show={!!storyMeta}
              label="Story"
              value={storyMeta?.title ?? ""}
              thumb={storyMeta?.image}
              onEdit={() => goTo(2)}
            />
            <SummaryRow
              show={!!styleMeta}
              label="Art style"
              value={styleMeta?.title ?? ""}
              thumb={styleMeta?.image}
              onEdit={() => goTo(3)}
            />
          </dl>

          {!trimmed && !storyMeta && !styleMeta && (
            <p className="mt-3 text-sm text-ink-faint">
              Answer a few quick questions and watch {trimmed || "their"} book
              come together right here.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({
  show,
  label,
  value,
  thumb,
  onEdit,
}: {
  show: boolean;
  label: string;
  value: string;
  thumb?: string;
  onEdit: () => void;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <button
            type="button"
            onClick={onEdit}
            className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-cream/50 p-2.5 text-left transition hover:border-coral/50 hover:bg-coral-soft/30"
          >
            {thumb ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={thumb}
                alt=""
                className="h-10 w-10 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal">
                <Check className="h-5 w-5" />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {label}
              </span>
              <span className="block truncate font-semibold text-ink">
                {value}
              </span>
            </span>
            <span className="text-xs font-semibold text-ink-faint opacity-0 transition group-hover:opacity-100">
              Edit
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
