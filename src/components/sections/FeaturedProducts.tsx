import { getFeaturedProducts } from "@/lib/catalog";
import { featured } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";

/** Produtos com `featured: true` e `published: true`. Sem destaques, a seção não aparece. */
export function FeaturedProducts() {
  const items = getFeaturedProducts();
  if (items.length === 0) return null;

  return (
    <section id="destaques" aria-labelledby="destaques-title" className="bg-byx-light py-20 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading id="destaques-title" title={featured.title} description={featured.description} />
        <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:mt-16 lg:grid-cols-4 lg:gap-x-6">
          {items.slice(0, 8).map((p, i) => (
            <li key={p.id}>
              <ProductCard product={p} priority={i < 2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
