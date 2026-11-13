"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { getCategory } from "@/data/categories";
import { availabilityLabel, formatPrice, getPriceInfo } from "@/lib/format";
import { productCtaLabel, productWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CatalogLink } from "@/components/ui/CatalogLink";

export function ProductDetails({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const category = getCategory(product.category);
  const { current, original } = getPriceInfo(product);
  const soldOut = product.availability === "sold_out";

  useEffect(() => {
    track("view_item", { item: product.name, category: product.category });
  }, [product.name, product.category]);

  const href = productWhatsAppLink(product, { size, color });

  return (
    <div>
      <p className="text-[0.7rem] font-bold tracking-[0.3em] text-byx-dark uppercase">
        <CatalogLink category={product.category} className="hover:underline hover:underline-offset-4">
          {category?.label ?? product.category}
        </CatalogLink>
      </p>
      <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.03em] uppercase">
        {product.name}
      </h1>
      {product.sku && <p className="mt-2 text-xs text-byx-dark">Código: {product.sku}</p>}

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
        {current != null ? (
          <>
            <span className="font-display text-3xl font-extrabold">{formatPrice(current)}</span>
            {original != null && (
              <span className="text-lg text-byx-dark/70 line-through">{formatPrice(original)}</span>
            )}
          </>
        ) : (
          <span className="text-lg font-semibold">Consulte valores pelo WhatsApp</span>
        )}
      </div>

      <p
        className={`mt-3 inline-block text-xs font-bold tracking-[0.2em] uppercase ${
          soldOut ? "bg-byx-black px-3 py-1.5 text-byx-white" : "text-byx-dark"
        }`}
      >
        {soldOut ? "ESGOTADO" : availabilityLabel(product.availability)}
      </p>

      <p className="mt-8 max-w-prose text-base leading-relaxed whitespace-pre-line text-byx-dark">
        {product.description}
      </p>

      {product.sizes.length > 0 && (
        <fieldset className="mt-10">
          <legend className="mb-3 text-[0.7rem] font-bold tracking-[0.25em] uppercase">
            Tamanho{size ? `: ${size}` : ""}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize((cur) => (cur === s ? null : s))}
                className={`min-h-12 min-w-12 border px-4 text-sm font-bold transition-colors ${
                  size === s
                    ? "border-byx-black bg-byx-black text-byx-white"
                    : "border-byx-black/30 hover:border-byx-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {product.colors.length > 0 && (
        <fieldset className="mt-8">
          <legend className="mb-3 text-[0.7rem] font-bold tracking-[0.25em] uppercase">
            Cor{color ? `: ${color}` : ""}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-pressed={color === c.name}
                onClick={() => setColor((cur) => (cur === c.name ? null : c.name))}
                className={`flex min-h-12 items-center gap-2.5 border px-4 text-sm font-semibold transition-colors ${
                  color === c.name
                    ? "border-byx-black bg-byx-black text-byx-white"
                    : "border-byx-black/30 hover:border-byx-black"
                }`}
              >
                {c.hex && (
                  <span
                    aria-hidden
                    className="size-4 rounded-full border border-byx-mid"
                    style={{ backgroundColor: c.hex }}
                  />
                )}
                {c.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-10">
        <WhatsAppButton href={href} location="produto" item={product.name} className="w-full sm:w-auto sm:min-w-80">
          {productCtaLabel(product.availability)}
        </WhatsAppButton>
        <p className="mt-4 text-xs leading-relaxed text-byx-dark">
          O atendimento e a finalização da compra são feitos pelo WhatsApp
          {product.sizes.length > 0 || product.colors.length > 0
            ? "; o tamanho e a cor escolhidos acima vão junto na mensagem."
            : "."}
        </p>
      </div>
    </div>
  );
}
