/**
 * Rolagem até seções SEM alterar a URL (nada de /#sobre na barra de endereço).
 * O CSS global já aplica `scroll-margin-top` (5rem) em todo [id], compensando o header sticky.
 */

const PENDING_KEY = "byx:scroll-target";

/** "/#sobre" -> "sobre"; qualquer outra coisa -> "". */
export function sectionIdFromHref(href: string): string {
  const i = href.indexOf("#");
  return i === -1 ? "" : href.slice(i + 1);
}

/** Rola suavemente até a seção (instantâneo se o visitante prefere menos movimento). */
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  return true;
}

/** Espera a página assentar (menu mobile fechando, troca de rota) antes de rolar. */
export function scrollToSectionSoon(id: string): void {
  // Timer curto (e não rAF): rAF é pausado em abas em segundo plano e o destino ficaria sem rolar.
  window.setTimeout(() => scrollToSection(id), 60);
}

/** Guarda o destino quando o clique acontece fora da home (ex.: página de produto). */
export function setPendingScroll(id: string): void {
  try {
    window.sessionStorage.setItem(PENDING_KEY, id);
  } catch {
    /* armazenamento indisponível: o visitante cai no topo da home */
  }
}

export function takePendingScroll(): string | null {
  try {
    const id = window.sessionStorage.getItem(PENDING_KEY);
    if (id) window.sessionStorage.removeItem(PENDING_KEY);
    return id;
  } catch {
    return null;
  }
}
