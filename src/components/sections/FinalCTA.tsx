import { finalCta } from "@/data/site-content";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-byx-black py-24 text-byx-white lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2
            id="cta-title"
            className="max-w-5xl font-display text-[clamp(2.75rem,10vw,9rem)] leading-[0.88] font-extrabold tracking-[-0.045em] uppercase"
          >
            {finalCta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-md text-lg text-byx-mid">{finalCta.description}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <WhatsAppButton href={createWhatsAppLink(generalMessage)} location="cta-final" variant="solid-inverse">
              {finalCta.cta}
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
