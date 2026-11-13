import Image from "next/image";
import { about } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-byx-light py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-byx-dark">
            <Image src={about.image} alt={about.imageAlt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="lg:col-span-7 lg:pl-6">
          <SectionHeading id="sobre-title" eyebrow="Sobre a BYX" title={about.title} />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-byx-dark sm:text-xl">{about.text}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 font-display text-2xl font-extrabold tracking-[-0.03em] uppercase sm:text-3xl">
              Be Your X.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
