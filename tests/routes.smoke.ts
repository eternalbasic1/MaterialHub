import { expect, test } from "@playwright/test";
import { products, categories } from "../src/features/catalog/data";
const visible = (html: string) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
test("home includes category links and metadata in server HTML", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(visible(html)).toContain("Every great build");
  expect(html).toContain('name="description"');
  for (const category of categories)
    expect(visible(html)).toContain(`/categories/${category.slug}`);
});
test("all category grids contain product cards before JavaScript runs", async ({
  request,
}) => {
  for (const category of categories) {
    const response = await request.get(`/categories/${category.slug}`);
    expect(response.status()).toBe(200);
    const html = visible(await response.text());
    for (const p of products.filter((p) => p.category === category.slug)) {
      expect(html).toContain(`/products/${p.slug}`);
      expect(html).toContain("<article");
    }
  }
});
test("all product pages contain product headings, offers, and canonical links", async ({
  request,
}) => {
  for (const p of products) {
    const response = await request.get(`/products/${p.slug}`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(visible(html)).toMatch(/<h1\b/);
    expect(html).toContain('"@type":"Product"');
    expect(html).toContain(
      `rel="canonical" href="https://materialhub.example/products/${p.slug}"`,
    );
  }
});
test("catalog images are available locally", async ({ request }) => {
  const assets = new Set([
    ...categories.map((c) => c.image),
    ...products.flatMap((p) => [p.image, ...p.images]),
  ]);
  for (const image of assets) {
    const response = await request.get(image);
    expect(response.status(), image).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
});
test("unknown routes return 404 and indexing is disabled for the demo", async ({
  request,
}) => {
  for (const path of [
    "/missing-page",
    "/products/not-a-product",
    "/categories/not-a-category",
  ])
    expect((await request.get(path)).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect((sitemap.match(/<loc>/g) || []).length).toBe(36);
});
test("search is server-rendered and empty searches are usable", async ({
  request,
}) => {
  const found = visible(await (await request.get("/search?q=cement")).text());
  expect(found).toContain("JK Cement JK Super Cement 50kg");
  const empty = visible(
    await (await request.get("/search?q=not-a-real-material")).text(),
  );
  expect(empty).toContain("No materials found");
});
