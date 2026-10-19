"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  PackageSearch,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { Category, Product } from "@/features/catalog/types";
import { categories } from "@/features/catalog/data";
import { filterProducts } from "@/features/catalog/filter";
import { ProductCard } from "./ProductCard";
import { Media } from "./Media";
// Read browser filters without suspending the initial, pre-rendered product grid.
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener("materialhub-filters", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("materialhub-filters", callback);
  };
};
const snapshot = () => window.location.search;
const serverSnapshot = () => "";
export function CatalogView({
  catalog,
  category,
  query,
}: {
  catalog: Product[];
  category?: Category;
  query?: string;
}) {
  const search = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const params = new URLSearchParams(search);
  const path = usePathname();
  const drawer = useRef<HTMLDialogElement>(null);
  const [min, setMin] = useState(params.get("min") || "");
  const [max, setMax] = useState(params.get("max") || "");
  const [error, setError] = useState("");
  useEffect(() => {
    queueMicrotask(() => {
      const current = new URLSearchParams(search);
      setMin(current.get("min") || "");
      setMax(current.get("max") || "");
    });
  }, [search]);
  const sub = params.get("sub") || "";
  const sort = params.get("sort") || "newest";
  const filtered = filterProducts(catalog, {
    q: query,
    sub,
    sort,
    min: params.get("min") || "",
    max: params.get("max") || "",
    featured: params.get("featured") || "",
  });
  const subcategories = [...new Set(catalog.map((p) => p.subCategory))];
  const active = Boolean(
    params.get("min") || params.get("max") || sub || params.get("featured"),
  );
  function change(values: Record<string, string>) {
    const updated = new URLSearchParams(params.toString());
    Object.entries(values).forEach(([key, value]) =>
      value ? updated.set(key, value) : updated.delete(key),
    );
    window.history.pushState(
      null,
      "",
      `${path}${updated.size ? "?" + updated.toString() : ""}`,
    );
    window.dispatchEvent(new Event("materialhub-filters"));
  }
  function apply(e: React.FormEvent) {
    e.preventDefault();
    if (
      (min && (!Number.isFinite(Number(min)) || Number(min) < 0)) ||
      (max && (!Number.isFinite(Number(max)) || Number(max) < 0)) ||
      (min && max && Number(min) > Number(max))
    ) {
      setError("Enter a valid range: minimum must not exceed maximum.");
      return;
    }
    setError("");
    change({ min, max });
    drawer.current?.close();
  }
  const filters = (
    <>
      <div className="mb-7">
        <h3 className="mb-4 text-xs font-semibold text-ink">Price range</h3>
        <form onSubmit={apply}>
          <div className="flex items-center gap-2">
            <label className="min-w-0 flex-1">
              <span className="mb-1.5 block text-[11px] text-muted">
                Min (₹)
              </span>
              <input
                aria-label="Minimum price"
                type="number"
                min="0"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="0"
                className="field h-10 px-2 text-xs"
              />
            </label>
            <span className="pt-4 text-muted">–</span>
            <label className="min-w-0 flex-1">
              <span className="mb-1.5 block text-[11px] text-muted">
                Max (₹)
              </span>
              <input
                aria-label="Maximum price"
                type="number"
                min="0"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Any"
                className="field h-10 px-2 text-xs"
              />
            </label>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-[11px] text-red-600">
              {error}
            </p>
          )}
          <button className="mt-3 h-9 w-full rounded-md bg-forest text-xs font-semibold text-white hover:bg-forest-hover">
            Apply price filter
          </button>
        </form>
      </div>
      <div className="border-t border-line pt-6">
        <h3 className="mb-3 text-xs font-semibold text-ink">Shop categories</h3>
        <div className="space-y-1">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className={`flex items-center justify-between rounded-md px-2 py-2 text-xs ${category?.id === c.id ? "bg-forest-soft font-semibold text-forest" : "text-muted hover:bg-canvas"}`}
            >
              {c.name}
              {category?.id === c.id && (
                <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
  return (
    <div className="pb-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow">
            {category ? "BROWSE THE MATERIALS" : "SEARCH THE CATALOGUE"}
          </div>
          <h1 className="page-title">
            {category
              ? category.name
              : query
                ? `Results for “${query}”`
                : params.get("featured")
                  ? "Builder favourites"
                  : "All materials"}
          </h1>
          <p className="mt-2 text-xs text-muted">
            {category
              ? "Everything you need to get the job done, from brands you trust."
              : "Great materials for every stage of your project."}
          </p>
        </div>
        <span className="text-xs text-muted">{filtered.length} products</span>
      </div>
      {category && (
        <div className="hide-scrollbar -mx-1 mb-7 mt-6 flex gap-2.5 overflow-x-auto p-1">
          <button
            className={`flex min-w-24 items-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold ${!sub ? "border-forest-line bg-forest-soft text-forest" : "border-line bg-white text-muted"}`}
            onClick={() => change({ sub: "" })}
          >
            <LayoutGrid size={15} />
            All products
          </button>
          {subcategories.map((s) => (
            <button
              key={s}
              onClick={() => change({ sub: s })}
              className={`flex max-w-52 shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium ${sub === s ? "border-forest-line bg-forest-soft text-forest" : "border-line bg-white text-muted hover:border-forest-line"}`}
            >
              <span className="relative h-9 w-9 shrink-0">
                <Media
                  src={catalog.find((p) => p.subCategory === s)!.image}
                  alt=""
                  sizes="36px"
                />
              </span>
              {s}
            </button>
          ))}
        </div>
      )}
      <div className={`mt-7 flex gap-7 ${category ? "lg:mt-0" : ""}`}>
        <aside className="hidden w-[220px] shrink-0 self-start rounded-lg border border-line bg-canvas p-4 lg:block">
          <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <SlidersHorizontal size={15} />
              Filters
            </h2>
            {active && (
              <button
                onClick={() => {
                  setMin("");
                  setMax("");
                  change({ min: "", max: "", sub: "", featured: "" });
                }}
                className="text-[11px] font-medium text-forest"
              >
                Reset
              </button>
            )}
          </div>
          {filters}
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2.5">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 text-xs font-semibold lg:hidden"
                onClick={() => drawer.current?.showModal()}
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>
              <span className="hidden text-xs text-muted lg:inline">
                Showing {filtered.length} products
              </span>
              {active && (
                <button
                  onClick={() => {
                    setMin("");
                    setMax("");
                    change({ min: "", max: "", sub: "", featured: "" });
                  }}
                  className="flex items-center gap-1 rounded bg-forest-soft px-2 py-1 text-[11px] text-forest"
                >
                  <RotateCcw size={10} />
                  Clear filters
                </button>
              )}
            </div>
            <label className="flex items-center gap-2 text-xs text-muted">
              Sort by:
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) =>
                  change({
                    sort: e.target.value === "newest" ? "" : e.target.value,
                  })
                }
                className="max-w-40 cursor-pointer bg-transparent font-semibold text-ink outline-none"
              >
                <option value="newest">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
              <ChevronDown size={12} />
            </label>
          </div>
          {filtered.length ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard product={p} key={p.id} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="panel flex min-h-80 flex-col items-center justify-center p-8 text-center">
              <PackageSearch size={45} className="mb-5 text-forest" />
              <h2 className="text-lg font-bold">No materials found</h2>
              <p className="mt-2 max-w-xs text-xs leading-6 text-muted">
                Try another search or adjust your filters to find what your
                project needs.
              </p>
              <Link
                className="primary-button mt-5 gap-2"
                href={category ? `/categories/${category.slug}` : "/search"}
              >
                Browse all products <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <dialog
        ref={drawer}
        aria-label="Product filters"
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(85vw,340px)] max-w-none border-0 bg-white p-6 shadow-2xl backdrop:bg-ink/40"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            aria-label="Close filters"
            className="icon-button"
            onClick={() => drawer.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        {filters}
      </dialog>
    </div>
  );
}
