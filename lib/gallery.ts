/* Real imagery pulled from mycleverpages.org, stored locally in /public/mcp. */

export const SPREADS = Array.from(
  { length: 16 },
  (_, i) => `/mcp/spread-${String(i + 1).padStart(2, "0")}.jpg`
);

export const IMAGES = {
  hero: "/mcp/hero.jpg",
  logo: "/mcp/logo.png",
  book: "/mcp/book.png",
  sneakPeek: "/mcp/sneak-peek.jpg",
  reading: "/mcp/reading.jpg",
  girlPhone: "/mcp/girl-phone.jpg",
  keepsake: "/mcp/keepsake.jpg",
  childName: "/mcp/child-name.jpg",
} as const;
