"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { storeConfig } from "@/data/store-config";
import { CONSENT_KEY, captureUtms } from "@/lib/analytics";

type Consent = "granted" | "denied" | null;

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignorar */
  }
  listeners.forEach((l) => l());
}

/**
 * Carrega GA4 / Meta Pixel SOMENTE se houver IDs configurados (variáveis de ambiente)
 * e o visitante aceitar. Sem IDs, nada é carregado e nenhum aviso é exibido.
 */
export function Analytics() {
  const { gaId, metaPixelId } = storeConfig.analytics;
  const enabled = Boolean(gaId || metaPixelId);
  const consent = useSyncExternalStore(subscribe, readConsent, () => "denied" as Consent);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    captureUtms();
  }, []);

  if (!enabled) return null;

  return (
    <>
      {consent === "granted" && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {consent === "granted" && metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {hydrated && consent === null && (
        <div
          role="region"
          aria-label="Aviso de privacidade"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-byx-white/20 bg-byx-black p-4 text-byx-white sm:p-5"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-byx-mid">
              Usamos cookies de medição para entender como o site é usado e melhorar a sua experiência.
              Você pode recusar sem prejuízo à navegação.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => writeConsent("denied")}
                className="min-h-11 border border-byx-white px-5 text-xs font-bold tracking-[0.18em] uppercase hover:bg-byx-white hover:text-byx-black"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => writeConsent("granted")}
                className="min-h-11 border border-byx-white bg-byx-white px-5 text-xs font-bold tracking-[0.18em] text-byx-black uppercase hover:bg-transparent hover:text-byx-white"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
