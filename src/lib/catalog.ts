import { products } from "@/data/products";
import { categories, type CategoryId } from "@/data/categories";
import type { Product } from "@/types/product";

/**
 * Única porta de entrada para ler o catálogo.
 * Só devolve produtos com `published: true`.
 */

export type SortKey = "newest" | "price-asc" | "price-desc";

export function getPublishedProducts(): Product[] {
  return products.filter((p) => p.published);
}

export function getFeaturedProducts(): Product[] {
  return sortProducts(getPublishedProducts().filter((p) => p.featured), "newest");
}

export function getProductBySlug(slug: string): Product | undefined {
  return getPublishedProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return getPublishedProducts().filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return sortProducts(
    getPublishedProducts().filter((p) => p.id !== product.id && p.category === product.category),
    "newest",
  ).slice(0, limit);
}

function effectivePrice(p: Product): number | undefined {
  const { price, promotionalPrice } = p;
  if (price != null && promotionalPrice != null && promotionalPrice < price) return promotionalPrice;
  return price ?? promotionalPrice;
}

/** Ordena sem mutar. Produtos sem preço ficam sempre por último nos filtros de preço. */
export function sortProducts(list: Product[], key: SortKey): Product[] {
  const copy = [...list];
  switch (key) {
    case "newest":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
    case "price-desc": {
      const dir = key === "price-asc" ? 1 : -1;
      return copy.sort((a, b) => {
        const pa = effectivePrice(a);
        const pb = effectivePrice(b);
        if (pa == null && pb == null) return 0;
        if (pa == null) return 1;
        if (pb == null) return -1;
        return (pa - pb) * dir;
      });
    }
  }
}

/** Primeira foto do produto, ou o placeholder oficial. */
export const PRODUCT_PLACEHOLDER = "/images/brand/placeholder-produto.jpg";

export function mainImage(product: Product): string {
  return product.images[0] ?? PRODUCT_PLACEHOLDER;
}

export { categories };
