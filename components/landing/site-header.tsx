"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#stories", label: "Stories" },
  { href: "#love", label: "Reviews" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center"
    >
      <div
        className={cn(
          "mt-0 flex w-full items-center justify-between gap-6 px-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "glass mt-3 max-w-3xl rounded-full py-2.5 pl-4 pr-2.5"
            : "max-w-6xl rounded-none border border-transparent py-4"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold text-ink"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6">
            <BookOpen className="h-5 w-5" />
          </span>
          My Clever Pages
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-soft md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="link-underline py-1 transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Magnetic strength={0.25}>
          <Link href="/create">
            <Button size="sm">Create your book</Button>
          </Link>
        </Magnetic>
      </div>
    </motion.header>
  );
}
