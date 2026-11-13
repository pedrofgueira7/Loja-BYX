import type { Product } from "@/types/product";

/**
 * CATÁLOGO CENTRAL DA BYX
 * ------------------------------------------------------------------
 * Todos os produtos do site ficam neste arquivo. Nunca cadastre
 * produtos diretamente em componentes JSX.
 *
 * Regras rápidas:
 *  - Preços em CENTAVOS inteiros (R$ 129,90 => 12990).
 *  - Fotos em /public/images/products/<slug>/01.jpg, 02.jpg, ...
 *  - `published: false` remove o produto do site (não apague dados).
 *  - Não invente informações: o que não foi informado fica de fora.
 *
 * Guia completo: CATALOG_GUIDE.md
 *
 * Exemplo (copie, cole e preencha somente o que for real):
 *
 * {
 *   id: "byx-0001",
 *   slug: "conjunto-fitness-preto",
 *   name: "Conjunto Fitness Preto",
 *   sku: "BYX-0001",                 // opcional
 *   category: "fitness",
 *   description: "Texto fornecido pela BYX.",
 *   price: 12990,                    // opcional (centavos)
 *   promotionalPrice: 9990,          // opcional (centavos)
 *   images: [
 *     "/images/products/conjunto-fitness-preto/01.jpg",
 *     "/images/products/conjunto-fitness-preto/02.jpg",
 *   ],
 *   sizes: ["P", "M", "G"],          // somente se informado
 *   colors: [{ name: "Preto", hex: "#000000" }],
 *   availability: "available",       // "available" | "sold_out" | "inquiry"
 *   featured: false,
 *   published: true,
 *   createdAt: "2026-01-15",
 * },
 */
export const products: Product[] = [];
