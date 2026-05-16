import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Leaf, ArrowRight } from "lucide-react";
import heroDiamond from "@/assets/hero-diamond.jpg";
import { products, cuts, CUT_RU } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { CutIcon } from "@/components/CutIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CITY GEMS — выращенные бриллианты премиум-класса" },
      { name: "description", content: "Сертифицированные lab-grown бриллианты. Этичность, идентичность природным камням и до 99% выгоднее." },
      { property: "og:image", content: heroDiamond },
    ],
  }),
  component: Index,
});

function Index() {
  const popular = products.slice(0, 6);
  return (
    <>
      <section className="relative overflow-hidden bg-background text-foreground">
        <div className="absolute inset-0">
          <img
            src={heroDiamond}
            alt="Выращенный бриллиант"
            width={1920}
            height={655}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" />
        </div>

        <div className="container-luxe relative py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 text-xs md:text-sm uppercase tracking-[0.3em] text-white/85" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.55)' }}>
              Lab-Grown · Сертификат IGI
            </p>
            <h1 className="text-2xl leading-[1.05] md:text-4xl lg:text-5xl max-w-3xl text-white" style={{ fontFamily: '"Courier New", Courier, monospace', textShadow: '0 2px 14px rgba(0,0,0,0.6)' }}>
              Совершенство, <em className="not-italic">выращенное</em> человеком
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg text-white/95" style={{ fontFamily: '"Courier New", Courier, monospace', textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}>
              Каталог выращенных бриллиантов CITY GEMS — каждый камень идентичен природному
              по химии, оптике и сиянию. Этичный выбор без компромиссов.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 text-xs uppercase tracking-[0.2em] text-gold-foreground transition-opacity hover:opacity-90"
              >
                Перейти в каталог <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Узнать больше
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Почему лабораторные</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Чистота выбора в каждом аспекте</h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {[
            { Icon: Leaf, title: "Этичное происхождение", text: "Без шахт и конфликтных зон. Полная прозрачность цепочки поставок." },
            { Icon: Sparkles, title: "Идентичны природным", text: "Та же химия, твёрдость и блеск. Отличить может только лабораторный анализ." },
            { Icon: ShieldCheck, title: "До 99% выгоднее", text: "Лучшее соотношение цены и характеристик 4C при той же красоте камня." },
          ].map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 bg-background p-8 md:p-10">
                <Icon className="h-8 w-8 text-gold" strokeWidth={1.25} />
                <h3 className="font-serif text-2xl">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-luxe">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Огранки</span>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Популярные формы</h2>
            </div>
            <Link to="/catalog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-gold">
              Все огранки <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-9">
            {cuts.map((c, i) => (
              <Reveal key={c} delay={i * 0.04}>
                <Link
                  to="/catalog"
                  search={{ cut: c }}
                  className="flex aspect-square flex-col items-center justify-center gap-2 p-3 text-center transition-all hover:-translate-y-1 hover:text-gold"
                >
                  <CutIcon cut={c} className="h-12 w-12 text-foreground/80" />
                  <span className="font-serif text-base">{CUT_RU[c]}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Подборка</span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Избранные камни</h2>
          </div>
          <Link to="/catalog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-gold">
            Весь каталог <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
