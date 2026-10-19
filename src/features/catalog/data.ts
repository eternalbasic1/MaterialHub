import data from "./mockData.json" with { type: "json" };
import type { Category, Product } from "./types";
export const categories: Category[] = data.categories;
const stringRecord = (value: object): Record<string, string> =>
  Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
export const products: Product[] = data.products.map((p) => ({
  ...p,
  specifications: stringRecord(p.specifications),
  variants: p.variants.map((v) => ({
    ...v,
    attributes: stringRecord(v.attributes),
  })),
}));
export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);
export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug);
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
export const site = {
  name: "MaterialHub",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://materialhub.example",
  city: "Gurugram",
};
