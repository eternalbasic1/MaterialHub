import { expect, it } from "vitest";
import { products, categories } from "../src/features/catalog/data";
import { filterProducts } from "../src/features/catalog/filter";
it("has 24 complete products spanning all 11 categories", () => {
  expect(products).toHaveLength(24);
  expect(categories).toHaveLength(11);
  expect(new Set(products.map((p) => p.category)).size).toBe(11);
  for (const p of products) {
    expect(p.image).toMatch(/^\/images\//);
    expect(p.price).toBeGreaterThan(0);
    expect(p.mrp).toBeGreaterThan(p.price);
  }
});
it("filters search and inclusive prices and orders numerically", () => {
  const found = filterProducts(products, {
    q: "cement",
    min: "350",
    max: "400",
    sort: "price-desc",
  });
  expect(found.length).toBeGreaterThan(0);
  expect(
    found.every(
      (p) =>
        p.name.toLowerCase().includes("cement") &&
        p.price >= 350 &&
        p.price <= 400,
    ),
  ).toBe(true);
  expect(found[0].price).toBeGreaterThanOrEqual(found.at(-1)!.price);
  expect(filterProducts(products, { q: "nothing-matches-this" })).toEqual([]);
  expect(filterProducts(products, { min: "broken" })).toHaveLength(24);
});
it("filters by exact subcategory and featured products", () => {
  expect(
    filterProducts(products, { sub: products[0].subCategory }).every(
      (p) => p.subCategory === products[0].subCategory,
    ),
  ).toBe(true);
  expect(
    filterProducts(products, { featured: "1" }).every((p) => p.featured),
  ).toBe(true);
});
