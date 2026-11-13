import type { Availability, Product } from "@/types/product";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata centavos inteiros como moeda. 12990 => "R$ 129,90". */
export function formatPrice(cents: number): string {
  return brl.format(cents / 100);
}

export type PriceInfo = {
  /** Preço efetivo a ser exibido (promocional quando válido). */
  current?: number;
  /** Preço original riscado, somente quando há promoção válida. */
  original?: number;
};

export function getPriceInfo(product: Pick<Product, "price" | "promotionalPrice">): PriceInfo {
  const { price, promotionalPrice } = product;
  if (price != null && promotionalPrice != null && promotionalPrice < price) {
    return { current: promotionalPrice, original: price };
  }
  if (price != null) return { current: price };
  if (promotionalPrice != null) return { current: promotionalPrice };
  return {};
}

export function availabilityLabel(availability: Availability): string {
  switch (availability) {
    case "available":
      return "Disponível";
    case "sold_out":
      return "Esgotado";
    case "inquiry":
      return "Consulte disponibilidade";
  }
}
