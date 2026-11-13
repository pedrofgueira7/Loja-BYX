import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "solid-inverse" | "outline-inverse";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300 focus-visible:outline-offset-4 disabled:opacity-50 sm:text-[0.8rem]";

const variants: Record<Variant, string> = {
  // Sobre fundo claro
  solid: "bg-byx-black text-byx-white border border-byx-black hover:bg-byx-white hover:text-byx-black",
  outline: "border border-byx-black text-byx-black hover:bg-byx-black hover:text-byx-white",
  // Sobre fundo escuro
  "solid-inverse": "bg-byx-white text-byx-black border border-byx-white hover:bg-transparent hover:text-byx-white",
  "outline-inverse": "border border-byx-white text-byx-white hover:bg-byx-white hover:text-byx-black",
};

export function buttonClasses(variant: Variant = "solid", className = ""): string {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };

/** Link interno (Next Link). */
export function ButtonLink({
  variant,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      {children}
    </Link>
  );
}
