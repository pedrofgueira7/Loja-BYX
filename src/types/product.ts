import type { CategoryId } from "@/data/categories";

export type Availability = "available" | "sold_out" | "inquiry";

export type ProductColor = {
  name: string;
  /** Cor em hexadecimal (ex.: "#000000"). Opcional. */
  hex?: string;
};

export type Product = {
  /** Identificador único e estável. Nunca reutilizar. */
  id: string;
  /** Parte final da URL: /produto/[slug]. Preservar slugs existentes. */
  slug: string;
  name: string;
  sku?: string;
  category: CategoryId;
  description: string;
  shortDescription?: string;
  /** Preço em CENTAVOS inteiros. R$ 129,90 => 12990. */
  price?: number;
  /** Preço promocional em CENTAVOS. Deve ser menor que `price`. */
  promotionalPrice?: number;
  /**
   * Caminhos públicos das fotos, sempre a partir de /images/products/<slug>/.
   * A primeira é a principal; a segunda aparece no hover do card.
   */
  images: string[];
  /** Somente tamanhos informados pela BYX. Vazio = não exibir seletor. */
  sizes: string[];
  /** Somente cores informadas pela BYX. Vazio = não exibir seletor. */
  colors: ProductColor[];
  availability: Availability;
  featured: boolean;
  /** Apenas `published: true` aparece no site, sitemap e rota pública. */
  published: boolean;
  /** Data ISO (AAAA-MM-DD). Usada na ordenação por novidades. */
  createdAt: string;
};
