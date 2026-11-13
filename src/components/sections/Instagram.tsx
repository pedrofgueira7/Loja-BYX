import { instagram } from "@/data/site-content";
import { storeConfig } from "@/data/store-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { Reveal } from "@/components/ui/Reveal";

/** Sem scraping de publicações: apenas chamada para o perfil oficial. */
export function Instagram() {
  return (
    <section id="instagram" aria-labelledby="instagram-title" className="bg-byx-light py-20 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 text-center sm:px-8 lg:px-12">
        <SectionHeading id="instagram-title" title={instagram.title} description={instagram.description} align="center" />
        <Reveal delay={0.15}>
          <InstagramLink
            location="secao-instagram"
            className="mt-10 block font-display text-[clamp(2.75rem,12vw,9rem)] leading-none font-extrabold tracking-[-0.05em] break-all hover:underline hover:underline-offset-[0.12em]"
          >
            {storeConfig.instagramHandle}
          </InstagramLink>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10">
            <InstagramLink as="button" location="secao-instagram-botao" variant="solid">
              {instagram.cta}
            </InstagramLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
