"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

export function CtaSection() {
  return (
    <section className="px-5 py-20">
      <div className="mesh-dark relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-8 py-16 text-center text-white sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="font-display mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
            See your child light up.
            <br /> It only takes a photo.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/70">
            Preview the entire book for free. Pay only when you fall in love
            with it — and you will.
          </p>
          <Magnetic className="mt-9 inline-block">
            <Link href="/create">
              <Button size="xl">
                Start your free preview
                <ArrowRight className="h-6 w-6" />
              </Button>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
