import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Leaf, ArrowRight } from "lucide-react";
import heroDiamond from "@/assets/hero-diamond.jpg";
import { products, cuts, CUT_RU } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMEN — выращенные бриллианты премиум-класса" },
      { name: "description", content: "Сертифицированные lab-grown бриллианты. Этичность, идентичность природным камням и до 70% выгоднее." },
      { property: "og:image", content: heroDiamond },
    ],
  }),
  component: Index,
});

function Index() {
  const popular = products.slice(0, 6);
  return (
    <>
      <section className="relative overflow-hidden bg-graphite text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroDiamond}
            alt="Выращенный бриллиант"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-transparent" />
        </div>

        <div className="container-luxe relative py-24 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 text-xs md:text-sm uppercase tracking-[0.3em] text-gold">
              Lab-Grown · Сертификат IGI / GIA
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl lg:text-8xl max-w-3xl">
              Совершенство, <em className="not-italic text-gold">выращенное</em> человеком
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
              Каталог выращенных бриллиантов LUMEN — каждый камень идентичен природному
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
            { Icon: ShieldCheck, title: "До 70% выгоднее", text: "Лучшее соотношение цены и характеристик 4C при той же красоте камня." },
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
                  className="flex aspect-square flex-col items-center justify-center border border-border bg-background p-3 text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-soft"
                >
                  <CutIcon name={c} />
                  <span className="mt-2 font-serif text-base">{CUT_RU[c]}</span>
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

function CutIcon({ name }: { name: string }) {
  const shapes: Record<string, React.ReactNode> = {
    Round: <circle cx="20" cy="20" r="14" />,
    Princess: <rect x="6" y="6" width="28" height="28" />,
    Emerald: <rect x="9" y="4" width="22" height="32" rx="2" />,
    Oval: <ellipse cx="20" cy="20" rx="11" ry="15" />,
    Cushion: <rect x="6" y="6" width="28" height="28" rx="6" />,
    Pear: <path d="M20 4 C 30 14, 32 24, 20 36 C 8 24, 10 14, 20 4 Z" />,
    Radiant: <path d="M12 4 H28 L36 12 V28 L28 36 H12 L4 28 V12 Z" />,
    Heart: <path d="M20 34 C 6 24, 4 12, 12 8 C 16 6, 20 10, 20 14 C 20 10, 24 6, 28 8 C 36 12, 34 24, 20 34 Z" />,
    Marquise: <path d="M20 4 C 30 14, 30 26, 20 36 C 10 26, 10 14, 20 4 Z" />,
  };
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 stroke-foreground" fill="none" strokeWidth="1.25">
      {shapes[name]}
    </svg>
  );
}
