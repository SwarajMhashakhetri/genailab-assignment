import type { StoryId, StyleId } from "./templates";

/* ------------------------------------------------------------------ *
 *  Prompt design for gpt-image-1 image edits.
 *
 *  The uploaded child photo is passed as the reference image with
 *  input_fidelity:"high", so the model keeps the child's likeness while
 *  re-illustrating them inside the chosen scene + art style.
 *
 *  Swap these strings for the client's real prompt — this is the only
 *  file that needs to change.
 * ------------------------------------------------------------------ */

const STORY_SCENES: Record<StoryId, string> = {
  "school-adventure":
    "standing proudly at the gate of a cheerful school on their first day, wearing a little backpack, a friendly classroom and autumn trees in the background",
  "cosmic-adventure":
    "floating joyfully in a child-friendly astronaut suit among colorful planets and twinkling stars, a small rocket ship nearby",
  "princess-world":
    "dressed as a kind little royal in a sunlit castle garden, surrounded by oversized friendly fruits and vegetables and gentle butterflies",
  "abc-wishes":
    "sitting in a cozy, magical reading nook surrounded by floating glowing alphabet letters and soft picture-book scenery",
};

const STYLE_MODIFIERS: Record<StyleId, string> = {
  illustrative:
    "ART STYLE — Children's storybook illustration. Completely re-draw the entire scene as a hand-drawn, modern children's picture-book illustration: bold clean outlines, soft rounded cartoon shapes, flat cel-shaded coloring with gentle texture, warm storybook lighting. It must look clearly illustrated and drawn — NOT a photograph.",
  watercolor:
    "ART STYLE — Hand-painted watercolor. Completely re-paint the entire scene as a traditional watercolor painting: visible brush strokes, soft pigment washes that bleed into one another, textured watercolor-paper grain, loose painterly edges, an airy pastel palette. Every part of the image must look painted by hand — NOT a photograph and NOT a digital cartoon.",
  realistic:
    "ART STYLE — Lifelike illustrated portrait. Render as a richly detailed, semi-realistic painterly portrait: natural lighting, true-to-life skin tones and fine textures, soft cinematic depth of field, polished and warm. Detailed and realistic, while still feeling like a crafted storybook artwork.",
};

export function buildPrompt({
  story,
  style,
  name,
  age,
}: {
  story: StoryId;
  style: StyleId;
  name: string;
  age: number;
}): string {
  const scene = STORY_SCENES[story];
  const styleMod = STYLE_MODIFIERS[style];
  const safeName = name.trim() || "the child";

  return [
    `Create a personalized children's-book illustration of the child shown in the reference photo.`,
    `Keep their face, hair, and likeness clearly recognizable — this is ${safeName}, age ${age}.`,
    `Depict ${safeName} as the happy hero of the story, ${scene}.`,
    styleMod,
    `Composition: single child as the clear focal point, expressive and joyful, full or three-quarter body, tasteful empty space at the top for a title. No text, no words, no letters in the image. Wholesome, safe, and appropriate for young children.`,
  ].join(" ");
}
