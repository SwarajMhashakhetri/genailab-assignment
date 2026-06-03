/* ------------------------------------------------------------------ *
 *  Story templates + art styles
 *  Mirrors the real My Clever Pages catalogue. Cover art is rendered
 *  as warm gradients + motifs so the prototype is fully self-contained
 *  (drop real artwork into /public/samples and swap `cover` for a src).
 * ------------------------------------------------------------------ */

export type StoryId =
  | "school-adventure"
  | "cosmic-adventure"
  | "princess-world"
  | "abc-wishes";

export interface StoryTemplate {
  id: StoryId;
  title: string;
  tagline: string;
  description: string;
  ageRange: string;
  emoji: string;
  /** cover artwork (real imagery in /public/mcp) */
  image: string;
  /** background gradient fallback for cover + cards */
  cover: string;
  accent: string;
}

export const STORIES: StoryTemplate[] = [
  {
    id: "school-adventure",
    title: "The Big First Day",
    tagline: "School Adventure",
    description:
      "A warm, reassuring story about the excitement and butterflies of starting school — and discovering how brave they already are.",
    ageRange: "3–6",
    emoji: "🎒",
    image: "/mcp/school-adventure.png",
    cover: "linear-gradient(135deg, #f6d39a 0%, #ea6a47 100%)",
    accent: "#ea6a47",
  },
  {
    id: "cosmic-adventure",
    title: "Voyage to the Stars",
    tagline: "Cosmic Adventure",
    description:
      "Blast off through the solar system, meet friendly planets, and learn how the universe works on a bedtime space mission.",
    ageRange: "4–8",
    emoji: "🚀",
    image: "/mcp/cosmic-adventure.png",
    cover: "linear-gradient(135deg, #5b6ee1 0%, #2f2a6b 100%)",
    accent: "#5b6ee1",
  },
  {
    id: "princess-world",
    title: "The Colorful World of a Princess",
    tagline: "Healthy & Royal",
    description:
      "A royal tale where every colorful fruit and vegetable holds a little magic — and good food makes a brave, kind ruler.",
    ageRange: "3–7",
    emoji: "👑",
    image: "/mcp/princes-world.png",
    cover: "linear-gradient(135deg, #f7a8c4 0%, #b5479a 100%)",
    accent: "#b5479a",
  },
  {
    id: "abc-wishes",
    title: "ABC Wishes",
    tagline: "Alphabet Poems",
    description:
      "A gentle rhyming journey from A to Z, with a personalized wish for your child woven through every letter of the alphabet.",
    ageRange: "2–5",
    emoji: "🔤",
    image: "/mcp/abc-wishesh.png",
    cover: "linear-gradient(135deg, #7fd1c1 0%, #2f6f6a 100%)",
    accent: "#2f6f6a",
  },
];

export const getStory = (id: StoryId) =>
  STORIES.find((s) => s.id === id) ?? STORIES[0];

/* --------------------------------- styles -------------------------------- */

export type StyleId = "realistic" | "watercolor" | "illustrative";

export interface ArtStyle {
  id: StyleId;
  title: string;
  description: string;
  emoji: string;
  /** sample artwork showing the style (real imagery in /public/mcp) */
  image: string;
  swatch: string;
}

export const STYLES: ArtStyle[] = [
  {
    id: "illustrative",
    title: "Storybook",
    description:
      "Soft, rounded picture-book illustration — the classic, cuddly look children adore.",
    emoji: "🖍️",
    image: "/mcp/storybook-style.png",
    swatch: "linear-gradient(135deg, #f6d39a, #ea6a47)",
  },
  {
    id: "watercolor",
    title: "Watercolor",
    description:
      "Dreamy, hand-painted washes of color — gentle, artistic and timeless.",
    emoji: "🎨",
    image: "/mcp/water-color-style.png",
    swatch: "linear-gradient(135deg, #d3e6e3, #7fd1c1)",
  },
  {
    id: "realistic",
    title: "Lifelike",
    description:
      "Rich, true-to-life rendering that keeps every detail of your child's smile.",
    emoji: "📷",
    image: "/mcp/liflike-style.png",
    swatch: "linear-gradient(135deg, #f7dccf, #b5479a)",
  },
];

export const getStyle = (id: StyleId) =>
  STYLES.find((s) => s.id === id) ?? STYLES[0];
