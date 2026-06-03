"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Props {
  page: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (n: number) => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export function BookControls({
  page,
  total,
  onPrev,
  onNext,
  onJump,
  onFullscreen,
  isFullscreen,
}: Props) {
  return (
    <div className="mx-auto mt-6 flex w-fit max-w-full items-center gap-1 rounded-full border border-line bg-paper px-2 py-1.5 shadow-soft">
      <Ctrl label="Previous page" onClick={onPrev} disabled={page <= 0}>
        <ChevronLeft className="h-5 w-5" />
      </Ctrl>

      <div className="flex items-center gap-1 px-1 text-sm font-semibold text-ink">
        <input
          type="number"
          min={1}
          max={total}
          value={page + 1}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") return;
            onJump(Number(v) - 1);
          }}
          aria-label="Go to page"
          className="w-12 rounded-lg border border-line bg-cream px-2 py-1 text-center outline-none focus:border-coral [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="whitespace-nowrap text-ink-faint">/ {total}</span>
      </div>

      <Ctrl label="Next page" onClick={onNext} disabled={page >= total - 1}>
        <ChevronRight className="h-5 w-5" />
      </Ctrl>

      <span className="mx-1 h-6 w-px bg-line" />

      <Ctrl
        label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        onClick={onFullscreen}
      >
        {isFullscreen ? (
          <Minimize2 className="h-5 w-5" />
        ) : (
          <Maximize2 className="h-5 w-5" />
        )}
      </Ctrl>
    </div>
  );
}

function Ctrl({
  children,
  label,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-sand hover:text-ink active:scale-95 disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
