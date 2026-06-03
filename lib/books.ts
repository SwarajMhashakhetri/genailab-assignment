import { getStory, type StoryId } from "./templates";

/* ------------------------------------------------------------------ *
 *  Pre-authored book content per story.
 *  buildBook() weaves in the child's name and drops the AI-generated
 *  illustration into the hero slots (cover + first scene). Every other
 *  illustration page gets its OWN distinct, scene-specific artwork
 *  (unique gradient + motifs) so the book feels varied and complete
 *  while we only generate 1 personalized image per preview.
 *
 *  Swap the per-scene art for real illustrations by giving each scene
 *  an `image` src and rendering it in PageSurface.
 * ------------------------------------------------------------------ */

export type BookPage =
  | { kind: "cover"; title: string; subtitle: string; useGenerated: boolean }
  | {
      kind: "illustration";
      useGenerated: boolean;
      caption: string;
      motif: string;
      motifs: string[];
      gradient: string;
    }
  | { kind: "text"; paragraphs: string[] }
  | { kind: "end"; title: string; subtitle: string };

interface Scene {
  caption: string;
  motif: string;
  motifs: string[];
  gradient: string;
  text: (name: string, age: number) => string[];
}

const SCENES: Record<StoryId, Scene[]> = {
  "school-adventure": [
    {
      caption: "The big morning arrives",
      motif: "🎒",
      motifs: ["🌅", "🧦", "🥪", "⏰"],
      gradient: "linear-gradient(160deg,#ffe0a8 0%,#ff9a62 100%)",
      text: (n) => [
        `${n} woke up before the sun. Today was the day — the very first day of school.`,
        `"What if I don't know anyone?" ${n} whispered. But deep down, a tiny spark of brave was already glowing.`,
      ],
    },
    {
      caption: "Through the school gates",
      motif: "🏫",
      motifs: ["🍎", "✏️", "🔔", "🌳"],
      gradient: "linear-gradient(160deg,#c7e8ff 0%,#5b9bd6 100%)",
      text: (n) => [
        `The school gates were tall and the hallway smelled of crayons and adventure.`,
        `A kind teacher knelt down. "Welcome, ${n}! We've been waiting for someone exactly like you."`,
      ],
    },
    {
      caption: "A brand-new friend",
      motif: "🧩",
      motifs: ["🧸", "🖍️", "🪁", "😊"],
      gradient: "linear-gradient(160deg,#ffe28a 0%,#ea6a47 100%)",
      text: (n) => [
        `At the building blocks, another child smiled. "Want to build the tallest tower in the world?"`,
        `${n} grinned. Just like that, the butterflies flew away — and a friendship began.`,
      ],
    },
    {
      caption: "The bravest kid in class",
      motif: "⭐",
      motifs: ["🌈", "🎨", "🏅", "👏"],
      gradient: "linear-gradient(160deg,#caf0d2 0%,#3fae6b 100%)",
      text: (n, a) => [
        `By story time, ${n} had painted a rainbow, counted to twenty, and laughed until their tummy hurt.`,
        `Being ${a} and starting school felt big this morning. Now it just felt wonderful.`,
      ],
    },
  ],
  "cosmic-adventure": [
    {
      caption: "Countdown to liftoff",
      motif: "🚀",
      motifs: ["🔥", "🌍", "⭐", "🛰️"],
      gradient: "linear-gradient(160deg,#3a2d7d 0%,#7b5bd6 100%)",
      text: (n) => [
        `Three… two… one… "Blast off!" cheered ${n}, gripping the controls of the little silver rocket.`,
        `Up, up, up they soared, past the clouds and into the velvet-black sky full of stars.`,
      ],
    },
    {
      caption: "Hello, friendly planets",
      motif: "🪐",
      motifs: ["🔴", "💫", "☄️", "🌟"],
      gradient: "linear-gradient(160deg,#1f1b4d 0%,#4a3f9e 100%)",
      text: (n) => [
        `First came Mars, red and dusty. Then Saturn, twirling its sparkly rings like a hula hoop.`,
        `"Pleased to meet you, ${n}!" the planets seemed to hum as the rocket floated by.`,
      ],
    },
    {
      caption: "Dancing with the stars",
      motif: "✨",
      motifs: ["⭐", "🌠", "💫", "🌟"],
      gradient: "linear-gradient(160deg,#2a2350 0%,#6d5bbf 100%)",
      text: (n) => [
        `In the quiet of space, ${n} did a slow, floating somersault among a thousand twinkling stars.`,
        `Each star, ${n} learned, was a sun far, far away — keeping its own little planets cozy and warm.`,
      ],
    },
    {
      caption: "Home for bedtime",
      motif: "🌙",
      motifs: ["🌍", "💤", "⭐", "🛏️"],
      gradient: "linear-gradient(160deg,#13234f 0%,#3b5fb0 100%)",
      text: (n, a) => [
        `As the moon waved goodnight, the rocket turned gently back toward the blue-and-green Earth.`,
        `${n}, age ${a}, the youngest astronaut in the galaxy, drifted off to the happiest of dreams.`,
      ],
    },
  ],
  "princess-world": [
    {
      caption: "A royal good morning",
      motif: "👑",
      motifs: ["🏰", "🌸", "🦋", "☀️"],
      gradient: "linear-gradient(160deg,#ffd1e8 0%,#e87bb5 100%)",
      text: (n) => [
        `In a sunlit castle lived a kind young royal named ${n}, beloved across the whole colorful kingdom.`,
        `"To be strong and brave," said the wise old gardener, "a ruler must eat the rainbow."`,
      ],
    },
    {
      caption: "The garden of colors",
      motif: "🍓",
      motifs: ["🌽", "🫛", "🎃", "🥕"],
      gradient: "linear-gradient(160deg,#ffe3a3 0%,#ff7e9d 100%)",
      text: (n) => [
        `${n} skipped through rows of ruby strawberries, golden corn, and emerald peas, each one giggling hello.`,
        `"Pick me!" called a plump orange pumpkin. "I'll help you glow from head to toe!"`,
      ],
    },
    {
      caption: "The magic feast",
      motif: "🥕",
      motifs: ["🥦", "🍇", "🍅", "🌶️"],
      gradient: "linear-gradient(160deg,#ffc7d9 0%,#c44f9a 100%)",
      text: (n) => [
        `At the long royal table, ${n} tasted a little of every color — and felt a warm, happy strength bloom inside.`,
        `Crunchy carrots for sharp eyes, leafy greens for strong legs, sweet berries for a kind heart.`,
      ],
    },
    {
      caption: "The kindest ruler of all",
      motif: "🦋",
      motifs: ["💖", "🌷", "🌟", "👑"],
      gradient: "linear-gradient(160deg,#f7c6ff 0%,#a44fd0 100%)",
      text: (n, a) => [
        `That afternoon, ${n} ran faster, laughed louder, and helped more friends than ever before.`,
        `For ${n}, just ${a} years old, had learned the realm's greatest secret: good food makes a great heart.`,
      ],
    },
  ],
  "abc-wishes": [
    {
      caption: "A is for Adventure",
      motif: "🔤",
      motifs: ["📚", "🌙", "✨", "🅰️"],
      gradient: "linear-gradient(160deg,#bdeee4 0%,#3fae9b 100%)",
      text: (n) => [
        `In a cozy reading nook, glowing letters floated down to visit a sleepy child named ${n}.`,
        `"We've brought a wish for every letter," they whispered, "all the way from A to Z."`,
      ],
    },
    {
      caption: "B is for Brave, C is for Curious",
      motif: "🅱️",
      motifs: ["🦁", "🔍", "💡", "🎈"],
      gradient: "linear-gradient(160deg,#cfe9ff 0%,#5aa6e0 100%)",
      text: (n) => [
        `B wished ${n} a heart full of brave for every new and wobbly thing.`,
        `C wished ${n} a mind full of curious — to ask, and wonder, and discover.`,
      ],
    },
    {
      caption: "K is for Kind, L is for Loved",
      motif: "💛",
      motifs: ["🤗", "🌻", "🫶", "🎵"],
      gradient: "linear-gradient(160deg,#fff0b0 0%,#f6b24a 100%)",
      text: (n) => [
        `Halfway through the alphabet, K landed softly. "May ${n} always be kind," it sang.`,
        `And L glowed brightest of all: "May ${n} always, always know how very loved they are."`,
      ],
    },
    {
      caption: "Z is for the Zzz's of sleep",
      motif: "🌟",
      motifs: ["💤", "🌙", "🛏️", "⭐"],
      gradient: "linear-gradient(160deg,#d7d3ff 0%,#7d77d6 100%)",
      text: (n, a) => [
        `At last came Z, yawning a sleepy, starry yawn over ${n}'s pillow.`,
        `Twenty-six wishes for a wonderful ${a}-year-old — and the sweetest of dreams to seal them all.`,
      ],
    },
  ],
};

export function buildBook(
  storyId: StoryId,
  name: string,
  age: number
): BookPage[] {
  const story = getStory(storyId);
  const safeName = name.trim() || "Your Child";
  const scenes = SCENES[storyId];
  const pages: BookPage[] = [];

  // Cover — uses the generated image
  pages.push({
    kind: "cover",
    title: story.title,
    subtitle: `Starring ${safeName}`,
    useGenerated: true,
  });

  scenes.forEach((scene, i) => {
    // Illustration page (left). The first scene reuses the personalized art;
    // every other scene gets its own distinct artwork.
    pages.push({
      kind: "illustration",
      useGenerated: i === 0,
      caption: scene.caption,
      motif: scene.motif,
      motifs: scene.motifs,
      gradient: scene.gradient,
    });
    // Story text page (right).
    pages.push({ kind: "text", paragraphs: scene.text(safeName, age) });
  });

  pages.push({
    kind: "end",
    title: "The End",
    subtitle: `Made with love, just for ${safeName} ♥`,
  });

  return pages;
}
