import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";

function DiamondOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 9 L12 21 L21 9 L17 3 H7 Z" />
    </svg>
  );
}
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Главная" },
    { to: "/catalog", label: "Каталог" },
    { to: "/about", label: "О бриллиантах" },
    { to: "/checkout", label: "Заказ" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <DiamondOutline className="h-6 w-6 text-foreground" />
          <span className="font-serif text-xl tracking-wide md:text-2xl text-foreground"><span className="tracking-wider">CITY</span><span className="italic font-normal">gems</span></span>
        </Link>
        <nav className="hidden items-center gap-10 text-sm md:flex">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/checkout" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-graphite px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted" onClick={() => setOpen(o => !o)} aria-label="Меню">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="container-luxe flex flex-col py-4">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 text-sm text-muted-foreground"
                activeProps={{ className: "text-foreground" }} activeOptions={{ exact: l.to === "/" }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
