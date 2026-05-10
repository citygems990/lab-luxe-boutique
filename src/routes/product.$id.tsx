import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShoppingBag, ShieldCheck, ArrowLeft, Check } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find(p => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — LUMEN` },
      { name: "description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <h1 className="font-serif text-4xl">Камень не найден</h1>
      <Link to="/catalog" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-gold">В каталог</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs = [
    { k: "Огранка (Cut)", v: `${product.cutRu} · ${product.cutGrade}` },
    { k: "Вес (Carat)", v: `${product.carat} ct` },
    { k: "Цвет (Color)", v: product.color },
    { k: "Чистота (Clarity)", v: product.clarity },
  ];

  return (
    <div className="container-luxe py-10 md:py-16">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Каталог
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="aspect-square overflow-hidden rounded-sm bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{product.cert} Certified</span>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4 font-serif text-3xl">{formatPrice(product.price)}</div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Характеристики 4C</h2>
            <dl className="divide-y divide-border border-y border-border">
              {specs.map(s => (
                <div key={s.k} className="flex justify-between py-3 text-sm">
                  <dt className="text-muted-foreground">{s.k}</dt>
                  <dd className="font-medium">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-sm bg-muted/60 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-gold" strokeWidth={1.5} />
            <div className="text-sm">
              <div className="font-medium">Сертификация {product.cert}</div>
              <div className="text-muted-foreground">№ {product.certNumber} · паспорт прилагается к камню</div>
            </div>
          </div>

          <button onClick={handleAdd}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-graphite py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-foreground">
            {added ? <><Check className="h-4 w-4" /> Добавлено</> : <><ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> В корзину</>}
          </button>
          <Link to="/checkout" className="mt-3 inline-flex w-full items-center justify-center rounded-sm border border-foreground/15 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:border-foreground">
            Перейти к оформлению
          </Link>
        </div>
      </div>
    </div>
  );
}
