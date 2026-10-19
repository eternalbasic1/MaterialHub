import { Suspense } from "react";
import { CatalogView } from "@/components/CatalogView";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { products } from "@/features/catalog/data";
export const metadata = {
  title: "Explore materials",
  robots: { index: false, follow: false },
  alternates: { canonical: "/search" },
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="page-shell">
      <Breadcrumbs items={[{ label: "Explore materials" }]} />
      <Suspense
        fallback={
          <div className="min-h-96 animate-pulse rounded-lg bg-canvas" />
        }
      >
        <CatalogView catalog={products} query={params.q || ""} />
      </Suspense>
    </div>
  );
}
