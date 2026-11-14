"use client";

import { useEffect } from "react";
import { categories } from "@/data/categories";
import { scrollToSectionSoon, sectionIdFromHref, takePendingScroll } from "@/lib/scroll";
import { CATEGORY_EVENT } from "./SectionLink";

const categoryIds: string[] = categories.map((c) => c.id);

function goTo(target: string) {
  if (categoryIds.includes(target)) {
    window.dispatchEvent(new CustomEvent(CATEGORY_EVENT, { detail: target }));
  }
  scrollToSectionSoon(target);
}

/** Remove só o fragmento, preservando caminho, parâmetros de consulta e o estado do histórico do Next. */
function stripHash() {
  window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
}

/**
 * Montado na home. Resolve para onde rolar:
 *  1. destino guardado por um SectionLink clicado em outra página (ao montar);
 *  2. fragmento recebido de fora, ex.: link compartilhado /#sobre (ao montar)
 *     ou fragmento colado/alterado com a página já aberta (hashchange).
 * Depois remove o fragmento da barra de endereço, deixando a URL limpa.
 */
export function ScrollIntent() {
  useEffect(() => {
    const handleHash = () => {
      const id = sectionIdFromHref(window.location.hash);
      if (id && document.getElementById(id)) {
        goTo(id);
        stripHash();
      }
    };

    const pending = takePendingScroll();
    if (pending && document.getElementById(pending)) goTo(pending);
    handleHash();

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return null;
}
