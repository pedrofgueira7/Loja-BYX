/**
 * Categorias da BYX.
 *
 * Para criar uma nova categoria, basta adicionar um item aqui.
 * O tipo `CategoryId` é derivado automaticamente desta lista, então o
 * TypeScript passa a aceitar o novo id em `products.ts`.
 */
export const categories = [
  {
    id: "fitness",
    label: "Fitness",
    name: "BYX Fitness",
    tagline: "Movimento e estilo em cada escolha.",
    cta: "EXPLORAR FITNESS",
    image: "/images/collections/fitness.jpg",
    imageAlt: "Coleção BYX Fitness",
  },
  {
    id: "casual",
    label: "Casual",
    name: "BYX Casual",
    tagline: "Versatilidade para expressar quem você é.",
    cta: "EXPLORAR CASUAL",
    image: "/images/collections/casual.jpg",
    imageAlt: "Coleção BYX Casual",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type Category = (typeof categories)[number];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
