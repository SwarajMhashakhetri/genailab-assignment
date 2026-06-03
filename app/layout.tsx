import type { Metadata } from "next";
import { Cabin, Quicksand, Amatic_SC } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Toaster } from "sonner";

// Brand fonts, mirrored from mycleverpages.org:
//   Cabin     → headings (their --font-heading-family)
//   Quicksand → body / UI (rounded, friendly, grandma-legible)
//   Amatic SC → playful storybook accents (eyebrows, hero flourishes)
const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const amatic = Amatic_SC({
  variable: "--font-amatic",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "My Clever Pages — See your child as the hero, before you buy",
  description:
    "Upload a photo, choose a story, and watch your child become the star of their own picture book — preview the whole book free, then order.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cabin.variable} ${quicksand.variable} ${amatic.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#2b2018",
              border: "1px solid #e7dcc9",
              fontFamily: "var(--font-quicksand)",
            },
          }}
        />
      </body>
    </html>
  );
}
