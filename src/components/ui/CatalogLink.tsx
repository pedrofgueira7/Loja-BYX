"use client";

import type { ComponentProps } from "react";
import type { CategoryId } from "@/data/categories";
import { track } from "@/lib/analytics";
import { CATEGORY_EVENT, SectionLink } from "./SectionLink";

export { CATEGORY_EVENT };

type Props = Omit<ComponentProps<typeof SectionLink>, "id" | "category"> & {
  /** Categoria a ser pré-selecionada no catálogo. */
  category: CategoryId | "all";
};

/** Leva ao catálogo já filtrado (sem "#" na URL). */
export function CatalogLink({ category, onClick, children, ...props }: Props) {
  return (
    <SectionLink
      id={category === "all" ? "catalogo" : category}
      category={category}
      onClick={(e) => {
        if (category !== "all") track("view_collection", { collection: category });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </SectionLink>
  );
}
