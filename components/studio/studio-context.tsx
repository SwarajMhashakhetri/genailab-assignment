"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { StoryId, StyleId } from "@/lib/templates";

// Funnel order is deliberate. We ask the child's NAME first (frictionless,
// and it personalizes every screen that follows → endowment effect), then the
// easy creative choices, and we save the PHOTO — the one bit of real effort —
// for last, when the parent is already invested.
export const STEPS = ["Hero", "Story", "Style", "Photo", "Preview"] as const;

interface StudioState {
  step: number;
  file: File | null;
  photoUrl: string | null;
  story: StoryId | null;
  name: string;
  age: number;
  style: StyleId | null;
  generatedImage: string | null;
}

interface StudioContextValue extends StudioState {
  setPhoto: (file: File, url: string) => void;
  clearPhoto: () => void;
  setStory: (s: StoryId) => void;
  setName: (n: string) => void;
  setAge: (a: number) => void;
  setStyle: (s: StyleId) => void;
  setGeneratedImage: (img: string | null) => void;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  canAdvance: boolean;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [story, setStoryState] = useState<StoryId | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(4);
  const [style, setStyleState] = useState<StyleId | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Carry a name typed on the landing page (?name=) straight into the studio,
  // so the journey feels already-begun (Zeigarnik effect — people are pulled to
  // finish what they've started).
  useEffect(() => {
    const seeded = new URLSearchParams(window.location.search).get("name");
    if (seeded) setName(seeded.trim().slice(0, 20));
  }, []);

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return name.trim().length > 0;
      case 1:
        return !!story;
      case 2:
        return !!style;
      case 3:
        return !!file;
      default:
        return false;
    }
  }, [step, file, story, name, style]);

  const value: StudioContextValue = {
    step,
    file,
    photoUrl,
    story,
    name,
    age,
    style,
    generatedImage,
    setPhoto: (f, url) => {
      setFile(f);
      setPhotoUrl(url);
    },
    clearPhoto: () => {
      setFile(null);
      setPhotoUrl(null);
    },
    setStory: (s) => setStoryState(s),
    setName,
    setAge,
    setStyle: (s) => setStyleState(s),
    setGeneratedImage,
    next: () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
    back: () => setStep((s) => Math.max(s - 1, 0)),
    goTo: (s) => setStep(s),
    canAdvance,
  };

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  );
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used inside <StudioProvider>");
  return ctx;
}
