"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Sparkles,
  RefreshCw,
  Heart,
  AlertCircle,
  Wand2,
  Palette,
  BookOpen,
  Camera,
  X,
  Check,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useStudio } from "./studio-context";
import { buildBook } from "@/lib/books";
import { getStory, getStyle, STYLES, type StyleId } from "@/lib/templates";
import { BookReader } from "@/components/book/book-reader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

const LOADING_LINES = [
  "Warming up the paintbrushes…",
  "Sketching {name} into the story…",
  "Mixing just the right colors…",
  "Adding a sprinkle of magic…",
  "Turning the very first page…",
];

export function PreviewStep() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const {
    file,
    story,
    name,
    age,
    style,
    generatedImage,
    setGeneratedImage,
    setStyle,
    goTo,
  } = useStudio();

  const [status, setStatus] = useState<Status>("idle");
  const [lineIdx, setLineIdx] = useState(0);
  const [regenOpen, setRegenOpen] = useState(false);
  // Bumped on every successful generation so the flipbook fully remounts and
  // never shows a stale illustration after a style change.
  const [version, setVersion] = useState(0);
  const startedRef = useRef(false);

  const generate = useCallback(
    async (styleOverride?: StyleId) => {
      if (!file || !story) return;
      const useStyle = styleOverride ?? style;
      if (!useStyle) return;

      setStatus("loading");
      setGeneratedImage(null);

      try {
        const fd = new FormData();
        fd.append("image", file);
        fd.append("story", story);
        fd.append("style", useStyle);
        fd.append("name", name);
        fd.append("age", String(age));

        const res = await fetch("/api/generate", { method: "POST", body: fd });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Generation failed");

        setGeneratedImage(data.image);
        setVersion((v) => v + 1);
        setStatus("done");
      } catch (err) {
        setStatus("error");
        toast.error(
          err instanceof Error ? err.message : "Something went wrong."
        );
      }
    },
    [file, story, style, name, age, setGeneratedImage]
  );

  // Kick off generation once when the step mounts.
  useEffect(() => {
    if (!startedRef.current && !generatedImage) {
      startedRef.current = true;
      generate();
    } else if (generatedImage) {
      // Returning to a step that already has art — show it immediately.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("done");
    }
  }, [generate, generatedImage]);

  // Cycle the friendly loading lines.
  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(
      () => setLineIdx((i) => (i + 1) % LOADING_LINES.length),
      2200
    );
    return () => clearInterval(id);
  }, [status]);

  const handleStyleSwitch = (id: StyleId) => {
    if (id === style || status === "loading") return;
    setStyle(id);
    generate(id);
  };

  const goToCheckout = () => {
    if (!story) return;
    const s = getStory(story);
    sessionStorage.setItem(
      "mcp_order",
      JSON.stringify({
        title: s.title,
        name: name.trim(),
        style: style ? getStyle(style).title : "",
        cover: generatedImage,
      })
    );
    router.push("/checkout");
  };

  const storyMeta = story ? getStory(story) : null;
  const pages = story ? buildBook(story, name, age) : [];

  return (
    <div className="mx-auto max-w-4xl">
      <AnimatePresence mode="wait">
        {status === "loading" && (
          <LoadingState key="loading" line={LOADING_LINES[lineIdx].replace("{name}", name.trim() || "your child")} />
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-md rounded-3xl border border-line bg-paper p-10 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-soft text-coral-dark">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="font-display mt-5 text-2xl font-semibold text-ink">
              Our illustrator needs a moment
            </h2>
            <p className="mt-2 text-ink-soft">
              The magic didn&apos;t come through that time. Let&apos;s give it
              another go.
            </p>
            <Button onClick={() => generate()} size="lg" className="mt-6">
              <RefreshCw className="h-5 w-5" /> Try again
            </Button>
          </motion.div>
        )}

        {status === "done" && storyMeta && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {!reduceMotion && <Confetti />}
            <div className="relative text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-soft/70 px-4 py-1.5 text-sm font-bold text-teal">
                <Sparkles className="h-4 w-4" /> Meet the star of the show
              </span>
              <motion.h1
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 16 }}
                className="font-display mt-4 text-3xl font-semibold text-ink sm:text-4xl"
              >
                <span className="font-accent text-gradient text-[1.3em]">
                  {name.trim() || "Your child"}
                </span>
                , the hero of their very own book
              </motion.h1>
              <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                It&apos;s real — turn every page below. When you fall in love
                with it, your keepsake is one tap away. You only pay now that
                you&apos;ve already seen it.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-cream p-3 shadow-soft sm:p-6">
              <BookReader
                key={version}
                pages={pages}
                story={storyMeta}
                generatedImage={generatedImage}
              />
            </div>

            {/* Style switcher */}
            <div className="mt-8 text-center">
              <p className="text-sm font-semibold text-ink-soft">
                Try another art style
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleStyleSwitch(s.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold transition",
                      style === s.id
                        ? "border-coral bg-coral-soft text-coral-dark"
                        : "border-line bg-paper text-ink-soft hover:border-coral/60 hover:text-ink"
                    )}
                  >
                    <img
                      src={s.image}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <Button onClick={goToCheckout} size="xl" className="w-full max-w-md">
                <Heart className="h-6 w-6" /> I love it — make {name.trim() || "my"}
                {name.trim() ? "'s" : ""} book
              </Button>
              <button
                type="button"
                onClick={() => setRegenOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-coral-dark"
              >
                <Wand2 className="h-4 w-4" /> Regenerate this illustration
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RegenerateDialog
        open={regenOpen}
        currentStyle={style}
        onClose={() => setRegenOpen(false)}
        onSameSettings={() => {
          setRegenOpen(false);
          generate();
        }}
        onPickStyle={(id) => {
          setRegenOpen(false);
          setStyle(id);
          generate(id);
        }}
        onChangeStory={() => {
          setRegenOpen(false);
          // Drop the old art so a fresh one is painted for the new story.
          setGeneratedImage(null);
          goTo(2); // Story step
        }}
        onChangePhoto={() => {
          setRegenOpen(false);
          setGeneratedImage(null);
          goTo(0); // Photo step
        }}
      />
    </div>
  );
}

