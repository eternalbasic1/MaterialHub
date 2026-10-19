import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProduct,
  getCategory,
  products,
  site,
} from "@/features/catalog/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductCard } from "@/components/ProductCard";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: p.name,
      description: p.description,
      images: [{ url: p.image, alt: p.name }],
    },
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const related = products
    .filter((p) => p.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.category === product.category) -
        Number(a.category === product.category),
    )
    .slice(0, 4);
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        image: product.images.map((image) => `${site.url}${image}`),
        description: product.description,
        sku: product.id,
        brand: { "@type": "Brand", name: product.brand },
        offers: {
          "@type": "Offer",
          url: `${site.url}/products/${slug}`,
          priceCurrency: "INR",
          price: product.price,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: category.name,
            item: `${site.url}/categories/${category.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${site.url}/products/${slug}`,
          },
        ],
      },
    ],
  };
  return (
    <div className="page-shell pb-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
      <Breadcrumbs
        items={[
          { label: category.name, href: `/categories/${category.slug}` },
          { label: product.name },
        ]}
      />
      <ProductDetails product={product} />
      <section className="mt-14 border-t border-line pt-9">
        <div className="section-heading">
          <div>
            <div className="eyebrow">COMPLETE YOUR MATERIALS LIST</div>
            <h2>Pairs well with your next build</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
