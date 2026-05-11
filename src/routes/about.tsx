import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Sparkles, FlaskConical, Award, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О бриллиантах — CITY GEMS" },
      { name: "description", content: "Что такое lab-grown бриллианты, как они производятся и чем отличаются от природных." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-luxe py-16 md:py-24">
      <Reveal className="max-w-3xl">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold">О технологии</span>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05]">
          Камень,<br /><span className="italic text-gold">выращенный</span> с точностью атома.
        </h1>
      </Reveal>

      <div className="mt-20 grid gap-px bg-border md:grid-cols-2">
        {[
          { Icon: FlaskConical, title: "HPHT и CVD", text: "Две передовые технологии: высокое давление с высокой температурой и осаждение из газовой фазы. Обе дают чистейшие монокристаллы." },
          { Icon: Sparkles, title: "Идентичная структура", text: "Sp³-связи углерода, твёрдость 10 по Моосу, тот же показатель преломления и дисперсия — отличить только в спектрометре." },
          { Icon: Leaf, title: "Без вреда планете", text: "В 7 раз меньше углеродного следа, отсутствие шахтных работ и нарушения экосистем." },
          { Icon: ShieldCheck, title: "Прозрачная цепочка", text: "Каждый камень имеет паспорт лаборатории и независимый сертификат IGI." },
        ].map(({ Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="flex h-full flex-col gap-4 bg-background p-8 md:p-10">
              <Icon className="h-8 w-8 text-gold" strokeWidth={1.25} />
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <div className="rounded-sm bg-graphite p-10 text-primary-foreground md:p-16">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Award className="h-8 w-8 text-gold" strokeWidth={1.25} />
              <h2 className="mt-6 font-serif text-4xl md:text-5xl">Готовы выбрать свой камень?</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/70">
                Более 9 сертифицированных бриллиантов в каталоге — от классических Round до редких Emerald огранок.
              </p>
            </div>
            <Link to="/catalog"
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-foreground hover:-translate-y-0.5 transition-transform">
              В каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
