# My Clever Pages — "Preview Before You Pay"

A redesign concept for [mycleverpages.org](https://mycleverpages.org/products/childrens-books) —
a service that turns a child's photo into a personalized picture book where they
are the hero.

## The problem this solves

The current site makes customers **pay first** ($39.99), then email a photo, then
wait ~2 weeks to see a proof. Asking for money before showing any personalized
result is the conversion killer.

This prototype **flips the funnel**: add a photo → answer a few questions →
**preview the AI-generated book, page by page** → _then_ check out. Seeing their
own child as the hero is the moment that sells the book.

## The experience

1. **Landing** (`/`) — emotional hero, "see it before you buy" promise, story
   showcase, social proof.
2. **The Studio** (`/create`) — a calm, guided flow built around a single idea:
   the child's photo is the anchor and never leaves the screen.
   - **Step 1 — Photo.** The image selector comes first. The _Continue_ button
     springs into view the moment a photo is added.
   - **Steps 2–4 — Details → Story → Style.** The photo docks into a **sticky
     panel on the left** and stays put, while the questions progress on the
     right. Each step's fields **cascade in**, and _Continue_ stays disabled
     until the current step is valid. The left panel doubles as a **live "your
     book so far" summary** — name, story, and art style fill in as you go, each
     row a shortcut back to edit it.
   - **Step 5 — Preview.** The full-width payoff.
3. **Book preview** — a real page-turn **flipbook** (page navigation via side
   arrows / a page-number jump, plus fullscreen). The AI illustration is the
   cover + hero scene; the child's name is woven through pre-authored story text.
   Switching art styles re-generates and re-paints the book in place.
4. **Checkout** (`/checkout`) — a polished confirmation (no real payment — prototype).

Designed "Apple-meets-grandma": generous whitespace, large legible type, a warm
keepsake palette, restrained motion with one "wow" reveal, and full keyboard /
reduced-motion accessibility.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 ·
Framer Motion · Lenis · react-pageflip · OpenAI Node SDK (`gpt-image-1`).

## Run it locally

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

Useful scripts:

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Deploying to Vercel

1. Push the repo to GitHub/GitLab and **Import Project** in Vercel. Framework is
   auto-detected as Next.js — no build settings to change.
2. Add the environment variable in **Project → Settings → Environment Variables**:

   | Key | Value | Environments |
   | --- | --- | --- |
   | `OPENAI_API_KEY` | your real key | Production, Preview, Development |

   The key is read **only on the server** (`app/api/generate/route.ts`) and is
   never shipped to the client.
3. Deploy.

Notes:

- **Function timeout.** Image generation can take 20–60s. `app/api/generate`
  sets `maxDuration = 60`, which is the ceiling on Vercel's **Hobby** plan. On
  **Pro** you can raise it to `300` for extra headroom on slow generations.
- `.env*` is gitignored, so your key is never committed.
- Images in `public/mcp/` are served as static assets (no remote-image config
  needed). A few are large (1–2 MB); compress them if you want faster first paint.

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
output is storybook, watercolor, or lifelike. The route returns the image as a
base64 data URL and surfaces a gentle error state if the key is missing or the
call fails.

## Project map

```
app/
  page.tsx              landing
  create/page.tsx       the Studio (step state machine + two-column layout)
  checkout/page.tsx     confirmation
  api/generate/route.ts OpenAI image edit (server only)
components/
  studio/               step components, studio context, sticky SummaryPanel
  book/                 BookReader (flipbook) + BookControls
  landing/              hero, bento, story showcase, header
  ui/                   Button, reveal/stagger primitives, etc.
lib/
  prompts.ts            per-story / per-style prompt templates
  templates.ts          story + art-style metadata (titles, copy, artwork)
  books.ts              pre-authored page content per story
public/mcp/             cover/style artwork + sample spreads
```

## Swapping in real assets

- **Prompt** — replace the strings in `lib/prompts.ts` (one file).
- **Story page text** — `lib/books.ts`.
- **Cover / style artwork** — the images in `public/mcp/`, referenced from
  `lib/templates.ts`.
