import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, X } from "lucide-react";
import {
  products,
  cuts,
  colors,
  clarities,
  CUT_RU,
  type Cut,
  type Color,
  type Clarity,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const search = z
  .object({
    cut: z
      .enum(["Round","Oval","Emerald","Princess","Pear","Cushion","Radiant","Heart","Marquise"])
      .optional(),
  })
  .catch({});

export const Route = createFileRoute("/catalog")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Каталог выращенных бриллиантов — CITY GEMS" },
      { name: "description", content: "Каталог сертифицированных lab-grown бриллиантов с фильтрами по огранке, весу, цвету, чистоте и цене." },
    ],
  }),
  component: Catalog,
});

type Filters = {
  shapes: Cut[];
  caratMin: number;
  caratMax: number;
  priceMax: number;
  colors: Color[];
  clarities: Clarity[];
};

const DEFAULTS: Filters = {
  shapes: [],
  caratMin: 0.3,
  caratMax: 5,
  priceMax: 5000000,
  colors: [],
  clarities: [],
};

function Catalog() {
  const { cut: initCut } = Route.useSearch();
  const [filters, setFilters] = useState<Filters>(
    initCut ? { ...DEFAULTS, shapes: [initCut] } : DEFAULTS
  );
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "carat-desc">("price-asc");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (filters.shapes.length && !filters.shapes.includes(p.cut)) return false;
      if (p.carat < filters.caratMin || p.carat > filters.caratMax) return false;
      if (p.price > filters.priceMax) return false;
      if (filters.colors.length && !filters.colors.includes(p.color)) return false;
      if (filters.clarities.length && !filters.clarities.includes(p.clarity)) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.carat - a.carat;
    });
  }, [filters, sort]);

  return (
    <section className="container-luxe py-12 md:py-20">
      <div className="mb-10 max-w-2xl md:mb-14">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Каталог</p>
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">Выращенные бриллианты</h1>
        <p className="mt-4 text-muted-foreground">
          {filtered.length} камней в наличии. Все с лабораторными сертификатами и лазерной маркировкой.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
        <div className="flex items-center justify-between lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-[0.18em]"
          >
            <SlidersHorizontal className="h-4 w-4" /> Фильтры
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border border-border bg-transparent px-3 py-2 text-xs uppercase tracking-[0.18em]"
          >
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="carat-desc">Карат ↓</option>
          </select>
        </div>

        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} resultsCount={filtered.length} />
        </div>

        <div>
          <div className="mb-6 hidden justify-end lg:flex">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border border-border bg-transparent px-3 py-2 text-xs uppercase tracking-[0.18em]"
            >
              <option value="price-asc">Сортировка: цена ↑</option>
              <option value="price-desc">Сортировка: цена ↓</option>
              <option value="carat-desc">Сортировка: карат ↓</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-border py-24 text-center">
              <p className="font-serif text-2xl">Ничего не найдено</p>
              <p className="mt-2 text-sm text-muted-foreground">Попробуйте изменить фильтры</p>
              <button onClick={() => setFilters(DEFAULTS)} className="mt-6 text-xs uppercase tracking-[0.18em] text-gold">
                Сбросить
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-8">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-background p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em]"
            >
              Закрыть <X className="h-4 w-4" />
            </button>
            <FilterSidebar filters={filters} setFilters={setFilters} resultsCount={filtered.length} />
          </div>
        </div>
      )}
    </section>
  );
}

function FilterSidebar({
  filters,
  setFilters,
  resultsCount,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  resultsCount: number;
}) {
  const toggle = <T,>(arr: T[], v: T): T[] => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="mb-6 flex items-baseline justify-between">
        <h3 className="font-serif text-2xl">Фильтры</h3>
        <button
          onClick={() => setFilters(DEFAULTS)}
          className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          Сбросить
        </button>
      </div>

      <Section title="Огранка">
        <div className="flex flex-wrap gap-2">
          {cuts.map((s) => (
            <Chip key={s} active={filters.shapes.includes(s)} onClick={() => setFilters({ ...filters, shapes: toggle(filters.shapes, s) })}>
              {CUT_RU[s]}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title={`Каратность · ${filters.caratMin.toFixed(1)} – ${filters.caratMax.toFixed(1)} ct`}>
        <div className="space-y-3">
          <input
            type="range" min={0.3} max={5} step={0.1} value={filters.caratMin}
            onChange={(e) => setFilters({ ...filters, caratMin: Math.min(parseFloat(e.target.value), filters.caratMax) })}
            className="w-full accent-foreground"
          />
          <input
            type="range" min={0.3} max={5} step={0.1} value={filters.caratMax}
            onChange={(e) => setFilters({ ...filters, caratMax: Math.max(parseFloat(e.target.value), filters.caratMin) })}
            className="w-full accent-foreground"
          />
        </div>
      </Section>

      <Section title="Цвет">
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <Chip key={c} active={filters.colors.includes(c)} onClick={() => setFilters({ ...filters, colors: toggle(filters.colors, c) })}>
              {c}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Чистота">
        <div className="flex flex-wrap gap-2">
          {clarities.map((c) => (
            <Chip key={c} active={filters.clarities.includes(c)} onClick={() => setFilters({ ...filters, clarities: toggle(filters.clarities, c) })}>
              {c}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title={`Цена до ${new Intl.NumberFormat("ru-RU").format(filters.priceMax)} ₽`}>
        <input
          type="range" min={50000} max={5000000} step={50000} value={filters.priceMax}
          onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
          className="w-full accent-foreground"
        />
      </Section>

      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Найдено: <span className="text-foreground">{resultsCount}</span>
      </p>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 border-b border-border/60 pb-6">
      <h4 className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</h4>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs tracking-wide border transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-transparent text-foreground border-border hover:border-foreground/50"
      }`}
    >
      {children}
    </button>
  );
}
