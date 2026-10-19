"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Heart,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import type { Product } from "@/features/catalog/types";
import { money } from "@/features/catalog/data";
import { useCart } from "@/features/cart/CartProvider";
import { Media } from "./Media";
import { Quantity } from "./Quantity";
import { DeliveryBadge } from "./ProductCard";
export function ProductDetails({ product }: { product: Product }) {
  const { add, ready, notify } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(product.image);
  const [variant, setVariant] = useState(product.variants[0] ?? null);
  const [saved, setSaved] = useState(false);
  const [sticky, setSticky] = useState(false);
  const purchase = useRef<HTMLDivElement>(null);
  const price = variant?.price ?? product.price;
  const mrp = variant?.mrp ?? product.mrp;
  const unit = variant?.unit ?? product.unit;
  const keys = [
    ...new Set(product.variants.flatMap((v) => Object.keys(v.attributes))),
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (purchase.current) observer.observe(purchase.current);
    return () => observer.disconnect();
  }, []);
  function select(key: string, value: string) {
    const candidates = product.variants.filter(
      (v) => v.attributes[key] === value,
    );
    const current = variant?.attributes ?? {};
    candidates.sort((a, b) =>
      keys.reduce(
        (sum, k) =>
          sum +
          Number(b.attributes[k] === current[k]) -
          Number(a.attributes[k] === current[k]),
        0,
      ),
    );
    if (candidates[0]) setVariant(candidates[0]);
  }
  function addToCart() {
    add({ productId: product.id, variantId: variant?.id ?? null, quantity });
  }
  return (
    <div className="grid items-start gap-7 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <div className="lg:sticky lg:top-44">
        <div className="panel relative aspect-square overflow-hidden">
          <Media
            src={image}
            alt={product.name}
            priority
            className="p-8 sm:p-12"
            sizes="(max-width: 1024px) 90vw, 550px"
          />
          <span className="absolute left-5 top-5 rounded-md bg-forest-soft px-2.5 py-1.5 text-[11px] font-semibold text-forest">
            {Math.round((1 - price / mrp) * 100)}% OFF
          </span>
          <button
            onClick={() => {
              setSaved(!saved);
              notify(
                saved ? "Removed from saved items." : "Saved for this visit.",
              );
            }}
            aria-label="Save product"
            aria-pressed={saved}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-muted"
          >
            <Heart
              size={19}
              className={saved ? "fill-rose-500 text-rose-500" : ""}
            />
          </button>
        </div>
        <div className="mt-4 flex gap-3">
          {product.images.map((img, i) => (
            <button
              key={img}
              aria-label={`View image ${i + 1}`}
              aria-pressed={image === img}
              onClick={() => setImage(img)}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 bg-white ${image === img ? "border-forest" : "border-line hover:border-forest-line"}`}
            >
              <Media
                src={img}
                alt={`${product.name}, image ${i + 1}`}
                className="p-2"
                sizes="80px"
              />
            </button>
          ))}
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted">
          <ShieldCheck size={13} />
          Quality materials, sourced from trusted brands.
        </p>
      </div>
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded bg-forest-soft px-2 py-1 text-[11px] font-semibold text-forest">
            {product.brand}
          </span>
          <span className="text-[11px] text-muted">{product.subCategory}</span>
        </div>
        <h1 className="text-2xl font-bold leading-snug tracking-[-0.7px] text-ink sm:text-[30px]">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          In stock & ready for your project
        </div>
        <div className="mt-6 border-y border-line py-5">
          <div className="flex flex-wrap items-end gap-3">
            <p className="text-[32px] font-extrabold tracking-tight text-ink">
              {money(price)}
              <span className="ml-1.5 text-xs font-normal tracking-normal text-muted">
                / {unit}
              </span>
            </p>
            <span className="mb-2 rounded bg-forest-soft px-2 py-1 text-[11px] font-bold text-forest">
              {Math.round((1 - price / mrp) * 100)}% OFF
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            MRP <span className="line-through">{money(mrp)}</span>
            <span className="ml-3 font-medium text-forest">
              You save {money(Math.round((mrp - price) * 100) / 100)}
            </span>
          </p>
          <p className="mt-2 text-[11px] text-muted">
            Basic price · exclusive of taxes
          </p>
          {product.fastDelivery && (
            <div className="mt-4">
              <DeliveryBadge />
            </div>
          )}
        </div>
        {keys.length > 0 && (
          <div className="space-y-5 border-b border-line py-5">
            {keys.map((key) => (
              <fieldset key={key}>
                <legend className="mb-2.5 text-xs font-semibold text-ink">
                  {key}:{" "}
                  <span className="ml-1 font-normal text-muted">
                    {variant?.attributes[key]}
                  </span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {[
                    ...new Set(
                      product.variants
                        .map((v) => v.attributes[key])
                        .filter(Boolean),
                    ),
                  ].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={variant?.attributes[key] === value}
                      onClick={() => select(key, value)}
                      className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${variant?.attributes[key] === value ? "border-forest bg-forest-soft text-forest ring-1 ring-forest" : "border-line bg-white text-muted hover:border-forest-line"}`}
                    >
                      {/colou?r/i.test(key) &&
                        [
                          "Red",
                          "Yellow",
                          "Blue",
                          "Green",
                          "Black",
                          "Grey",
                          "White",
                        ].includes(value) && (
                          <span
                            className="h-3 w-3 rounded-full border border-black/10"
                            style={{ backgroundColor: value.toLowerCase() }}
                          />
                        )}
                      {value}
                      {variant?.attributes[key] === value && (
                        <Check size={12} />
                      )}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        )}
        <div ref={purchase} className="py-6">
          <p className="mb-3 text-xs font-semibold text-muted">Quantity</p>
          <div className="flex gap-3">
            <Quantity value={quantity} onChange={setQuantity} />
            <button
              disabled={!ready}
              onClick={addToCart}
              className="primary-button flex-1 gap-2 text-sm"
            >
              <ShoppingCart size={17} />
              Add to cart
            </button>
          </div>
          <Link
            href="/cart"
            className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-forest"
          >
            View cart & checkout <ArrowRight size={13} />
          </Link>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-forest-line bg-forest-soft/60 p-4">
          <MapPin size={18} className="mt-0.5 shrink-0 text-forest" />
          <div>
            <p className="text-xs font-semibold text-ink">
              Delivering to Gurugram
            </p>
            <p className="mt-1 text-[11px] leading-5 text-muted">
              *Sample delivery estimate. This storefront is a demo; no real
              deliveries or orders are arranged.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 border-b border-line pb-6">
          {[
            { icon: BadgeCheck, text: "Trusted brands" },
            { icon: PackageCheck, text: "Quality checked" },
            { icon: Truck, text: "Site delivery" },
          ].map(({ icon: Icon, text }) => (
            <span
              className="flex flex-col items-center gap-2 text-center text-[11px] text-muted"
              key={text}
            >
              <Icon size={21} className="text-forest" strokeWidth={1.5} />
              {text}
            </span>
          ))}
        </div>
        <section className="pt-6">
          <h2 className="mb-3 text-sm font-bold">About this product</h2>
          <p className="text-xs leading-7 text-muted">{product.description}</p>
        </section>
        <section className="pt-6">
          <h2 className="mb-4 text-sm font-bold">Product specifications</h2>
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left text-xs">
              <tbody>
                {Object.entries({
                  ...product.specifications,
                  ...variant?.attributes,
                }).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-line bg-white last:border-0"
                  >
                    <th
                      scope="row"
                      className="w-2/5 px-4 py-3 font-normal text-muted"
                    >
                      {key}
                    </th>
                    <td className="px-4 py-3 font-medium text-ink">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {sticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-line bg-white px-5 py-3 shadow-xl lg:hidden">
          <div>
            <p className="text-lg font-bold">{money(price)}</p>
            <p className="text-[11px] text-muted">per {unit} · excl. taxes</p>
          </div>
          <button
            disabled={!ready}
            onClick={addToCart}
            className="primary-button ml-auto gap-2 px-8"
          >
            <ShoppingCart size={16} />
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
}
