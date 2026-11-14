import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getPublishedProducts, getRelatedProducts, mainImage } from "@/lib/catalog";
import { getCategory } from "@/data/categories";
import { storeConfig } from "@/data/store-config";
import { CatalogLink } from "@/components/ui/CatalogLink";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductCard } from "@/components/products/ProductCard";
import { getPriceInfo } from "@/lib/format";

/** Somente produtos publicados geram página. Qualquer outro slug => 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const description = product.shortDescription ?? product.description.slice(0, 160);
  const image = mainImage(product);
  return {
    title: product.name,
    description,
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} | ${storeConfig.brandName}`,
      description,
      url: `/produto/${product.slug}`,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${storeConfig.brandName}`,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/produto/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const { current } = getPriceInfo(product);
  const images = product.images.length ? product.images : [mainImage(product)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: images.map((src) => new URL(src, storeConfig.siteUrl).toString()),
    brand: { "@type": "Brand", name: storeConfig.brandName },
    ...(current != null
      ? {
          offers: {
            "@type": "Offer",
            url: new URL(`/produto/${product.slug}`, storeConfig.siteUrl).toString(),
            priceCurrency: storeConfig.currency,
            price: (current / 100).toFixed(2),
            availability:
              product.availability === "sold_out"
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto max-w-[1600px] px-5 pt-8 pb-20 sm:px-8 lg:px-12 lg:pt-12 lg:pb-28">
        <nav aria-label="Você está em" className="mb-8 text-xs tracking-[0.15em] text-byx-dark uppercase">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="hover:underline">
                Início
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <CatalogLink category={product.category} className="hover:underline">
                {category?.label ?? product.category}
              </CatalogLink>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-bold text-byx-black">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery images={images} name={product.name} />
          </div>
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <ProductDetails product={product} />
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="relacionados" className="mt-24 border-t border-byx-black pt-12">
            <h2
              id="relacionados"
              className="font-display text-3xl font-extrabold tracking-[-0.03em] uppercase sm:text-4xl"
            >
              Veja também
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
