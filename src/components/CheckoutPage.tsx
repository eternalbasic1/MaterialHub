"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useCart, useCartTotals } from "@/features/cart/CartProvider";
import { products, money } from "@/features/catalog/data";
import { Media } from "./Media";
import { OrderSummary } from "./OrderSummary";
export function CheckoutPage() {
  const { items, clear, ready } = useCart();
  const totals = useCartTotals();
  const [receipt, setReceipt] = useState<{ id: string; total: number } | null>(
    null,
  );
  function place() {
    setReceipt({
      id: `MH-DEMO-${Date.now().toString().slice(-7)}`,
      total: totals.total,
    });
    clear();
  }
  if (!ready)
    return (
      <p className="py-20 text-sm text-muted">Preparing your order review…</p>
    );
  if (receipt)
    return (
      <div className="panel mx-auto my-8 flex max-w-xl flex-col items-center px-7 py-12 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-forest-soft text-forest">
          <Check size={38} />
        </span>
        <span className="mb-2 mt-7 text-[11px] font-semibold uppercase tracking-[2px] text-forest">
          DEMO ORDER CONFIRMATION
        </span>
        <h1 className="page-title">Your demo order is complete!</h1>
        <p className="mt-4 text-xs leading-7 text-muted">
          You’ve reached the end of the demo shopping flow.
          <br />
          No real order was placed and no payment was collected.
        </p>
        <div className="mt-7 w-full rounded-lg bg-canvas p-5 text-xs">
          <p className="flex justify-between">
            <span className="text-muted">Demo reference</span>
            <span className="font-semibold">{receipt.id}</span>
          </p>
          <p className="mt-4 flex justify-between">
            <span className="text-muted">Illustrative total</span>
            <span className="font-bold">{money(receipt.total / 100)}</span>
          </p>
        </div>
        <Link href="/" className="primary-button mt-7 gap-2">
          Back to the store <ArrowRight size={15} />
        </Link>
      </div>
    );
  if (!items.length)
    return (
      <div className="panel my-8 p-12 text-center">
        <h1 className="page-title">Your cart is empty.</h1>
        <p className="mt-4 text-sm text-muted">
          Add materials to your cart before reviewing your order.
        </p>
        <Link href="/search" className="primary-button mt-6">
          Explore materials
        </Link>
      </div>
    );
  return (
    <>
      <div className="mb-7">
        <div className="eyebrow">CHECK YOUR MATERIALS</div>
        <h1 className="page-title">Review your order</h1>
        <p className="mt-3 text-xs text-muted">
          Frontend demo only. No address, payment information or real order is
          collected.
        </p>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_365px]">
        <div className="space-y-5">
          <div className="panel flex items-start gap-3 p-5">
            <MapPin size={21} className="shrink-0 text-forest" />
            <div>
              <h2 className="text-sm font-bold">Demo delivery · Gurugram</h2>
              <p className="mt-2 text-xs leading-6 text-muted">
                Delivery details will be collected when a live checkout is
                connected. Nothing will be dispatched from this demo.
              </p>
            </div>
          </div>
          <section className="panel p-5">
            <h2 className="mb-3 text-sm font-bold">Your materials</h2>
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              const variant = product.variants.find(
                (v) => v.id === item.variantId,
              );
              return (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex items-center gap-4 border-b border-line py-4 last:border-0"
                >
                  <div className="relative h-16 w-16 shrink-0">
                    <Media
                      src={product.image}
                      alt={product.name}
                      sizes="64px"
                      className="p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold leading-5">
                      {product.name}
                    </p>
                    {variant && (
                      <p className="mt-1 text-[11px] text-muted">
                        {Object.values(variant.attributes).join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 text-[11px] text-muted">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold">
                    {money(
                      (Math.round((variant?.price ?? product.price) * 100) *
                        item.quantity) /
                        100,
                    )}
                  </span>
                </div>
              );
            })}
          </section>
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck size={16} />
            Your browser stores the cart. No personal details are submitted.
          </div>
          <Link href="/cart" className="text-link">
            <ArrowLeft size={13} />
            Back to cart
          </Link>
        </div>
        <OrderSummary checkout onOrder={place} />
      </div>
    </>
  );
}
