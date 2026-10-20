import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ChevronRight,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { categories, products } from "@/features/catalog/data";
import { Media } from "@/components/Media";
import { ProductCard } from "@/components/ProductCard";
import { CategoryArtwork } from "@/components/CategoryArtwork";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <div className="homepage pb-16">
      <section className="home-hero" aria-labelledby="home-title">
        <Image
          src="/images/architectural-home.webp"
          alt="A contemporary courtyard home built with natural stone, concrete and timber, framed by trees at dusk"
          fill
          preload
          sizes="100vw"
          className="home-hero-image"
        />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="page-shell home-hero-content">
          <p className="home-hero-eyebrow">A foundation for what comes next</p>
          <h1 id="home-title" className="home-hero-title">
            Every great build
            <br />
            starts <em>right here.</em>
          </h1>
          <p className="home-hero-description">
            From the first foundation to the final detail. Find the materials
            that bring your vision to life.
          </p>
          <div className="home-hero-actions">
            <Link href="/search" className="home-shop-button">
              Shop materials <ArrowUpRight size={18} />
            </Link>
            <Link href="#categories" className="home-explore-button">
              Explore categories <ArrowDown size={16} />
            </Link>
          </div>
        </div>
        <div className="page-shell home-hero-caption" aria-hidden="true">
          <span>Good spaces begin with good materials.</span>
          <span>Made for the way you build.</span>
        </div>
      </section>
      <div className="page-shell">
        <section
          id="categories"
          className="-scroll-mt-14 lg:-scroll-mt-20 pt-12 sm:pt-16"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">START WITH WHAT YOU NEED</div>
              <h2>Shop by category</h2>
            </div>
            <Link href="/search" className="text-link">
              View all <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {categories.map((c) => (
              <Link
                href={`/categories/${c.slug}`}
                key={c.id}
                className="group flex min-h-28 min-w-0 items-center gap-2 rounded-lg border border-line bg-white p-2.5 transition hover:border-forest-line hover:bg-canvas sm:gap-3 sm:p-3"
              >
                <div className="relative h-[72px] w-16 shrink-0 rounded-md bg-canvas sm:h-20 sm:w-20">
                  <CategoryArtwork category={c.slug} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold leading-5 text-ink sm:text-[13px]">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted">
                    {products.filter((p) => p.category === c.slug).length}{" "}
                    products
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className="hidden shrink-0 text-forest sm:block"
                />
              </Link>
            ))}
            <Link
              href="/search"
              className="group flex min-h-28 items-center justify-between gap-3 rounded-lg border border-forest-line bg-forest-soft p-5"
            >
              <div>
                <p className="text-sm font-semibold text-forest">
                  Find your next essential
                </p>
                <p className="mt-2 text-xs text-forest">
                  Explore all materials
                </p>
              </div>
              <ArrowUpRight size={23} className="shrink-0 text-forest" />
            </Link>
          </div>
        </section>
        <section
          id="essentials"
          className="-scroll-mt-14 lg:-scroll-mt-20 pt-12"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">PRACTICAL PICKS, EVERY DAY</div>
              <h2>Essentials for your next project</h2>
            </div>
            <Link href="/search?featured=1" className="text-link">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((p) => p.featured)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {[
            {
              slug: "paint-and-finishes",
              eyebrow: "THE FINISHING TOUCH",
              title: "Make room for a fresh start.",
              text: "Paints, primers and finishes",
              image: products[12].image,
              alt: "Asian Paints wall primer",
            },
            {
              slug: "tools-and-site-supplies",
              eyebrow: "TOOLS THAT GO TO WORK",
              title: "A little help for the hands-on.",
              text: "Tools and site supplies",
              image: products[23].image,
              alt: "Bosch hand tool kit",
            },
          ].map((p) => (
            <Link
              href={`/categories/${p.slug}`}
              key={p.slug}
              className="group relative flex min-h-52 items-center overflow-hidden rounded-lg border border-line bg-canvas p-6 sm:p-8"
            >
              <div className="relative z-10 w-[60%]">
                <p className="eyebrow">{p.eyebrow}</p>
                <h2 className="max-w-60 text-2xl font-semibold leading-tight tracking-tight text-ink">
                  {p.title}
                </h2>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-forest">
                  {p.text}
                  <ArrowRight size={15} />
                </span>
              </div>
              <div className="absolute inset-y-3 right-3 w-[35%]">
                <Media
                  src={p.image}
                  alt={p.alt}
                  sizes="200px"
                  className="p-2 mix-blend-multiply transition group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </section>
        <section className="pt-12">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                FAMILIAR NAMES. DEPENDABLE MATERIALS.
              </div>
              <h2>Brands in your toolkit</h2>
            </div>
            <ShieldCheck size={23} className="text-forest" />
          </div>
          <div className="flex flex-wrap items-center justify-around gap-x-7 gap-y-6 border-y border-line px-5 py-8">
            {[
              "UltraTech",
              "JK cement",
              "Polycab",
              "Dr. Fixit",
              "Hettich",
              "BOSCH",
            ].map((brand, i) => (
              <span
                key={brand}
                className={`text-xl font-extrabold tracking-tight ${["text-[#252525] italic", "text-orange-600", "text-red-600", "text-blue-800", "text-ink", "text-red-700"][i]}`}
              >
                {brand}
              </span>
            ))}
          </div>
        </section>
        <div className="mt-10 flex flex-wrap justify-between gap-4 text-xs text-muted">
          <span className="flex items-center gap-2">
            <PackageCheck size={16} className="text-forest" />
            Materials for projects of every size.
          </span>
          <span className="flex items-center gap-2">
            <Truck size={16} className="text-forest" />
            Demo delivery area: Gurugram
          </span>
        </div>
      </div>
    </div>
  );
}
