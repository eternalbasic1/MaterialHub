"use client";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Grid2X2,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Store,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { categories, products } from "@/features/catalog/data";
import { useCartTotals } from "@/features/cart/CartProvider";
import { InfoDialog } from "./InfoDialog";
function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 32;
const getServerScrolled = () => false;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${light ? "text-white" : "text-ink"}`}
      aria-label="MaterialHub home"
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-md text-white ${light ? "border border-white/40 bg-white/10" : "bg-forest"}`}
      >
        <Building2 size={25} strokeWidth={2.1} />
      </span>
      <span className="text-[23px] font-extrabold tracking-[-1.2px]">
        Material
        <span className={light ? "text-white" : "text-forest"}>Hub</span>
      </span>
    </Link>
  );
}
export function Header() {
  const path = usePathname();
  const { count } = useCartTotals();
  const [mobile, setMobile] = useState(false);
  const home = path === "/";
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
  );
  const transparent = home && !scrolled && !mobile;
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const suggestions =
    query.trim().length > 1
      ? products
          .filter((p) =>
            (p.name + " " + p.brand)
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
          )
          .slice(0, 4)
      : [];
  return (
    <>
      <div
        className={`${home ? "hidden" : ""} border-b border-line bg-canvas text-[11px] text-muted`}
      >
        <div className="page-shell flex min-h-8 items-center justify-between gap-3 py-1">
          <span>For homes, worksites & everything in between.</span>
          <span className="hidden shrink-0 sm:inline">
            Gurugram · Demo storefront
          </span>
        </div>
      </div>
      <header
        data-home={home || undefined}
        data-transparent={transparent || undefined}
        className={`${home ? "fixed inset-x-0" : "sticky"} top-0 z-40 border-b transition-[background-color,border-color,color,box-shadow] duration-300 ${transparent ? "home-header-transparent border-white/20 bg-transparent text-white" : "border-line bg-white text-ink"} ${home && !transparent ? "shadow-sm" : ""}`}
      >
        <div className="page-shell flex min-h-[86px] flex-wrap items-center gap-5 py-4 lg:flex-nowrap lg:gap-8">
          <Logo light={transparent} />
          <div
            className={`${home ? "hidden" : "hidden xl:block"} border-l border-line pl-6`}
          >
            <InfoDialog
              title="Delivering in Gurugram"
              label={
                <span className="flex items-center gap-2 text-left">
                  <MapPin size={20} className="text-forest" />
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-muted">
                      Delivering to
                    </span>
                    <span className="flex items-center gap-2 text-sm font-bold">
                      Gurugram <ChevronDown size={12} />
                    </span>
                  </span>
                </span>
              }
            >
              This demo storefront is set to Gurugram. Delivery estimates and
              service availability are sample information; no deliveries are
              arranged.
            </InfoDialog>
          </div>
          {home && (
            <nav
              aria-label="Homepage navigation"
              className="hidden shrink-0 items-center gap-6 text-[13px] lg:flex"
            >
              <Link
                href="/search"
                className="hover:underline underline-offset-4"
              >
                Shop materials
              </Link>
              <Link
                href="/#categories"
                className="hover:underline underline-offset-4"
              >
                Categories
              </Link>
            </nav>
          )}
          <div
            className="relative order-last w-full lg:order-none lg:flex-1"
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setFocused(false);
            }}
          >
            <Form
              action="/search"
              onSubmit={() => setFocused(false)}
              role="search"
              className={`flex h-11 items-center gap-3 rounded-lg border px-4 transition focus-within:ring-2 ${transparent ? "border-white/40 bg-black/15 text-white focus-within:border-white focus-within:ring-white/40" : "border-line bg-white focus-within:border-forest focus-within:ring-forest-line"}`}
            >
              <Search
                size={19}
                className={`shrink-0 ${transparent ? "text-white" : "text-muted"}`}
              />
              <input
                type="search"
                enterKeyHint="search"
                name="q"
                aria-label="Search products"
                placeholder="Search cement, paints, pipes and more..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setFocused(false);
                }}
                className={`min-w-0 w-full bg-transparent text-[13px] outline-none ${transparent ? "placeholder:text-white/80" : "placeholder:text-muted"}`}
              />
              <button
                type="submit"
                aria-label="Submit search"
                className={`hidden rounded border px-1.5 py-0.5 text-[11px] sm:block ${transparent ? "border-white/40 text-white" : "border-line text-muted"}`}
              >
                ↵
              </button>
            </Form>
            {focused && suggestions.length > 0 && (
              <div className="search-suggestions absolute top-12 z-50 w-full rounded-lg border border-line bg-white p-2 text-ink shadow-xl">
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={() => {
                      setFocused(false);
                      setQuery("");
                    }}
                    className="block rounded-lg px-3 py-3 text-sm hover:bg-forest-soft"
                  >
                    {p.name}
                  </Link>
                ))}
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setFocused(false)}
                  className="block border-t border-line px-3 py-3 text-xs font-semibold text-forest"
                >
                  See all results →
                </Link>
              </div>
            )}
          </div>
          <div className="ml-auto flex items-center gap-5 lg:ml-0">
            <InfoDialog
              title="Your next project starts here"
              triggerLabel="Account"
              className={`hidden items-center gap-2 text-sm font-medium sm:flex ${transparent ? "text-white" : "text-muted"}`}
              label={
                <>
                  <UserRound size={21} />
                  <span className="hidden xl:inline">Account</span>
                </>
              }
            >
              You’re browsing as a guest. Cart and preferences stay in this
              browser. Sign-in and order history will be available when a
              backend is connected.
            </InfoDialog>
            <Link
              href="/cart"
              aria-label={`Cart, ${count} items`}
              className={`flex items-center gap-2 ${transparent ? "text-white" : path === "/cart" ? "text-forest" : "text-ink"}`}
            >
              <span className="relative">
                <ShoppingCart size={23} />
                <span className="absolute -right-2 -top-2 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-forest px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              </span>
              <span className="hidden text-sm font-semibold sm:inline">
                Cart
              </span>
            </Link>
            <button
              aria-label={mobile ? "Close navigation" : "Open navigation"}
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
              className="icon-button lg:hidden"
            >
              {mobile ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        <div className={path === "/" ? undefined : "border-t border-line"}>
          {path !== "/" && (
            <nav
              aria-label="Main navigation"
              className="page-shell hidden h-12 items-center gap-4 text-[12px] font-medium text-muted lg:flex"
            >
              <details className="group relative shrink-0 self-stretch">
                <summary className="flex h-full cursor-pointer list-none items-center gap-2 whitespace-nowrap border-r border-line pr-5 font-semibold text-ink">
                  <Grid2X2 size={16} className="text-forest" />
                  All categories
                  <ChevronDown size={14} />
                </summary>
                <div className="absolute left-0 top-12 z-50 w-72 rounded-b-xl border border-line bg-white p-2 shadow-xl">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/categories/${c.slug}`}
                      className="block rounded-md px-4 py-2.5 hover:bg-forest-soft hover:text-forest"
                      onClick={(e) =>
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open")
                      }
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </details>
              <div className="hide-scrollbar flex min-w-0 flex-1 items-center gap-6 overflow-x-auto py-3">
                {categories.slice(0, 5).map((c) => (
                  <Link
                    key={c.id}
                    href={`/categories/${c.slug}`}
                    className={`whitespace-nowrap hover:text-forest ${path.includes(c.slug) ? "text-forest" : ""}`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-4 whitespace-nowrap">
                <Link
                  href="/search?featured=1"
                  className="flex items-center gap-1 text-forest"
                >
                  <Zap size={14} />
                  Daily deals
                </Link>
                <InfoDialog
                  title="Build your business with us"
                  className="flex items-center gap-1.5 border-l border-line pl-4"
                  label={
                    <>
                      Become a seller <ArrowUpRight size={14} />
                    </>
                  }
                >
                  Seller onboarding is coming in a future release. This frontend
                  demo does not collect business details or create seller
                  accounts.
                </InfoDialog>
              </div>
            </nav>
          )}
          {mobile && (
            <nav
              aria-label="Mobile navigation"
              className="page-shell max-h-[65vh] overflow-y-auto bg-white py-3 text-ink lg:hidden"
            >
              <Link
                href="/"
                className="flex items-center gap-2 py-3 font-semibold"
                onClick={() => setMobile(false)}
              >
                <Store size={18} />
                Home & store
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  onClick={() => setMobile(false)}
                  className="block border-t border-line py-3 text-sm"
                >
                  {c.name}
                </Link>
              ))}
              <InfoDialog
                title="Guest account"
                className="border-t border-line py-3 text-sm"
                label="Your account"
              >
                You’re shopping as a guest in this frontend demo. Sign-in will
                be added with the backend.
              </InfoDialog>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
