"use client";

import { WhatsAppIcon } from "./WhatsAppIcon";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

/** Botão flutuante. Respeita a área segura (notch / barra de gestos) no mobile. */
export function FloatingWhatsApp() {
  return (
    <a
      href={createWhatsAppLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a BYX pelo WhatsApp"
      onClick={() => track("click_whatsapp", { location: "floating" })}
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full border border-byx-black bg-byx-white text-byx-black shadow-[0_0_0_1px_rgba(255,255,255,0.4)] transition-transform duration-300 hover:scale-105 focus-visible:outline-offset-4 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
