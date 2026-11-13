/**
 * Configurações centrais da loja BYX.
 * Dados comerciais (WhatsApp, Instagram) ficam aqui — um único lugar.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const storeConfig = {
  brandName: "BYX",
  signature: "Be Your X",
  segment: "Moda Fitness & Casual",
  /** Defina NEXT_PUBLIC_SITE_URL na Vercel quando houver domínio próprio. */
  siteUrl: resolveSiteUrl(),
  locale: "pt_BR",
  currency: "BRL",
  whatsappNumber: "5581984567800",
  instagramUrl: "https://www.instagram.com/byxbr/",
  instagramHandle: "@byxbr",
  seo: {
    title: "BYX | Moda Fitness & Casual — Be Your X",
    description:
      "Descubra a BYX. Moda fitness e casual para acompanhar seu estilo, seu movimento e todas as suas versões.",
    ogImage: "/images/brand/og-default.jpg",
  },
  /**
   * Analytics: IDs vêm de variáveis de ambiente (nunca no código).
   * Sem ID configurado, nenhum script de rastreamento é carregado.
   */
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
  /** Quantidade de produtos exibidos por vez no catálogo. */
  catalogPageSize: 8,
} as const;
