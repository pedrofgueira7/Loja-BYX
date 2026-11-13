import { storeConfig } from "@/data/store-config";
import type { Product } from "@/types/product";

/** Helper centralizado: todo link de WhatsApp do site passa por aqui. */
export function createWhatsAppLink(message: string): string {
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage =
  "Olá! Conheci a BYX pelo site e gostaria de conhecer as peças disponíveis.";

type Selection = { size?: string | null; color?: string | null };

export function buildPurchaseMessage(
  product: Pick<Product, "name" | "sku">,
  selection: Selection = {},
): string {
  let message = `Olá! Vi a peça ${product.name} no site da BYX e gostaria de saber mais sobre disponibilidade, tamanhos e valores.`;
  const details: string[] = [];
  if (selection.size) details.push(`Tamanho: ${selection.size}`);
  if (selection.color) details.push(`Cor: ${selection.color}`);
  if (product.sku) details.push(`Código: ${product.sku}`);
  if (details.length) message += `\n\n${details.join("\n")}`;
  return message;
}

export function buildRestockMessage(
  product: Pick<Product, "name" | "sku">,
  selection: Selection = {},
): string {
  let message = `Olá! Vi a peça ${product.name} no site da BYX e gostaria de saber se existe previsão de reposição.`;
  const details: string[] = [];
  if (selection.size) details.push(`Tamanho: ${selection.size}`);
  if (selection.color) details.push(`Cor: ${selection.color}`);
  if (product.sku) details.push(`Código: ${product.sku}`);
  if (details.length) message += `\n\n${details.join("\n")}`;
  return message;
}

/** Link de WhatsApp correto conforme a disponibilidade do produto. */
export function productWhatsAppLink(
  product: Pick<Product, "name" | "sku" | "availability">,
  selection: Selection = {},
): string {
  const message =
    product.availability === "sold_out"
      ? buildRestockMessage(product, selection)
      : buildPurchaseMessage(product, selection);
  return createWhatsAppLink(message);
}

export function productCtaLabel(availability: Product["availability"]): string {
  return availability === "sold_out" ? "CONSULTAR REPOSIÇÃO" : "COMPRAR PELO WHATSAPP";
}
