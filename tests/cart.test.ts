import { describe, expect, it } from "vitest";
import {
  addItem,
  calculateTotals,
  restoreCart,
} from "../src/features/cart/logic";
import type { Product } from "../src/features/catalog/types";
const product: Product = {
  id: "1",
  slug: "cement",
  name: "Cement",
  category: "cement",
  subCategory: "Cement",
  brand: "JK",
  image: "",
  images: [],
  price: 350,
  mrp: 438,
  discount: 20,
  unit: "bag",
  specifications: {},
  description: "",
  variants: [
    {
      id: "large",
      attributes: { Size: "Large" },
      price: 700,
      mrp: 875,
      unit: "bag",
    },
  ],
  fastDelivery: true,
  gstRate: 18,
  featured: true,
};
const plain = { ...product, id: "2", variants: [] };
describe("cart and pricing", () => {
  it("merges only identical product and variant combinations", () => {
    let items = addItem([], {
      productId: "1",
      variantId: "large",
      quantity: 2,
    });
    items = addItem(items, { productId: "1", variantId: "large", quantity: 3 });
    items = addItem(items, { productId: "2", variantId: null, quantity: 1 });
    expect(items).toEqual([
      { productId: "1", variantId: "large", quantity: 5 },
      { productId: "2", variantId: null, quantity: 1 },
    ]);
  });
  it("uses variant price and computes paise totals", () => {
    expect(
      calculateTotals(
        [{ productId: "1", variantId: "large", quantity: 2 }],
        [product],
      ),
    ).toEqual({
      subtotal: 140000,
      discount: 0,
      tax: 25200,
      total: 165200,
      count: 2,
    });
  });
  it("caps FREE300 and applies tax after discount", () => {
    const cheap = { ...plain, price: 100 };
    expect(
      calculateTotals(
        [{ productId: "2", variantId: null, quantity: 1 }],
        [cheap],
        "FREE300",
      ),
    ).toEqual({ subtotal: 10000, discount: 10000, tax: 0, total: 0, count: 1 });
    expect(
      calculateTotals(
        [{ productId: "2", variantId: null, quantity: 1 }],
        [plain],
        "FREE300",
      ).total,
    ).toBe(5900);
  });
  it("rounds fractional rupee prices in paise", () => {
    expect(
      calculateTotals(
        [{ productId: "2", variantId: null, quantity: 3 }],
        [{ ...plain, price: 23.14 }],
      ).total,
    ).toBe(8192);
  });
  it("ignores unknown coupon codes", () => {
    expect(
      calculateTotals(
        [{ productId: "2", variantId: null, quantity: 1 }],
        [plain],
        "OTHER",
      ).discount,
    ).toBe(0);
  });
  it("recovers safely from malformed storage and obsolete variants", () => {
    expect(restoreCart("{bad", [product])).toEqual([]);
    expect(restoreCart(null, [product])).toEqual([]);
    expect(restoreCart('{"productId":"1"}', [product])).toEqual([]);
    expect(
      restoreCart(
        JSON.stringify([
          { productId: "1", variantId: "missing", quantity: 1 },
          { productId: "1", variantId: "large", quantity: -2 },
          { productId: "gone", variantId: null, quantity: 1 },
          { productId: "1", variantId: "large", quantity: 2 },
        ]),
        [product],
      ),
    ).toEqual([{ productId: "1", variantId: "large", quantity: 2 }]);
  });
  it("rejects non-integer quantities and variant-less configurable products", () => {
    expect(
      restoreCart(
        JSON.stringify([
          { productId: "1", variantId: null, quantity: 1 },
          { productId: "2", variantId: null, quantity: 1.5 },
        ]),
        [product, plain],
      ),
    ).toEqual([]);
  });
  it("normalizes duplicate saved entries and ignores invalid additions", () => {
    expect(
      restoreCart(
        JSON.stringify([
          { productId: "2", variantId: null, quantity: 1 },
          { productId: "2", variantId: null, quantity: 2 },
        ]),
        [plain],
      ),
    ).toEqual([{ productId: "2", variantId: null, quantity: 3 }]);
    expect(
      addItem([], { productId: "2", variantId: null, quantity: 0 }),
    ).toEqual([]);
  });
});
