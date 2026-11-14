"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/site-content";
import { storeConfig } from "@/data/store-config";
import { SectionLink } from "@/components/ui/SectionLink";
import { sectionIdFromHref } from "@/lib/scroll";

/**
 * Header sticky sempre preto: a logo original é branca e precisa de fundo escuro.
 * Mobile: logo à esquerda, hambúrguer à direita, painel com animação suave.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-byx-white/10 bg-byx-black text-byx-white">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link
          href="/"
          aria-label={`${storeConfig.brandName} — ${storeConfig.signature}, página inicial`}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/brand/logo-byx-wordmark.svg"
            alt="BYX"
            width={770}
            height={280}
            priority
            unoptimized
            className="h-9 w-auto lg:h-11"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.label}>
                <SectionLink
                  id={sectionIdFromHref(item.href)}
                  category={"category" in item ? item.category : undefined}
                  className="group relative py-2 text-[0.72rem] font-semibold tracking-[0.22em] uppercase"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-byx-white transition-transform duration-300 group-hover:scale-x-100" />
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 flex size-12 items-center justify-center lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu mobile"
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-byx-black px-5 pt-6 pb-10 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  className="border-b border-byx-white/10"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <SectionLink
                    id={sectionIdFromHref(item.href)}
                    category={"category" in item ? item.category : undefined}
                    onNavigate={() => setOpen(false)}
                    className="flex min-h-16 items-center font-display text-3xl font-extrabold tracking-[-0.03em] uppercase"
                  >
                    {item.label}
                  </SectionLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
