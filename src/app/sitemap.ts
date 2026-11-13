import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/lib/catalog";
import { storeConfig } from "@/data/store-config";

/** Gerado a partir do catálogo local. Produtos despublicados nunca entram. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = storeConfig.siteUrl;
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    ...getPublishedProducts().map((p) => ({
      url: `${base}/produto/${p.slug}`,
      lastModified: p.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
