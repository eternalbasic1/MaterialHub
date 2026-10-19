"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Heart, Plus, Truck } from "lucide-react";
import type { Product } from "@/features/catalog/types";
import { money } from "@/features/catalog/data";
import { useCart } from "@/features/cart/CartProvider";
import { Media } from "./Media";
export function DeliveryBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-muted ${compact ? "text-[11px]" : "text-xs"}`}
    >
      <Truck size={compact ? 13 : 15} strokeWidth={1.5} />
      <span>
        30 min delivery<span aria-hidden="true">*</span>
      </span>
    </span>
  );
}
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add, ready, notify } = useCart();
  const [saved, setSaved] = useState(false);
  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-white transition duration-300 hover:border-forest-line hover:shadow-sm hover:shadow-forest/5">
      <div className="product-image-surface relative px-3 pb-2 pt-3 sm:px-4">
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-forest-soft px-2 py-1 text-[11px] font-medium text-forest">
          {product.discount}% off
        </span>
        <button
          aria-label={saved ? `Unsave ${product.name}` : `Save ${product.name}`}
          aria-pressed={saved}
          onClick={() => {
            setSaved(!saved);
            notify(
              saved
                ? "Removed from your saved items."
                : "Saved for this visit.",
            );
          }}
          className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-md text-muted transition hover:bg-white hover:text-rose-600"
        >
          <Heart
            size={17}
            className={saved ? "fill-rose-500 text-rose-500" : ""}
          />
        </button>
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="relative mt-7 block aspect-[1.2]"
        >
          <Media
            src={product.image}
            alt={product.name}
            priority={priority}
            className="p-3 mix-blend-multiply transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-3 pt-4 sm:p-4">
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">
          {product.brand}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 min-h-10 text-[13px] font-semibold leading-5 text-ink hover:text-forest"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-[11px] text-muted">Sold per {product.unit}</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-xl font-semibold tracking-tight text-ink">
            {money(product.price)}
          </span>
          <span className="text-xs text-muted line-through">
            {money(product.mrp)}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted">Basic price · excl. taxes</p>
        <div className="mt-auto pt-4">
          <div className="mb-3 flex min-h-5 items-center">
            {product.fastDelivery ? (
              <DeliveryBadge compact />
            ) : (
              <span className="text-[11px] text-muted">
                Standard site delivery
              </span>
            )}
          </div>
          {product.variants.length ? (
            <Link
              href={`/products/${product.slug}`}
              aria-label={`Choose options for ${product.name}`}
              className="product-action"
            >
              Choose options <ArrowUpRight size={14} />
            </Link>
          ) : (
            <button
              disabled={!ready}
              onClick={() =>
                add({ productId: product.id, variantId: null, quantity: 1 })
              }
              aria-label={`Add ${product.name} to cart`}
              className="product-action"
            >
              <Plus size={15} />
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
