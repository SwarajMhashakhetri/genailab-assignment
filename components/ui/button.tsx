"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative isolate overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none after:pointer-events-none after:absolute after:inset-0 after:-translate-x-[150%] after:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.38),transparent)] after:transition-transform after:duration-700 after:ease-out hover:after:translate-x-[150%] motion-reduce:after:hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-coral text-white shadow-soft hover:bg-coral-dark hover:-translate-y-0.5 hover:shadow-lift",
        secondary:
          "bg-paper text-ink border border-line hover:border-coral hover:text-coral-dark hover:-translate-y-0.5",
        ghost: "text-ink-soft hover:text-ink hover:bg-sand/70",
        teal: "bg-teal text-white shadow-soft hover:brightness-110 hover:-translate-y-0.5",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-base",
        lg: "h-14 px-9 text-lg",
        xl: "h-16 px-11 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