/* --------------------------- regenerate dialog --------------------------- */

function RegenerateDialog({
  open,
  currentStyle,
  onClose,
  onSameSettings,
  onPickStyle,
  onChangeStory,
  onChangePhoto,
}: {
  open: boolean;
  currentStyle: StyleId | null;
  onClose: () => void;
  onSameSettings: () => void;
  onPickStyle: (id: StyleId) => void;
  onChangeStory: () => void;
  onChangePhoto: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="regen-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="What would you like to change?"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="relative w-full max-w-lg rounded-3xl border border-line bg-paper p-6 shadow-lift sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-sand text-ink-soft transition hover:bg-coral-soft hover:text-coral-dark"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-2xl font-semibold text-ink">
              What should we change?
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Tell us what to tweak and we&apos;ll paint a fresh illustration.
            </p>

            {/* Art style */}
            <div className="mt-6">
              <p className="flex items-center gap-2 text-sm font-bold text-ink">
                <Palette className="h-4 w-4 text-coral-dark" /> A different art
                style
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {STYLES.map((s) => {
                  const active = currentStyle === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onPickStyle(s.id)}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl border text-left transition",
                        active
                          ? "border-coral ring-2 ring-coral"
                          : "border-line hover:-translate-y-0.5 hover:shadow-soft"
                      )}
                    >
                      <img
                        src={s.image}
                        alt={`${s.title} sample`}
                        className="h-20 w-full object-cover"
                      />
                      <span className="block px-2 py-1.5 text-center text-xs font-semibold text-ink">
                        {s.title}
                      </span>
                      {active && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Other options */}
            <div className="mt-6 space-y-2.5">
              <DialogRow
                icon={<BookOpen className="h-5 w-5" />}
                title="A different story"
                subtitle="Pick another magical world"
                onClick={onChangeStory}
              />
              <DialogRow
                icon={<Camera className="h-5 w-5" />}
                title="A different photo"
                subtitle="Upload a clearer or new picture"
                onClick={onChangePhoto}
              />
              <DialogRow
                icon={<RefreshCw className="h-5 w-5" />}
                title="Just a fresh take"
                subtitle="Same settings, brand-new illustration"
                onClick={onSameSettings}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DialogRow({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-line bg-cream/50 p-3 text-left transition hover:border-coral/60 hover:bg-coral-soft/40"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral-soft text-coral-dark">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-sm text-ink-soft">{subtitle}</span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
    </button>
  );
}

const CONFETTI = [
  { x: -180, r: 220, c: "#edca8c", d: 0 },
  { x: -140, r: -160, c: "#afc5ab", d: 0.05 },
  { x: -100, r: 300, c: "#e0a86b", d: 0.12 },
  { x: -60, r: -240, c: "#56744a", d: 0.02 },
  { x: -28, r: 180, c: "#edca8c", d: 0.18 },
  { x: 0, r: -120, c: "#c98a4a", d: 0.08 },
  { x: 30, r: 260, c: "#afc5ab", d: 0.15 },
  { x: 64, r: -200, c: "#56744a", d: 0.04 },
  { x: 104, r: 160, c: "#edca8c", d: 0.1 },
  { x: 146, r: -300, c: "#e0a86b", d: 0.06 },
  { x: 184, r: 240, c: "#c98a4a", d: 0.14 },
  { x: 220, r: -180, c: "#afc5ab", d: 0.2 },
];

function Confetti() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center overflow-hidden"
    >
      <div className="relative h-0 w-full max-w-md">
        {CONFETTI.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -10, x: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: 280, x: p.x, rotate: p.r }}
            transition={{ duration: 1.7, delay: p.d, ease: "easeOut" }}
            className="absolute left-1/2 top-4 h-2.5 w-2.5 rounded-[2px]"
            style={{ background: p.c }}
          />
        ))}
      </div>
    </div>
  );
}

function LoadingState({ line }: { line: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center py-16 text-center"
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-coral/20"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-coral"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
        <Wand2 className="h-10 w-10 text-coral-dark" />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="font-display mt-8 text-2xl text-ink"
        >
          {line}
        </motion.p>
      </AnimatePresence>
      <p className="mt-3 text-sm text-ink-faint">
        This usually takes 15–30 seconds — worth the wait, we promise.
      </p>
    </motion.div>
  );
}
