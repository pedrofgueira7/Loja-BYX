"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClasses } from "./Button";
import { track } from "@/lib/analytics";
import { storeConfig } from "@/data/store-config";

type Props = {
  children: ReactNode;
  location: string;
  /** "button" = visual de botão; "text" = link simples. */
  as?: "button" | "text";
  variant?: Parameters<typeof buttonClasses>[0];
  className?: string;
};

export function InstagramLink({ children, location, as = "text", variant = "solid", className = "" }: Props) {
  return (
    <a
      href={storeConfig.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={as === "button" ? buttonClasses(variant, className) : className}
      onClick={() => track("click_instagram", { location })}
    >
      {children}
      {as === "button" && <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.2} />}
    </a>
  );
}
