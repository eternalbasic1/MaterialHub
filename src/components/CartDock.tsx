"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCartTotals } from "@/features/cart/CartProvider";
import { money } from "@/features/catalog/data";
export function CartDock() {
  const path = usePathname();
  const totals = useCartTotals();
  if (
    !totals.count ||
    path.startsWith("/cart") ||
    path.startsWith("/checkout") ||
    path.startsWith("/products")
  )
    return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 px-4">
      <Link
        href="/cart"
        className="pointer-events-auto mx-auto flex max-w-2xl items-center gap-3 rounded-lg bg-forest px-5 py-3.5 text-white shadow-xl shadow-forest/20"
      >
        <span className="rounded-full bg-white/15 p-2">
          <ShoppingCart size={19} />
        </span>
        <div>
          <p className="text-xs font-bold">
            {totals.count} {totals.count === 1 ? "item" : "items"} in your cart
          </p>
          <p className="mt-1 text-[11px] text-white/85">
            {money(totals.subtotal / 100)} · excl. taxes
          </p>
        </div>
        <span className="ml-auto flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-forest">
          View cart <ArrowRight size={14} />
        </span>
      </Link>
    </div>
  );
}
