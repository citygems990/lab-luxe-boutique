import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col border border-border/60 bg-card transition-all duration-500 hover:border-foreground/30 shadow-soft hover:shadow-luxe"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={`Выращенный бриллиант ${product.cutRu} ${product.carat} карат`}
          width={800}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground">
          {product.cert}
        </span>
      </Link>

      <div className="p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <Link to="/product/$id" params={{ id: product.id }} className="font-serif text-xl md:text-2xl hover:text-gold transition-colors">
            {product.cutRu}
          </Link>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {product.id.toUpperCase()}
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-4 gap-2 border-y border-border/60 py-3 text-center">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Карат</dt>
            <dd className="mt-0.5 font-serif text-lg">{product.carat.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Цвет</dt>
            <dd className="mt-0.5 font-serif text-lg">{product.color}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Чистота</dt>
            <dd className="mt-0.5 font-serif text-lg">{product.clarity}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Огранка</dt>
            <dd className="mt-0.5 font-serif text-sm leading-tight">
              {product.cutGrade === "Excellent" ? "Ex" : product.cutGrade === "Very Good" ? "VG" : "G"}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-serif text-2xl">{formatPrice(product.price)}</span>
          <button
            onClick={() => add(product.id)}
            className="text-xs uppercase tracking-[0.18em] border-b border-foreground/40 pb-0.5 transition-colors hover:border-gold hover:text-gold"
          >
            В корзину
          </button>
        </div>
      </div>
    </motion.article>
  );
}
