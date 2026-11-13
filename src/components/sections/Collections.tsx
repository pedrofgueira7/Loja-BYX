import Image from "next/image";
import { categories } from "@/data/categories";
import { collections } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CatalogLink } from "@/components/ui/CatalogLink";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Collections() {
  return (
    <section id="colecoes" aria-labelledby="colecoes-title" className="bg-byx-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading id="colecoes-title" title={collections.title} description={collections.description} />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <article className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-byx-black text-byx-white sm:aspect-[5/6] lg:aspect-[4/5]">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-byx-black/85 via-byx-black/20 to-transparent" />
                <div className="p-6 sm:p-10">
                  <h3 className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase">
                    {c.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-base text-byx-white/85">{c.tagline}</p>
                  <CatalogLink category={c.id} className={`mt-7 ${buttonClasses("solid-inverse")}`}>
                    {c.cta}
                  </CatalogLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
