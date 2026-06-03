"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Check,
  ShieldCheck,
  Truck,
  Lock,
  PartyPopper,
  Clock,
  Star,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  title: string;
  name: string;
  style: string;
  cover: string | null;
}

const PRICE = 39.99;
const REGULAR = 69.99;

export default function CheckoutPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("mcp_order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-line/70 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-semibold text-ink"
          >
            <BookOpen className="h-5 w-5 text-coral" />
            My Clever Pages
          </Link>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
            <Lock className="h-4 w-4 text-teal" /> Secure checkout
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
        <AnimatePresence mode="wait">
          {placed ? (
            <SuccessState key="success" name={order?.name} />
          ) : (
            <motion.div
              key="order"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Loss aversion: the thing they just fell in love with is held
                  for them, but not forever. Gentle, keepsake-appropriate urgency. */}
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-coral/30 bg-coral-soft/50 px-4 py-3 text-sm font-semibold text-coral-dark">
                <Clock className="h-5 w-5 shrink-0" />
                <span>
                  {order?.name ? `${order.name}'s` : "Your"} free preview is
                  reserved for the next 24 hours — finish up so you don&apos;t
                  lose it.
                </span>
              </div>

              <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Almost there — let&apos;s make it real
              </h1>
              <p className="mt-2 text-lg text-ink-soft">
                Here&apos;s the keepsake you just previewed.
              </p>

              {/* Order summary */}
              <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
                <div className="flex items-center gap-5 p-6">
                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-sand">
                    {order?.cover ? (
                      <img
                        src={order.cover}
                        alt="Your book cover"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl">
                        📖
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {order?.title ?? "Your Personalized Book"}
                    </h2>
                    <p className="text-ink-soft">
                      Starring{" "}
                      <span className="font-semibold text-ink">
                        {order?.name || "your child"}
                      </span>
                      {order?.style ? ` · ${order.style} style` : ""}
                    </p>
                    <p className="mt-1 text-sm text-ink-faint">
                      Hardcover · 200gsm silk paper · ships in ~2 weeks
                    </p>
                  </div>
                </div>

                <div className="border-t border-line px-6 py-5">
                  {[
                    "Your child as the illustrated hero",
                    "Their name woven through every page",
                    "Free shipping & full satisfaction refund",
                  ].map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 py-1 text-sm text-ink-soft"
                    >
                      <Check className="h-4 w-4 text-teal" /> {b}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-line bg-cream/60 px-6 py-5">
                  <div>
                    <span className="text-sm text-ink-faint line-through">
                      ${REGULAR.toFixed(2)}
                    </span>
                    <div className="font-display text-2xl font-semibold text-ink">
                      ${PRICE.toFixed(2)}
                    </div>
                  </div>
                  <span className="rounded-full bg-coral-soft px-3 py-1 text-sm font-bold text-coral-dark">
                    Save 43%
                  </span>
                </div>
              </div>

              {/* Social proof, placed right beside the decision. */}
              <div className="mt-8 rounded-3xl border border-line bg-paper p-6 shadow-soft">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-butter text-butter" />
                  ))}
                </div>
                <p className="mt-3 font-display text-lg italic text-ink">
                  &ldquo;My daughter gasped when she saw herself on the cover.
                  She asks me to read it every single night.&rdquo;
                </p>
                <p className="mt-2 text-sm font-semibold text-ink-soft">
                  — Sarah M. · verified parent
                </p>
              </div>

              <Button
                onClick={() => setPlaced(true)}
                size="xl"
                className="mt-6 w-full"
              >
                Place my order · ${PRICE.toFixed(2)}
              </Button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-coral-dark">
                <Heart className="h-4 w-4 fill-coral-dark" /> 318 families made
                their keepsake this week
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-teal" /> Money-back
                  guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-teal" /> Free shipping
                </span>
              </div>
              <p className="mt-6 text-center text-xs text-ink-faint">
                This is a prototype — no payment is taken and no card details are
                requested.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SuccessState({ name }: { name?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-md rounded-3xl border border-line bg-paper p-10 text-center shadow-soft"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-soft text-teal"
      >
        <PartyPopper className="h-10 w-10" />
      </motion.div>
      <h1 className="font-display mt-6 text-3xl font-semibold text-ink">
        Hooray! It&apos;s on its way
      </h1>
      <p className="mt-3 text-ink-soft">
        {name ? `${name}'s` : "Your"} very own storybook is being prepared with
        love. You&apos;ll get a proof to approve before it prints.
      </p>
      <Link href="/" className="mt-8 inline-block">
        <Button size="lg" variant="secondary">
          Back to home
        </Button>
      </Link>
    </motion.div>
  );
}
