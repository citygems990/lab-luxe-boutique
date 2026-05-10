import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Minus, Plus, Trash2, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Оформление заказа — LUMEN" },
      { name: "description", content: "Оставьте заявку — менеджер свяжется с вами для уточнения деталей заказа." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(80),
  phone: z.string().trim().min(6, "Введите телефон").max(30),
  email: z.string().trim().email("Некорректный email").max(120),
  comment: z.string().trim().max(500).optional(),
});

function Checkout() {
  const { detailed, total, count, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    clear();
  };

  if (sent) {
    return (
      <div className="container-luxe py-24 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
            <Check className="h-8 w-8 text-gold" strokeWidth={1.5} />
          </div>
          <h1 className="mt-6 font-serif text-4xl">Заявка отправлена</h1>
          <p className="mt-4 text-muted-foreground">
            Менеджер свяжется с вами в ближайшее время для уточнения деталей заказа.
          </p>
          <Link to="/catalog" className="mt-8 inline-flex rounded-sm bg-graphite px-6 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-luxe py-12 md:py-20">
      <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Корзина</span>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Оформление заказа</h1>

      {count === 0 ? (
        <div className="mt-12 rounded-sm border border-dashed border-border py-20 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" strokeWidth={1.25} />
          <p className="mt-4 font-serif text-2xl">Корзина пуста</p>
          <p className="mt-2 text-sm text-muted-foreground">Добавьте бриллианты из каталога.</p>
          <Link to="/catalog" className="mt-6 inline-flex rounded-sm bg-graphite px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground">
            В каталог
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="divide-y divide-border border-y border-border">
            {detailed.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-4 py-5">
                <Link to="/product/$id" params={{ id: product.id }} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-muted">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link to="/product/$id" params={{ id: product.id }} className="font-serif text-lg leading-tight">{product.name}</Link>
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                        {product.cut} · {product.carat}ct · {product.color} · {product.clarity}
                      </p>
                    </div>
                    <div className="font-serif text-lg">{formatPrice(product.price * qty)}</div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center rounded-sm border border-border">
                      <button onClick={() => setQty(product.id, qty - 1)} className="px-3 py-2 hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm">{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-2 hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => remove(product.id)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" /> Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside>
            <div className="rounded-sm border border-border bg-muted/30 p-6">
              <h2 className="font-serif text-2xl">Итого</h2>
              <div className="mt-4 flex justify-between border-b border-border pb-4 text-sm">
                <span className="text-muted-foreground">Позиций</span><span>{count}</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Сумма</span>
                <span className="font-serif text-3xl">{formatPrice(total)}</span>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-3" noValidate>
                <Field label="Имя" error={errors.name}>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={80}
                    className="w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-foreground focus:outline-none" />
                </Field>
                <Field label="Телефон" error={errors.phone}>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} maxLength={30}
                    className="w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-foreground focus:outline-none" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} maxLength={120}
                    className="w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-foreground focus:outline-none" />
                </Field>
                <Field label="Комментарий" error={errors.comment}>
                  <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} maxLength={500} rows={3}
                    className="w-full rounded-sm border border-border bg-background px-3 py-3 text-sm focus:border-foreground focus:outline-none" />
                </Field>
                <button type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-sm bg-graphite py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground hover:bg-foreground">
                  Отправить заказ
                </button>
                <p className="text-center text-[11px] text-muted-foreground">Без онлайн-оплаты. Менеджер свяжется с вами.</p>
              </form>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
