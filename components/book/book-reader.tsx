"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BookPage } from "@/lib/books";
import type { StoryTemplate } from "@/lib/templates";
import { BookControls } from "./book-controls";
import { cn } from "@/lib/utils";

// react-pageflip ships loose types; alias to a permissive component.
const FlipBook = HTMLFlipBook as unknown as React.ComponentType<
  Record<string, unknown> & { children: React.ReactNode }
>;

// Minimal shape of the StPageFlip instance we actually call.
type PageFlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
  flip: (page: number) => void;
};
type FlipBookHandle = { pageFlip: () => PageFlipApi | undefined };

const Page = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <div ref={ref} className={cn("h-full w-full overflow-hidden", className)}>
    {children}
  </div>
));
Page.displayName = "Page";

export function BookReader({
  pages,
  story,
  generatedImage,
}: {
  pages: BookPage[];
  story: StoryTemplate;
  generatedImage: string | null;
}) {
  const bookRef = React.useRef<FlipBookHandle | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState(0);
  const [isFs, setIsFs] = React.useState(false);

  const total = pages.length;

  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();
  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const jump = (n: number) => {
    if (Number.isNaN(n)) return;
    const target = Math.max(0, Math.min(total - 1, n));
    bookRef.current?.pageFlip()?.flip(target);
  };
  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen?.();
  };

  // Keep the fullscreen toggle in sync with the actual document state
  // (covers Esc-to-exit, which doesn't go through our button).
  React.useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Keyboard navigation: arrow keys turn pages.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flipNext();
      else if (e.key === "ArrowLeft") flipPrev();
    };
    const el = wrapRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={wrapRef}
      tabIndex={-1}
      className={cn(
        "flex w-full flex-col items-center bg-cream py-2 outline-none",
        isFs && "min-h-screen justify-center"
      )}
    >
      {/* Book stage — arrows overlay the page edges so the layout never
          overflows on small screens (the old in-flow arrows did). */}
      <div
        className={cn(
          "relative mx-auto",
          isFs ? "w-[min(900px,94vw)]" : "w-[min(680px,90vw)]"
        )}
      >
        <FlipBook
          // react-pageflip builds its pages once on mount and ignores later
          // prop changes — re-key on the image so a new style re-initializes it.
          key={generatedImage ?? "placeholder"}
          ref={bookRef as React.Ref<unknown>}
          width={340}
          height={460}
          size="stretch"
          minWidth={255}
          maxWidth={600}
          minHeight={340}
          maxHeight={820}
          maxShadowOpacity={0.4}
          showCover
          mobileScrollSupport
          flippingTime={700}
          usePortrait
          autoSize
          drawShadow
          className="book-shadow rounded-r-xl"
          style={{}}
          startPage={0}
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          onFlip={(e: { data: number }) => setPage(e.data)}
        >
          {pages.map((p, i) => (
            <Page key={i}>
              <PageSurface
                page={p}
                index={i}
                story={story}
                generatedImage={generatedImage}
              />
            </Page>
          ))}
        </FlipBook>

        <SideArrow dir="prev" onClick={flipPrev} disabled={page <= 0} />
        <SideArrow dir="next" onClick={flipNext} disabled={page >= total - 1} />
      </div>

      <BookControls
        page={page}
        total={total}
        onPrev={flipPrev}
        onNext={flipNext}
        onJump={jump}
        onFullscreen={fullscreen}
        isFullscreen={isFs}
      />
    </div>
  );
}

