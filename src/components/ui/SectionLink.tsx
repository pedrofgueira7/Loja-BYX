"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import type { CategoryId } from "@/data/categories";
import { scrollToSectionSoon, setPendingScroll } from "@/lib/scroll";

export const CATEGORY_EVENT = "byx:category";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  /** id da seção na home (ex.: "sobre", "catalogo", "fitness"). */
  id: string;
  /** Categoria a pré-selecionar no catálogo antes de rolar. */
  category?: CategoryId | "all";
  /** Chamado ao clicar (ex.: fechar o menu mobile). */
  onNavigate?: () => void;
};

/**
 * Link para uma seção da home.
 * - Na home: rola suavemente, sem adicionar "#" à URL.
 * - Em outra página: volta para "/" e rola até a seção (destino guardado, sem "#").
 * - O href continua "/#id" para abrir em nova aba, copiar o link e para quem não usa JS;
 *   esse fragmento é limpo ao chegar (ver ScrollIntent).
 */
export function SectionLink({ id, category, onNavigate, onClick, children, ...props }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    // Deixa o navegador agir em Ctrl/Cmd/Shift/Alt+clique, botão do meio e prevent externo.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate?.();

    if (category) {
      window.dispatchEvent(new CustomEvent(CATEGORY_EVENT, { detail: category }));
    }
    if (pathname === "/") {
      scrollToSectionSoon(id);
    } else {
      setPendingScroll(id);
      router.push("/");
    }
  }

  return (
    <Link href={`/#${id}`} onClick={handleClick} scroll={false} {...props}>
      {children}
    </Link>
  );
}
