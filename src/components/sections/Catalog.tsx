"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { categories } from "@/data/categories";
import { catalog } from "@/data/site-content";
import { storeConfig } from "@/data/store-config";
import { sortProducts, type SortKey } from "@/lib/catalog";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters, type CategoryFilter } from "@/components/products/ProductFilters";
import { CATEGORY_EVENT } from "@/components/ui/CatalogLink";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buttonClasses } from "@/components/ui/Button";

const categoryIds = categories.map((c) => c.id as string);

function parseCategory(value: string | null | undefined): CategoryFilter | null {
  if (!value) return null;
  const v = value.replace(/^#/, "");
  if (v === "all" || v === "catalogo") return "all";
  return categoryIds.includes(v) ? (v as CategoryFilter) : null;
}

/** Filtros e ordenação no frontend, sobre os dados locais já publicados. */
export function Catalog({ products }: { products: Product[] }) {
  const pageSize = storeConfig.catalogPageSize;
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [visible, setVisible] = useState<number>(pageSize);

  // Aceita #fitness / #casual (links de outras páginas) e o evento disparado pelos CatalogLink.
  useEffect(() => {
    const apply = (c: CategoryFilter | null) => {
      if (!c) return;
      setCategory(c);
      setVisible(pageSize);
    };
    const onHash = () => apply(parseCategory(window.location.hash));
    const onEvent = (e: Event) => apply(parseCategory((e as CustomEvent<string>).detail));
    const initial = window.setTimeout(onHash, 0);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(CATEGORY_EVENT, onEvent);
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener(CATEGORY_EVENT, onEvent);
    };
  }, [pageSize]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: products.length };
    for (const c of categories) result[c.id] = products.filter((p) => p.category === c.id).length;
    return result;
  }, [products]);

  const filtered = useMemo(
    () =>
      sortProducts(
        category === "all" ? products : products.filter((p) => p.category === category),
        sort,
      ),
    [products, category, sort],
  );
  const shown = filtered.slice(0, visible);

  return (
    <section aria-labelledby="catalogo-title" className="bg-byx-white py-20 lg:py-32">
      {/* Âncoras de navegação: /#catalogo, /#fitness, /#casual */}
      <span id="catalogo" className="block" />
      {categories.map((c) => (
        <span key={c.id} id={c.id} className="block" />
      ))}

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading id="catalogo-title" title={catalog.title} />

        {products.length === 0 ? (
          <div className="mt-12 border border-byx-black p-8 sm:p-14">
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em] uppercase sm:text-4xl">
              {catalog.emptyTitle}
            </p>
            <p className="mt-4 max-w-md text-byx-dark">{catalog.emptyDescription}</p>
            <div className="mt-8">
              <WhatsAppButton href={createWhatsAppLink(generalMessage)} location="catalogo-vazio">
                {catalog.emptyCta}
              </WhatsAppButton>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <ProductFilters
              category={category}
              onCategory={(c) => {
                setCategory(c);
                setVisible(pageSize);
              }}
              sort={sort}
              onSort={(s) => {
                setSort(s);
                setVisible(pageSize);
              }}
              counts={counts}
            />

            <p className="sr-only" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "peça encontrada" : "peças encontradas"}
            </p>

            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-display text-xl font-extrabold uppercase">Nenhuma peça nesta categoria ainda.</p>
                <button type="button" onClick={() => setCategory("all")} className={`mt-6 ${buttonClasses("outline")}`}>
                  VER TODAS AS PEÇAS
                </button>
              </div>
            ) : (
              <>
                <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
                  {shown.map((p) => (
                    <li key={p.id}>
                      <ProductCard product={p} />
                    </li>
                  ))}
                </ul>
                {filtered.length > shown.length && (
                  <div className="mt-14 flex flex-col items-center gap-4">
                    <p className="text-xs tracking-[0.2em] text-byx-dark uppercase">
                      Exibindo {shown.length} de {filtered.length}
                    </p>
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + pageSize)}
                      className={buttonClasses("outline")}
                    >
                      CARREGAR MAIS
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
