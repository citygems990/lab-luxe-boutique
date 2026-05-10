import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, X } from "lucide-react";
import { products, cuts, colors, clarities, type Cut, type Color, type Clarity } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const search = z.object({
  cut: z.enum(["Round","Princess","Emerald","Oval","Cushion","Pear"]).optional(),
}).catch({});

export const Route = createFileRoute("/catalog")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Каталог лабораторных бриллиантов — LUMEN" },
      { name: "description", content: "Каталог сертифицированных lab-grown бриллиантов с фильтрами по огранке, весу, цвету и чистоте." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { cut: initCut } = Route.useSearch();
  const [cut, setCut] = useState<Cut | "all">(initCut ?? "all");
  const [color, setColor] = useState<Color | "all">("all");
  const [clarity, setClarity] = useState<Clarity | "all">("all");
  const [carat, setCarat] = useState<[number, number]>([0.5, 3.5]);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() =>
    products.filter(p =>
      (cut === "all" || p.cut === cut) &&
      (color === "all" || p.color === color) &&
      (clarity === "all" || p.clarity === clarity) &&
      p.carat >= carat[0] && p.carat <= carat[1]
    ), [cut, color, clarity, carat]);

  const reset = () => { setCut("all"); setColor("all"); setClarity("all"); setCarat([0.5, 3.5]); };

  return (
    <div className="container-luxe py-12 md:py-20">
      <div className="mb-10 md:mb-14">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Каталог</span>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Все бриллианты</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "камень" : "камней"} соответствуют выбранным параметрам.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className={`${open ? "fixed inset-0 z-50 overflow-y-auto bg-background p-6" : "hidden"} lg:static lg:block lg:p-0`}>
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h3 className="font-serif text-2xl">Фильтры</h3>
            <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>

          <FilterGroup label="Огранка">
            <Chip active={cut === "all"} onClick={() => setCut("all")}>Все</Chip>
            {cuts.map(c => <Chip key={c} active={cut === c} onClick={() => setCut(c)}>{c}</Chip>)}
          </FilterGroup>

          <FilterGroup label="Цвет">
            <Chip active={color === "all"} onClick={() => setColor("all")}>Все</Chip>
            {colors.map(c => <Chip key={c} active={color === c} onClick={() => setColor(c)}>{c}</Chip>)}
          </FilterGroup>

          <FilterGroup label="Чистота">
            <Chip active={clarity === "all"} onClick={() => setClarity("all")}>Все</Chip>
            {clarities.map(c => <Chip key={c} active={clarity === c} onClick={() => setClarity(c)}>{c}</Chip>)}
          </FilterGroup>

          <FilterGroup label={`Вес: ${carat[0]} – ${carat[1]} ct`}>
            <div className="flex w-full gap-3">
              <input type="range" min={0.5} max={3.5} step={0.05} value={carat[0]}
                onChange={e => setCarat([Math.min(+e.target.value, carat[1]), carat[1]])}
                className="w-full accent-graphite" />
              <input type="range" min={0.5} max={3.5} step={0.05} value={carat[1]}
                onChange={e => setCarat([carat[0], Math.max(+e.target.value, carat[0])])}
                className="w-full accent-graphite" />
            </div>
          </FilterGroup>

          <button onClick={reset} className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">
            Сбросить фильтры
          </button>
        </aside>

        <div>
          <button onClick={() => setOpen(true)}
            className="mb-6 inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-xs uppercase tracking-[0.15em] lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Фильтры
          </button>

          {filtered.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border py-20 text-center">
              <p className="font-serif text-2xl">Ничего не найдено</p>
              <p className="mt-2 text-sm text-muted-foreground">Попробуйте изменить параметры.</p>
              <button onClick={reset} className="mt-6 text-xs uppercase tracking-[0.15em] text-gold">Сбросить</button>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-5">
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs transition-colors ${active ? "bg-graphite text-primary-foreground" : "border border-border text-foreground hover:border-foreground"}`}>
      {children}
    </button>
  );
}
