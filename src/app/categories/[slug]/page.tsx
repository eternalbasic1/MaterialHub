import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  getCategory,
  products,
  site,
} from "@/features/catalog/data";
import { CatalogView } from "@/components/CatalogView";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  return {
    title: c?.name || "Category not found",
    description: `Shop ${c?.name} from trusted brands. Explore quality materials for your next project in Gurugram.`,
    alternates: { canonical: `/categories/${slug}` },
  };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return (
    <div className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: site.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: category.name,
                item: `${site.url}/categories/${slug}`,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Breadcrumbs items={[{ label: category.name }]} />
      <Suspense
        fallback={
          <div className="min-h-96 animate-pulse rounded-lg bg-canvas" />
        }
      >
        <CatalogView
          catalog={products.filter((p) => p.category === slug)}
          category={category}
        />
      </Suspense>
    </div>
  );
}
