/**
 * Camada de eventos de marketing (Meta Pixel + Google Analytics 4).
 *
 * - Nada é enviado sem consentimento e sem IDs configurados em variáveis de ambiente.
 * - Não existe evento de compra concluída: a venda acontece no WhatsApp.
 */

export type AnalyticsEvent =
  | "view_item"
  | "select_item"
  | "click_whatsapp"
  | "view_collection"
  | "click_instagram";

export const CONSENT_KEY = "byx-consent";
const UTM_KEY = "byx-utm";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function hasConsent(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

/** Guarda UTMs da primeira visita da sessão para anexar aos eventos. */
export function captureUtms(): void {
  try {
    const search = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of UTM_PARAMS) {
      const value = search.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length) {
      window.sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
    }
  } catch {
    /* armazenamento indisponível: ignorar */
  }
}

function readUtms(): Params {
  try {
    const raw = window.sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as Params) : {};
  } catch {
    return {};
  }
}

const META_EVENT_MAP: Record<AnalyticsEvent, { name: string; custom: boolean }> = {
  view_item: { name: "ViewContent", custom: false },
  select_item: { name: "select_item", custom: true },
  click_whatsapp: { name: "Contact", custom: false },
  view_collection: { name: "view_collection", custom: true },
  click_instagram: { name: "click_instagram", custom: true },
};

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined" || !hasConsent()) return;
  const payload = { ...readUtms(), ...params };

  window.gtag?.("event", event, payload);

  if (window.fbq) {
    const meta = META_EVENT_MAP[event];
    window.fbq(meta.custom ? "trackCustom" : "track", meta.name, payload);
  }
}
