"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { getCategory } from "@/data/categories";
import { availabilityLabel, formatPrice, getPriceInfo } from "@/lib/format";
import { mainImage } from "@/lib/catalog";
import { productCtaLabel, productWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const SIZES = "(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 50vw";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const href = `/produto/${product.slug}`;
  const category = getCategory(product.category);
  const { current, original } = getPriceInfo(product);
  const soldOut = product.availability === "sold_out";
  const second = product.images[1];

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        onClick={() => track("select_item", { item: product.name, category: product.category })}
        className="relative block aspect-[4/5] overflow-hidden bg-byx-light"
      >
        <Image
          src={mainImage(product)}
          alt=""
          fill
          sizes={SIZES}
          priority={priority}
          className={`object-cover transition-all duration-700 group-hover:scale-[1.03] ${
            soldOut ? "opacity-70" : ""
          }`}
        />
        {second && (
          <Image
            src={second}
            alt=""
            fill
            sizes={SIZES}
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {soldOut && (
          <span className="absolute top-3 left-3 bg-byx-black px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.2em] text-byx-white uppercase">
            ESGOTADO
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[0.65rem] font-bold tracking-[0.25em] text-byx-dark uppercase">
          {category?.label ?? product.category}
        </p>
        <h3 className="mt-1.5 font-display text-base leading-snug font-bold tracking-[-0.01em] sm:text-lg">
          <Link
            href={href}
            onClick={() => track("select_item", { item: product.name, category: product.category })}
            className="hover:underline hover:underline-offset-4"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 text-sm">
          {current != null ? (
            <>
              <span className="font-bold">{formatPrice(current)}</span>
              {original != null && (
                <span className="text-byx-dark/70 line-through">{formatPrice(original)}</span>
              )}
            </>
          ) : (
            <span className="text-byx-dark">Consulte valores</span>
          )}
        </div>
        <p className="mt-1 text-xs text-byx-dark">{availabilityLabel(product.availability)}</p>

        <div className="mt-auto pt-5">
          <WhatsAppButton
            href={productWhatsAppLink(product)}
            location="card"
            item={product.name}
            variant="solid"
            icon={false}
            className="w-full px-3 text-center text-[0.65rem] tracking-[0.12em] sm:text-[0.7rem]"
          >
            {productCtaLabel(product.availability)}
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
