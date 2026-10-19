import type { CartItem, CartTotals, Product } from "../catalog/types";
export const cartKey = (item: CartItem) =>
  `${item.productId}:${item.variantId ?? "default"}`;
export function addItem(items: CartItem[], item: CartItem): CartItem[] {
  if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) return items;
  const index = items.findIndex(
    (existing) => cartKey(existing) === cartKey(item),
  );
  if (index < 0)
    return [...items, { ...item, quantity: Math.min(9999, item.quantity) }];
  return items.map((existing, i) =>
    i === index
      ? {
          ...existing,
          quantity: Math.min(9999, existing.quantity + item.quantity),
        }
      : existing,
  );
}
export function restoreCart(
  value: string | null,
  products: Product[],
): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.reduce<CartItem[]>((items, entry) => {
      if (!entry || typeof entry !== "object") return items;
      const product = products.find((p) => p.id === entry.productId);
      if (
        !product ||
        !Number.isSafeInteger(entry.quantity) ||
        entry.quantity < 1 ||
        entry.quantity > 9999
      )
        return items;
      if (
        product.variants.length
          ? !product.variants.some((v) => v.id === entry.variantId)
          : entry.variantId !== null
      )
        return items;
      return addItem(items, {
        productId: product.id,
        variantId: entry.variantId,
        quantity: entry.quantity,
      });
    }, []);
  } catch {
    return [];
  }
}
export function calculateTotals(
  items: CartItem[],
  products: Product[],
  coupon = "",
): CartTotals {
  const lines = items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product || !Number.isSafeInteger(item.quantity) || item.quantity < 1)
      return [];
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (product.variants.length && !variant) return [];
    return [
      {
        value:
          Math.round((variant?.price ?? product.price) * 100) * item.quantity,
        gst: product.gstRate,
        quantity: item.quantity,
      },
    ];
  });
  const subtotal = lines.reduce((sum, line) => sum + line.value, 0);
  const discount = coupon === "FREE300" ? Math.min(30000, subtotal) : 0;
  const weightedTax = lines.reduce(
    (sum, line) => sum + (line.value * line.gst) / 100,
    0,
  );
  const tax = Math.round(
    weightedTax * (subtotal ? (subtotal - discount) / subtotal : 0),
  );
  return {
    subtotal,
    discount,
    tax,
    total: subtotal - discount + tax,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
  };
}
