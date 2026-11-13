import { manifesto } from "@/data/site-content";

/** Faixa em movimento horizontal (CSS puro; desligada com prefers-reduced-motion). */
export function Manifesto() {
  const items = Array.from({ length: 6 });
  const group = (hidden: boolean) =>
    items.map((_, i) => (
      <span key={`${hidden ? "b" : "a"}${i}`} aria-hidden={hidden || i > 0 ? true : undefined} className="flex items-center">
        <span className="px-8 sm:px-12">{manifesto.text}</span>
        <span aria-hidden className="font-display text-byx-mid">
          ✕
        </span>
      </span>
    ));

  return (
    <section
      aria-label={manifesto.text}
      className="overflow-hidden border-y border-byx-white/15 bg-byx-black py-6 text-byx-white sm:py-8"
    >
      <div className="byx-marquee-track flex w-max animate-marquee font-display text-[clamp(1.5rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.02em] whitespace-nowrap uppercase">
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}
