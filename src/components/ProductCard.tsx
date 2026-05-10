import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}
      className="group flex flex-col">
      <Link to="/product/$id" params={{ id: product.id }} className="relative aspect-square overflow-hidden rounded-sm bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground">{product.cert}</span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to="/product/$id" params={{ id: product.id }} className="font-serif text-lg leading-tight hover:text-gold">{product.name}</Link>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            {product.cut} · {product.carat}ct · {product.color} · {product.clarity}
          </p>
        </div>
        <div className="text-right">
          <div className="font-serif text-lg">{formatPrice(product.price)}</div>
        </div>
      </div>
      <button onClick={() => add(product.id)}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/15 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:bg-graphite hover:text-primary-foreground">
        <Plus className="h-4 w-4" strokeWidth={1.5} /> В корзину
      </button>
    </motion.div>
  );
}
