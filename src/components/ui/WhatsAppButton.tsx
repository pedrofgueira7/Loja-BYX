"use client";

import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClasses } from "./Button";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Parameters<typeof buttonClasses>[0];
  className?: string;
  /** Onde o botão está (para analytics): "hero", "card", "produto", "footer"... */
  location: string;
  /** Nome do produto, quando aplicável. */
  item?: string;
  icon?: boolean;
  ariaLabel?: string;
};

/** CTA comercial: abre o WhatsApp em nova aba e registra `click_whatsapp`. */
export function WhatsAppButton({
  href,
  children,
  variant = "solid",
  className,
  location,
  item,
  icon = true,
  ariaLabel,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={buttonClasses(variant, className)}
      onClick={() => track("click_whatsapp", { location, item })}
    >
      {icon && <MessageCircle aria-hidden className="size-4 shrink-0" strokeWidth={2.2} />}
      {children}
    </a>
  );
}
