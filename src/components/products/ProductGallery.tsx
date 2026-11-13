"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Props = { images: string[]; name: string };

export function ProductGallery({ images, name }: Props) {
  const [index, setIndex] = useState(0);
  const many = images.length > 1;
  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse md:gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-byx-light md:flex-1">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${name} — foto ${i + 1} de ${images.length}`}
            fill
            sizes="(min-width:1024px) 45vw, (min-width:768px) 55vw, 100vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        ))}
        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center bg-byx-white/90 text-byx-black hover:bg-byx-white"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center bg-byx-white/90 text-byx-black hover:bg-byx-white"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
            <p className="absolute right-3 bottom-3 bg-byx-black px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-byx-white">
              {index + 1} / {images.length}
            </p>
          </>
        )}
      </div>

      {many && (
        <ul className="flex gap-2 overflow-x-auto md:w-20 md:flex-col md:overflow-visible" aria-label="Miniaturas">
          {images.map((src, i) => (
            <li key={src} className="w-16 shrink-0 md:w-full">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                className={`relative block aspect-[4/5] w-full overflow-hidden bg-byx-light outline-offset-2 ${
                  i === index ? "ring-2 ring-byx-black" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
