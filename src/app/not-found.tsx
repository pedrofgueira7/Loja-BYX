import type { Metadata } from "next";
import { buttonClasses } from "@/components/ui/Button";
import { SectionLink } from "@/components/ui/SectionLink";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60svh] flex-col items-start justify-center bg-byx-black px-5 py-24 text-byx-white sm:px-8 lg:px-12">
      <p className="text-[0.7rem] font-bold tracking-[0.3em] text-byx-mid uppercase">Erro 404</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase">
        Essa versão
        <br />
        não existe.
      </h1>
      <p className="mt-6 max-w-md text-byx-mid">A página que você procura não está disponível ou a peça saiu do site.</p>
      <SectionLink id="catalogo" category="all" className={`mt-10 ${buttonClasses("solid-inverse")}`}>
        VER PEÇAS DISPONÍVEIS
      </SectionLink>
    </section>
  );
}
