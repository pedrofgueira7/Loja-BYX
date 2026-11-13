import { getImageProps } from "next/image";
import { hero } from "@/data/site-content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Primeira dobra. Duas fotos separadas (desktop / mobile) via <picture>,
 * sem baixar as duas: o navegador escolhe pela largura da tela.
 */
export function Hero() {
  const common = { alt: hero.imageAlt, quality: 80, priority: true } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: hero.imageDesktop, width: 1920, height: 1080, sizes: "100vw" });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: hero.imageMobile, width: 1080, height: 1620, sizes: "100vw" });

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-byx-black text-byx-white lg:min-h-[calc(100svh-5rem)]"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSet} />
        <source media="(max-width: 767px)" srcSet={mobileSet} />
        <img {...img} alt={hero.imageAlt} className="absolute inset-0 -z-20 size-full object-cover" />
      </picture>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-byx-black via-byx-black/45 to-byx-black/10"
      />

      <div className="mx-auto w-full max-w-[1600px] px-5 pt-24 pb-24 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <Reveal immediate delay={0.1}>
          <h1
            id="hero-title"
            // -ml-[0.06em]: compensa o espaço lateral interno (side bearing ≈ 0,0625em) do "B" em
            // corpo gigante, para o traço da letra alinhar com o início dos textos abaixo.
            // É proporcional ao corpo da fonte, então vale para qualquer largura de tela.
            className="-ml-[0.06em] font-display text-[clamp(3.6rem,15.5vw,13rem)] leading-[0.82] font-extrabold tracking-[-0.05em] uppercase"
          >
            {hero.title}
          </h1>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal immediate delay={0.3}>
              <p className="font-display text-xl font-bold tracking-[-0.01em] sm:text-2xl lg:text-3xl">
                {hero.subtitle}
              </p>
            </Reveal>
            <Reveal immediate delay={0.4}>
              <p className="mt-3 max-w-md text-base leading-relaxed text-byx-mid sm:text-lg">{hero.description}</p>
            </Reveal>
          </div>
          <Reveal immediate delay={0.55} className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <ButtonLink href={hero.primaryCta.href} variant="solid-inverse">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline-inverse">
              {hero.secondaryCta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
