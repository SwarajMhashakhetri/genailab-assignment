"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, Sparkles, Star, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { IMAGES, SPREADS } from "@/lib/gallery";

const HEADLINE = ["Once", "upon", "a", "time,", "the", "hero", "was"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="mesh aurora relative overflow-hidden px-5 pb-20 pt-36 sm:pt-44"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-ink-soft"
          >
            <Sparkles className="h-4 w-4 text-coral" />
            Preview the whole book — before you pay a cent
          </motion.span>

          <h1 className="font-display mt-7 text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[1.02] text-ink">
            {HEADLINE.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-[0.25em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + HEADLINE.length * 0.07, duration: 0.7 }}
              className="font-accent text-gradient inline-block text-[1.35em] leading-none"
            >
              your&nbsp;child.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mt-7 max-w-md text-lg text-ink-soft lg:mx-0"
          >
            Upload a photo, choose a story, and watch your little one become the
            illustrated star of their own picture book. Flip through every page,
            free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-10"
          >
            <NameLaunch />
            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-butter text-butter" />
                ))}
              </div>
              Loved by 12,000+ families · free to preview
            </div>
          </motion.div>
        </div>

        {/* Parallax book deck */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="perspective relative mx-auto h-[420px] w-full max-w-md sm:h-[480px]"
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY }}
            className="preserve-3d relative h-full w-full"
          >
            <DeckCard
              src={SPREADS[0]}
              className="left-0 top-6 w-[68%] -rotate-6"
              z={20}
            />
            <DeckCard
              src={IMAGES.hero}
              className="right-0 top-0 w-[72%] rotate-3"
              z={40}
              translateZ={60}
            />
            <DeckCard
              src={SPREADS[4]}
              className="bottom-0 left-8 w-[60%] rotate-2"
              z={30}
              translateZ={30}
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(90px)" }}
              className="absolute -right-2 top-1/2 z-50 flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-sm font-bold text-white shadow-lift"
            >
              <Sparkles className="h-4 w-4" /> Made with AI
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* break-the-4th-wall scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-16 flex items-center justify-center gap-2 text-sm font-medium text-ink-faint"
      >
        <MousePointer2 className="h-4 w-4" />
        <span>Yes, you — keep scrolling. The magic is just below.</span>
      </motion.div>
    </section>
  );
}

function NameLaunch() {
  const router = useRouter();
  const [n, setN] = useState("");
  const clean = n.trim();

  const launch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(clean ? `/create?name=${encodeURIComponent(clean)}` : "/create");
  };

  return (
    <form
      onSubmit={launch}
      className="flex w-full max-w-lg flex-col gap-3 sm:flex-row"
    >
      <input
        value={n}
        onChange={(e) => setN(e.target.value.slice(0, 20))}
        placeholder="Type their first name…"
        aria-label="Your child's first name"
        autoComplete="off"
        className="glass h-16 flex-1 rounded-full px-6 text-lg text-ink outline-none transition placeholder:text-ink-faint focus:border-coral focus:ring-2 focus:ring-coral/30"
      />
      <Magnetic>
        <Button type="submit" size="xl" className="w-full sm:w-auto">
          {clean ? `Start ${clean}'s book` : "Start free"}
          <ArrowRight className="h-6 w-6" />
        </Button>
      </Magnetic>
    </form>
  );
}

function DeckCard({
  src,
  className,
  z,
  translateZ = 0,
}: {
  src: string;
  className: string;
  z: number;
  translateZ?: number;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/40 ${className}`}
      style={{ zIndex: z, transform: `translateZ(${translateZ}px)` }}
    >
      <img src={src} alt="A personalized children's book" className="w-full" />
    </div>
  );
}
