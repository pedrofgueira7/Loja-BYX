import Image from "next/image";
import { lifestyle } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Composição editorial assimétrica: 3 colunas de larguras e deslocamentos diferentes
 * no desktop (cada imagem declara sua coluna em site-content.ts).
 * No mobile as colunas se desfazem e as fotos viram uma grade de 2 colunas.
 */
const columns = [
  "md:col-span-5",
  "md:col-span-4 md:mt-28",
  "md:col-span-3 md:mt-12",
] as const;

export function Lifestyle() {
  return (
    <section id="lifestyle" aria-labelledby="lifestyle-title" className="bg-byx-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading id="lifestyle-title" title={lifestyle.title} />

        <div className="mt-12 grid grid-cols-2 items-start gap-3 md:grid-cols-12 md:gap-6 lg:mt-16">
          {columns.map((colClass, col) => (
            <div key={colClass} className={`contents md:flex md:flex-col md:gap-6 ${colClass}`}>
              {lifestyle.images
                .filter((img) => img.col === col)
                .map((img, i) => (
                  <Reveal key={img.src} delay={(col + i) * 0.08} className={img.mobileFull ? "col-span-2 md:col-span-1" : ""}>
                    <div className="relative overflow-hidden bg-byx-dark" style={{ aspectRatio: img.ratio }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width:1024px) 40vw, (min-width:768px) 40vw, 50vw"
                        className="object-cover transition-transform duration-[1200ms] hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              {col === 2 && (
                <Reveal delay={0.3} className="col-span-2 md:col-span-1">
                  <p className="flex aspect-[4/3] items-end bg-byx-black p-5 font-display text-2xl leading-none font-extrabold tracking-[-0.03em] text-byx-white uppercase md:aspect-square lg:text-3xl">
                    Be
                    <br />
                    Your X.
                  </p>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
