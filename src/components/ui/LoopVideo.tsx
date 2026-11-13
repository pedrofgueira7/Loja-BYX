"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** Descrição do vídeo para leitores de tela. */
  label: string;
  className?: string;
};

/**
 * Vídeo decorativo em loop, mudo e sem controles.
 * - Só toca enquanto está visível na tela (economiza bateria e dados).
 * - Respeita prefers-reduced-motion: nesse caso fica parado no primeiro quadro.
 */
export function LoopVideo({ src, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      if (reduce.matches || !visible) {
        video.pause();
      } else {
        // play() pode ser recusado pelo navegador (economia de dados); sem problema.
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    reduce.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
    />
  );
}
