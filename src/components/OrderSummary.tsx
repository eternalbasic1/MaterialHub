"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, LockKeyhole, Tag, X } from "lucide-react";
import { useCart, useCartTotals } from "@/features/cart/CartProvider";
import { money } from "@/features/catalog/data";
export function OrderSummary({
  checkout = false,
  onOrder,
}: {
  checkout?: boolean;
  onOrder?: () => void;
}) {
  const { coupon, setCoupon, ready } = useCart();
  const totals = useCartTotals();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  function apply(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() !== "FREE300") {
      setError("That code isn’t available. Try FREE300.");
      return;
    }
    setCoupon("FREE300");
    setError("");
    setCode("");
  }
  return (
    <aside className="panel h-fit p-5 sm:p-6">
      <h2 className="text-base font-bold text-ink">Order summary</h2>
      <div className="mt-6 space-y-4 text-xs">
        <div className="flex justify-between gap-4 text-muted">
          <span>
            Basic price ({totals.count} {totals.count === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-ink">
            {money(totals.subtotal / 100)}
          </span>
        </div>
        {coupon && (
          <div className="flex justify-between gap-4 text-forest">
            <span>Coupon discount</span>
            <span>− {money(totals.discount / 100)}</span>
          </div>
        )}
        <div className="flex justify-between gap-4 text-muted">
          <span>
            GST <span className="text-[11px]">(sample 18%)</span>
          </span>
          <span className="font-medium text-ink">
            {money(totals.tax / 100)}
          </span>
        </div>
        <div className="flex justify-between gap-4 text-muted">
          <span>Delivery</span>
          <span className="font-medium text-forest">
            Free <span className="text-[11px] font-normal">in this demo</span>
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-dashed border-line pt-5">
          <span className="font-bold text-ink">
            Total{" "}
            <span className="text-[11px] font-normal text-muted">
              (incl. GST)
            </span>
          </span>
          <span className="text-2xl font-bold tracking-tight text-ink">
            {money(totals.total / 100)}
          </span>
        </div>
      </div>
      {!checkout && (
        <div className="mt-6 border-t border-line pt-5">
          {coupon ? (
            <div className="rounded-lg border border-forest-line bg-forest-soft p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-forest">
                <Check size={16} />
                FREE300 applied
                <button
                  aria-label="Remove coupon"
                  onClick={() => setCoupon("")}
                  className="ml-auto"
                >
                  <X size={15} />
                </button>
              </div>
              <p className="mt-1 pl-6 text-[11px] text-forest">
                You saved {money(totals.discount / 100)} on materials.
              </p>
            </div>
          ) : (
            <form onSubmit={apply}>
              <label
                htmlFor="coupon"
                className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted"
              >
                <Tag size={14} />
                Have a coupon?
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  className="field h-10 min-w-0 flex-1 text-xs uppercase placeholder:normal-case"
                  placeholder="Enter coupon code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  aria-describedby={error ? "coupon-error" : undefined}
                />
                <button className="rounded-lg border border-forest-line px-4 text-xs font-semibold text-forest hover:bg-forest-soft">
                  Apply
                </button>
              </div>
              {error && (
                <p
                  id="coupon-error"
                  role="alert"
                  className="mt-2 text-[11px] text-red-600"
                >
                  {error}
                </p>
              )}
              <p className="mt-2 text-[11px] text-muted">
                A little head start: try{" "}
                <span className="font-bold text-forest">FREE300</span> for up to
                ₹300 off.
              </p>
            </form>
          )}
        </div>
      )}
      {checkout ? (
        <button
          disabled={!ready || !totals.count}
          className="primary-button mt-6 w-full gap-2 text-sm"
          onClick={onOrder}
        >
          Place demo order <ArrowRight size={16} />
        </button>
      ) : (
        <Link
          href="/checkout"
          className="primary-button mt-6 w-full gap-2 text-sm"
        >
          Proceed to checkout <ArrowRight size={16} />
        </Link>
      )}
      <p className="mt-3 text-center text-[11px] leading-5 text-muted">
        Pay online · Currently serviceable in Gurugram only
        <br />
        Demo checkout — no payment will be collected.
      </p>
      <div className="mt-4 flex items-center justify-center gap-1.5 border-t border-line pt-4 text-[11px] text-muted">
        <LockKeyhole size={12} />
        No payment details required in this demo
      </div>
    </aside>
  );
}
