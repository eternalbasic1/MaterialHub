"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCart, useCartTotals } from "@/features/cart/CartProvider";
import { cartKey } from "@/features/cart/logic";
import { products, money } from "@/features/catalog/data";
import { Media } from "./Media";
import { Quantity } from "./Quantity";
import { OrderSummary } from "./OrderSummary";
import { ProductCard } from "./ProductCard";
export function CartPage() {
  const { items, update, remove, ready } = useCart();
  const totals = useCartTotals();
  const recommended = products
    .filter((p) => !items.some((item) => item.productId === p.id))
    .slice(4, 10);
  if (!ready)
    return (
      <div className="panel my-7 min-h-72 animate-pulse p-8 text-sm text-muted">
        Getting your cart ready…
      </div>
    );
  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow">YOUR MATERIALS, TOGETHER</div>
          <h1 className="page-title">
            Your cart <span className="text-muted">({totals.count})</span>
          </h1>
        </div>
        <Link href="/search" className="text-link">
          <ArrowLeft size={13} />
          Continue shopping
        </Link>
      </div>
      {items.length ? (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_365px]">
          <div>
            <div className="space-y-3">
              {items.map((item) => {
                const p = products.find((p) => p.id === item.productId)!;
                const variant = p.variants.find((v) => v.id === item.variantId);
                const price = variant?.price ?? p.price;
                return (
                  <article
                    key={cartKey(item)}
                    className="panel flex flex-wrap items-center gap-4 p-4 sm:p-5"
                  >
                    <Link
                      href={`/products/${p.slug}`}
                      className="relative h-24 w-20 shrink-0 sm:w-24"
                    >
                      <Media
                        src={p.image}
                        alt={p.name}
                        sizes="96px"
                        className="p-1"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {p.brand}
                      </p>
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-xs font-semibold leading-5 hover:text-forest sm:text-sm"
                      >
                        {p.name}
                      </Link>
                      {variant && (
                        <p className="mt-1.5 text-[11px] text-muted">
                          {Object.entries(variant.attributes)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </p>
                      )}
                      <p className="mt-2 text-sm font-bold">
                        {money(price)}
                        <span className="ml-2 text-[11px] font-normal text-muted line-through">
                          {money(variant?.mrp ?? p.mrp)}
                        </span>
                      </p>
                      <span className="mt-1 block text-[11px] text-muted">
                        per {variant?.unit ?? p.unit} · excl. taxes
                      </span>
                    </div>
                    <div className="flex w-full items-baseline justify-between gap-3 border-t border-line pt-3 sm:w-auto sm:min-w-24 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      <span className="text-[11px] text-muted">
                        Line subtotal
                      </span>
                      <span className="text-base font-semibold text-ink">
                        {money((Math.round(price * 100) * item.quantity) / 100)}
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between gap-3 border-t border-line pt-3 sm:w-auto sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      <Quantity
                        value={item.quantity}
                        onChange={(qty) => update(cartKey(item), qty)}
                        label={`Quantity of ${p.name}`}
                      />
                      <button
                        onClick={() => remove(cartKey(item))}
                        aria-label={`Remove ${p.name}`}
                        className="flex items-center gap-1.5 text-[11px] text-muted hover:text-red-600"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-4 text-[11px] leading-5 text-muted">
              Prices shown are basic prices. Sample GST is calculated in the
              order summary.
            </p>
          </div>
          <OrderSummary />
        </div>
      ) : (
        <div className="panel flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
          <span className="mb-5 rounded-full bg-forest-soft p-5 text-forest">
            <ShoppingBag size={35} strokeWidth={1.4} />
          </span>
          <h2 className="text-xl font-bold">
            Big plans? Let’s fill this cart.
          </h2>
          <p className="mt-3 max-w-sm text-xs leading-6 text-muted">
            Your project essentials are a few clicks away. Explore materials
            from brands you know and trust.
          </p>
          <Link className="primary-button mt-6 gap-2" href="/search">
            Start building your cart <ArrowRight size={15} />
          </Link>
        </div>
      )}
      <section className="mt-12">
        <div className="section-heading">
          <div>
            <div className="eyebrow">ALSO IN THE STORE</div>
            <h2>Products you may like</h2>
          </div>
          <span className="text-[11px] text-muted">Scroll to explore →</span>
        </div>
        <div className="hide-scrollbar -mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-5">
          {recommended.map((p) => (
            <div
              key={p.id}
              className="w-[210px] shrink-0 snap-start sm:w-[240px]"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
