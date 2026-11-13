"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import type { CategoryId } from "@/data/categories";
import { track } from "@/lib/analytics";

export const CATEGORY_EVENT = "byx:category";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Categoria a ser pré-selecionada no catálogo. */
  category: CategoryId | "all";
};

/**
 * Leva ao catálogo já filtrado. O hash (#fitness / #casual) funciona entre páginas;
 * o evento customizado atualiza o filtro quando já estamos na home.
 */
export function CatalogLink({ category, onClick, children, ...props }: Props) {
  const hash = category === "all" ? "catalogo" : category;
  return (
    <Link
      href={`/#${hash}`}
      onClick={(e) => {
        window.dispatchEvent(new CustomEvent(CATEGORY_EVENT, { detail: category }));
        if (category !== "all") track("view_collection", { collection: category });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
