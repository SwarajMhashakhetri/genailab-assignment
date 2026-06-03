"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Wand2 } from "lucide-react";
import { IMAGES, SPREADS } from "@/lib/gallery";

export function PhotoToStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const photoOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.82]);
  const photoBlur = useTransform(
    scrollYProgress,
    [0.2, 0.45],
    ["blur(0px)", "blur(8px)"]
  );
  const bookOpacity = useTransform(scrollYProgress, [0.4, 0.62], [0, 1]);
  const bookScale = useTransform(scrollYProgress, [0.4, 1], [0.92, 1.04]);
  const sweepX = useTransform(scrollYProgress, [0.25, 0.6], ["-130%", "130%"]);
  const sweepOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.42, 0.6],
    [0, 1, 0]
  );

  const cap1 = useTransform(scrollYProgress, [0.05, 0.2, 0.38], [0, 1, 0]);
  const cap2 = useTransform(scrollYProgress, [0.4, 0.5, 0.62], [0, 1, 0]);
  const cap3 = useTransform(scrollYProgress, [0.64, 0.78, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-cream">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <motion.h2
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
          className="font-display mb-10 text-center text-3xl font-semibold text-ink sm:text-5xl"
        >
          A photo becomes a story.
        </motion.h2>

        {/* Stage */}
        <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md">
          {/* Photo layer */}
          <motion.div
            style={{ opacity: photoOpacity, scale: photoScale, filter: photoBlur }}
            className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/50"
          >
            <img
              src={IMAGES.girlPhone}
              alt="A child's photo"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-4 py-1 text-sm font-medium text-white backdrop-blur">
              Just an ordinary photo
            </span>
          </motion.div>

          {/* Book layer */}
          <motion.div
            style={{ opacity: bookOpacity, scale: bookScale }}
            className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/50"
          >
            <img
              src={SPREADS[0]}
              alt="The finished illustrated book"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Magic sweep */}
          <motion.div
            aria-hidden
            style={{ x: sweepX, opacity: sweepOpacity }}
            className="pointer-events-none absolute inset-y-0 -inset-x-10 z-30 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md"
          />
        </div>

        {/* Captions */}
        <div className="relative mt-10 h-16 w-full max-w-md text-center">
          <Caption opacity={cap1} icon>
            Start with any snapshot you love.
          </Caption>
          <Caption opacity={cap2} icon>
            A sprinkle of AI keeps their likeness…
          </Caption>
          <Caption opacity={cap3} icon>
            …and they&apos;re the hero of the whole book.
          </Caption>
        </div>
      </div>
    </section>
  );
}

function Caption({
  children,
  opacity,
  icon,
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  icon?: boolean;
}) {
  return (
    <motion.p
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center gap-2 text-lg font-semibold text-ink-soft"
    >
      {icon && <Wand2 className="h-5 w-5 text-coral" />}
      {children}
    </motion.p>
  );
}
