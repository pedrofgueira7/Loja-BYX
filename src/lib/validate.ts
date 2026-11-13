import type { Product } from "../types/product";

/**
 * Validação de integridade do catálogo.
 * Sem imports em runtime para poder rodar tanto no app quanto em
 * `npm run validate:catalog` (scripts/validate-catalog.mts).
 */

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const AVAILABILITY = ["available", "sold_out", "inquiry"];

export function validateCatalog(
  products: readonly Product[],
  categoryIds: readonly string[],
  /** Recebe um caminho público (ex.: /images/...) e diz se o arquivo existe. */
  fileExists: (publicPath: string) => boolean,
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const skus = new Set<string>();

  products.forEach((p, i) => {
    const at = `produto[${i}] (${p.slug ?? p.id ?? "?"})`;
    const err = (msg: string) => errors.push(`${at}: ${msg}`);

    if (!p.id) err("id vazio");
    else if (ids.has(p.id)) err(`id duplicado "${p.id}"`);
    ids.add(p.id);

    if (!p.slug || !SLUG_RE.test(p.slug)) err(`slug inválido "${p.slug}" (use minúsculas-com-hifens)`);
    else if (slugs.has(p.slug)) err(`slug duplicado "${p.slug}"`);
    slugs.add(p.slug);

    if (p.sku) {
      if (skus.has(p.sku)) err(`sku duplicado "${p.sku}"`);
      skus.add(p.sku);
    }

    if (!p.name?.trim()) err("name vazio");
    if (!p.description?.trim()) err("description vazia");
    if (!categoryIds.includes(p.category)) err(`categoria desconhecida "${p.category}"`);
    if (!AVAILABILITY.includes(p.availability)) err(`availability inválida "${p.availability}"`);
    if (typeof p.featured !== "boolean") err("featured deve ser true/false");
    if (typeof p.published !== "boolean") err("published deve ser true/false");
    if (!DATE_RE.test(p.createdAt) || Number.isNaN(Date.parse(p.createdAt))) {
      err(`createdAt inválido "${p.createdAt}" (use AAAA-MM-DD)`);
    }

    for (const [field, value] of [
      ["price", p.price],
      ["promotionalPrice", p.promotionalPrice],
    ] as const) {
      if (value == null) continue;
      if (!Number.isInteger(value) || value <= 0) {
        err(`${field} deve ser inteiro positivo em CENTAVOS (R$ 129,90 => 12990), recebido ${value}`);
      }
    }
    if (p.promotionalPrice != null && p.price == null) err("promotionalPrice exige price");
    if (p.promotionalPrice != null && p.price != null && p.promotionalPrice >= p.price) {
      err("promotionalPrice deve ser menor que price");
    }

    if (p.published && p.images.length === 0) {
      err("produto publicado sem fotos (usará placeholder) — adicione ao menos 1 imagem");
    }
    for (const img of p.images) {
      if (!img.startsWith("/images/products/")) err(`imagem fora de /images/products/: ${img}`);
      else if (!fileExists(img)) err(`imagem não encontrada: public${img}`);
    }

    if (new Set(p.sizes).size !== p.sizes.length) err("tamanhos duplicados");
    const colorNames = p.colors.map((c) => c.name);
    if (new Set(colorNames).size !== colorNames.length) err("cores duplicadas");
    for (const c of p.colors) {
      if (!c.name?.trim()) err("cor sem name");
      if (c.hex && !HEX_RE.test(c.hex)) err(`hex inválido "${c.hex}" na cor ${c.name}`);
    }
  });

  return errors;
}
