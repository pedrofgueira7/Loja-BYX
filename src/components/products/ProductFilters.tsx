"use client";

import { categories, type CategoryId } from "@/data/categories";
import type { SortKey } from "@/lib/catalog";

export type CategoryFilter = CategoryId | "all";

type Props = {
  category: CategoryFilter;
  onCategory: (c: CategoryFilter) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  counts: Record<string, number>;
};

const SORTS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Novidades" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
];

export function ProductFilters({ category, onCategory, sort, onSort, counts }: Props) {
  const tabs: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: "Todos" },
    ...categories.map((c) => ({ id: c.id as CategoryFilter, label: c.label })),
  ];

  return (
    <div className="flex flex-col gap-5 border-y border-byx-black py-4 sm:flex-row sm:items-center sm:justify-between">
      <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-x-2 gap-y-1">
        {tabs.map((t) => {
          const active = category === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => onCategory(t.id)}
              className={`min-h-11 px-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                active ? "bg-byx-black text-byx-white" : "hover:bg-byx-light"
              }`}
            >
              {t.label}
              <span className={`ml-2 ${active ? "text-byx-mid" : "text-byx-dark/60"}`}>{counts[t.id] ?? 0}</span>
            </button>
          );
        })}
      </div>

      <label className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase">
        <span className="shrink-0">Ordenar</span>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          className="min-h-11 w-full border border-byx-black bg-byx-white px-3 text-sm font-semibold tracking-normal normal-case sm:w-auto"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
