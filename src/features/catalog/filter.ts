import type { Product } from "./types";
export type CatalogFilters = {
  q?: string;
  sub?: string;
  sort?: string;
  min?: string;
  max?: string;
  featured?: string;
};
export function filterProducts(
  products: Product[],
  filters: CatalogFilters,
): Product[] {
  const query = (filters.q || "").trim().toLowerCase();
  const min = filters.min?.trim() ? Number(filters.min) : null;
  const max = filters.max?.trim() ? Number(filters.max) : null;
  const result = products.filter(
    (p) =>
      (!query ||
        [p.name, p.brand, p.subCategory, p.category]
          .join(" ")
          .toLowerCase()
          .includes(query)) &&
      (!filters.sub || p.subCategory === filters.sub) &&
      (!filters.featured || p.featured) &&
      (!(min !== null && Number.isFinite(min)) || p.price >= min) &&
      (!(max !== null && Number.isFinite(max)) || p.price <= max),
  );
  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (filters.sort === "name")
    result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}
