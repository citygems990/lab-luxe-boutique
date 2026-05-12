import { Gem } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-graphite text-primary-foreground">
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Gem className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <span className="font-serif text-2xl"><span className="tracking-wider">CITY</span><span className="italic font-normal">gems</span></span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Сертифицированные лабораторные бриллианты — этичное происхождение, идентичность природным камням и прозрачные характеристики 4C.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg">Контакты</h4>
          <p className="mt-3 text-sm text-primary-foreground/70">
            irvn@yandex.ru<br />
            +7 (993) 619-57-07<br />
            Москва
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg">Сертификация</h4>
          <p className="mt-3 text-sm text-primary-foreground/70">IGI<br />Каждый камень с паспортом международной лаборатории</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} CITY GEMS Lab Diamonds. Все права защищены.
      </div>
    </footer>
  );
}
