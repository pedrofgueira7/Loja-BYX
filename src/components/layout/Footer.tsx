import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/site-content";
import { storeConfig } from "@/data/store-config";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { InstagramLink } from "@/components/ui/InstagramLink";

function formatPhone(n: string) {
  // 5581984567800 -> +55 (81) 98456-7800
  const m = n.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
  return m ? `+${m[1]} (${m[2]}) ${m[3]}-${m[4]}` : n;
}

export function Footer() {
  return (
    <footer id="contato" className="bg-byx-black text-byx-white">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-16 sm:px-8 md:grid-cols-12 lg:px-12 lg:py-24">
        <div className="md:col-span-5">
          <Image
            src="/images/brand/logo-byx-lockup.svg"
            alt={`${storeConfig.brandName} — ${storeConfig.signature}`}
            width={770}
            height={410}
            unoptimized
            className="h-auto w-56 sm:w-72"
          />
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-byx-mid">
            {storeConfig.segment}. Seu estilo. Seu movimento. Sua essência.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="mb-5 text-[0.7rem] font-bold tracking-[0.3em] text-byx-mid uppercase">Navegue</h2>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center text-sm font-semibold tracking-[0.18em] uppercase hover:underline hover:underline-offset-8"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-5 text-[0.7rem] font-bold tracking-[0.3em] text-byx-mid uppercase">Fale com a BYX</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href={createWhatsAppLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center font-semibold hover:underline hover:underline-offset-8"
              >
                WhatsApp · {formatPhone(storeConfig.whatsappNumber)}
              </a>
            </li>
            <li>
              <InstagramLink
                location="footer"
                className="inline-flex min-h-10 items-center font-semibold hover:underline hover:underline-offset-8"
              >
                Instagram · {storeConfig.instagramHandle}
              </InstagramLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-byx-white/10">
        <p className="mx-auto max-w-[1600px] px-5 py-6 text-xs text-byx-mid sm:px-8 lg:px-12">
          © <CurrentYear /> {storeConfig.brandName} — {storeConfig.signature}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
