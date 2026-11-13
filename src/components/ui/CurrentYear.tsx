"use client";

import { useSyncExternalStore } from "react";

const buildYear = new Date().getFullYear();
const subscribe = () => () => {};

/** Ano atual calculado no navegador (o HTML estático usa o ano do build). */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => buildYear);
  return <>{year}</>;
}