function SideArrow({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous page" : "Next page"}
      className={cn(
        "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink-soft shadow-soft backdrop-blur transition hover:text-coral-dark active:scale-95 disabled:pointer-events-none disabled:opacity-0",
        dir === "prev" ? "left-1 sm:-left-4" : "right-1 sm:-right-4"
      )}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}

/* ----------------------------- page surfaces ----------------------------- */

function PageSurface({
  page,
  index,
  story,
  generatedImage,
}: {
  page: BookPage;
  index: number;
  story: StoryTemplate;
  generatedImage: string | null;
}) {
  if (page.kind === "cover") {
    return (
      <div
        className="relative flex h-full w-full flex-col items-center justify-end p-6 text-center text-white"
        style={{ background: story.cover }}
      >
        {page.useGenerated && generatedImage ? (
          <img
            src={generatedImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-7xl opacity-90">
            {story.emoji}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="relative z-10">
          <h2 className="font-display text-3xl font-semibold leading-tight drop-shadow">
            {page.title}
          </h2>
          <p className="mt-2 text-lg font-medium drop-shadow">{page.subtitle}</p>
        </div>
      </div>
    );
  }

  if (page.kind === "illustration") {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-sand">
        {page.useGenerated && generatedImage ? (
          <img
            src={generatedImage}
            alt={page.caption}
            className="h-full w-full object-cover"
          />
        ) : (
          <SceneArt
            gradient={page.gradient}
            motif={page.motif}
            motifs={page.motifs}
          />
        )}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {page.caption}
        </span>
        <PageNumber n={index + 1} dark />
      </div>
    );
  }

  if (page.kind === "text") {
    return (
      <div className="page-paper relative flex h-full w-full flex-col justify-center px-7 py-8">
        <div className="space-y-4">
          {page.paragraphs.map((para, i) => (
            <p
              key={i}
              className={cn(
                "text-ink",
                i === 0
                  ? "font-display text-lg leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-coral-dark"
                  : "text-[0.98rem] leading-relaxed text-ink-soft"
              )}
            >
              {para}
            </p>
          ))}
        </div>
        <PageNumber n={index + 1} />
      </div>
    );
  }

  // end page
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center text-white"
      style={{ background: story.cover }}
    >
      <span className="text-5xl" aria-hidden>
        ♥
      </span>
      <h2 className="font-display text-3xl font-semibold drop-shadow">
        {page.title}
      </h2>
      <p className="max-w-[15rem] text-base font-medium drop-shadow">
        {page.subtitle}
      </p>
    </div>
  );
}

/** A distinct illustrated scene built from a gradient + motifs. */
function SceneArt({
  gradient,
  motif,
  motifs,
}: {
  gradient: string;
  motif: string;
  motifs: string[];
}) {
  // Deterministic scatter positions for accent motifs.
  const spots: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    size: string;
    rotate: string;
  }[] = [
    { top: "12%", left: "16%", size: "text-3xl", rotate: "-12deg" },
    { top: "20%", right: "14%", size: "text-4xl", rotate: "10deg" },
    { bottom: "26%", left: "12%", size: "text-3xl", rotate: "8deg" },
    { bottom: "16%", right: "18%", size: "text-4xl", rotate: "-8deg" },
  ];

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: gradient }}
    >
      {/* soft light wash */}
      <span
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl"
      />
      <span
        aria-hidden
        className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-black/10 blur-2xl"
      />

      {/* scattered scene accents */}
      {motifs.map((m, i) => {
        const s = spots[i % spots.length];
        return (
          <span
            key={i}
            aria-hidden
            className={cn("absolute opacity-90 drop-shadow", s.size)}
            style={{
              top: s.top,
              bottom: s.bottom,
              left: s.left,
              right: s.right,
              transform: `rotate(${s.rotate})`,
            }}
          >
            {m}
          </span>
        );
      })}

      {/* hero motif */}
      <span
        aria-hidden
        className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/25 text-6xl shadow-lg backdrop-blur-sm"
      >
        {motif}
      </span>
    </div>
  );
}

function PageNumber({ n, dark }: { n: number; dark?: boolean }) {
  return (
    <span
      className={cn(
        "absolute bottom-3 right-4 text-xs font-semibold",
        dark ? "text-white/80" : "text-ink-faint"
      )}
    >
      {n}
    </span>
  );
}
