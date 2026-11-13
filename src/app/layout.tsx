import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Analytics } from "@/components/ui/Analytics";
import { Providers } from "@/components/ui/Providers";
import { storeConfig } from "@/data/store-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: storeConfig.seo.title,
    template: `%s | ${storeConfig.brandName}`,
  },
  description: storeConfig.seo.description,
  applicationName: storeConfig.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: storeConfig.locale,
    siteName: storeConfig.brandName,
    title: storeConfig.seo.title,
    description: storeConfig.seo.description,
    url: "/",
    images: [{ url: storeConfig.seo.ogImage, width: 1200, height: 630, alt: "BYX — Be Your X" }],
  },
  twitter: {
    card: "summary_large_image",
    title: storeConfig.seo.title,
    description: storeConfig.seo.description,
    images: [storeConfig.seo.ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only z-[60] bg-byx-white px-4 py-3 text-sm font-bold text-byx-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <Providers>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
