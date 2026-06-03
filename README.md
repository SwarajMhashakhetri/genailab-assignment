# My Clever Pages — "Preview Before You Pay" prototype

A redesign concept for [mycleverpages.org](https://mycleverpages.org/products/childrens-books),
a service that turns a child's photo into a personalized picture book where they
are the hero.

## The problem this solves

The current site makes customers **pay first** ($39.99), then email a photo, then
wait ~2 weeks to see a proof. Asking for money before showing any personalized
result is the conversion killer.

This prototype **flips the funnel**: upload a photo → pick a story & art style →
enter name/age → **preview the AI-generated book, page by page** → _then_ check out.
Seeing their own child as the hero is the moment that sells the book.

## The experience

1. **Landing** (`/`) — emotional hero, "see it before you buy" promise, story
   showcase, social proof.
2. **The Studio** (`/create`) — a calm, one-decision-per-screen guided flow:
   upload → story → details → style → **live book preview**.
3. **Book preview** — a real page-turn **flipbook** (two-page spreads, zoom,
   page navigation, fullscreen). The AI illustration is the cover + hero scene;
   the child's name is woven through pre-authored story text.
4. **Checkout** (`/checkout`) — a polished confirmation (no real payment — prototype).

Designed "Apple-meets-grandma": generous whitespace, large legible type, warm
keepsake palette, restrained motion with one "wow" reveal, and full keyboard /
reduced-motion accessibility.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion · Lenis ·
react-pageflip · OpenAI Node SDK (`gpt-image-1`).

## Run it

```bash
npm install
cp .env.example .env.local      # then add your real OpenAI key
npm run dev                     # http://localhost:3000
```

`.env.local`:

```
OPENAI_API_KEY=sk-...
```

Without a key the app still runs end-to-end; the generate step returns a friendly
"illustrator isn't connected" message instead of an image.

## How the AI integration works

`app/api/generate/route.ts` receives the uploaded photo + selections, builds a
per-story / per-style prompt (`lib/prompts.ts`), and calls:

```ts
openai.images.edit({
  model: "gpt-image-1",
  image,                  // the uploaded child photo
  prompt,
  input_fidelity: "high", // keeps the child's face recognizable across art styles
  quality: "high",
  size: "1024x1024",
});
```

`input_fidelity: "high"` is the key: it preserves the child's likeness whether the
output is storybook, watercolor, or lifelike.

## Swapping in the real assets

- **Prompt** — replace the strings in `lib/prompts.ts` (one file).
- **Story page text** — `lib/books.ts`.
- **Sample / cover art** — drop images into `public/samples/` and reference them
  from `lib/templates.ts` / `lib/books.ts`.
