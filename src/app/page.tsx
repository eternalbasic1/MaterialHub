import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
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
    <div className="page-shell pb-16">
      <section className="my-7 grid overflow-hidden rounded-lg border border-line bg-white lg:my-9 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:py-14">
          <p className="eyebrow text-forest">
            MATERIALS, WITHOUT THE GUESSWORK
          </p>
          <h1 className="mt-3 max-w-xl text-[32px] font-semibold leading-[1.13] tracking-[-1.2px] text-ink sm:text-[52px] sm:tracking-[-1.8px]">
            Every great build
            <br />
            starts <span className="text-forest">right here.</span>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            For the place you’re making your own. Find the right materials,
            compare your options, and keep your project moving.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#categories" className="primary-button">
              Explore materials <ArrowRight size={16} />
            </Link>
            <Link
              href="/search?featured=1"
              className="inline-flex min-h-11 items-center justify-center rounded-md px-1 text-xs font-semibold text-forest sm:border sm:border-line sm:px-5 sm:text-sm sm:hover:bg-canvas"
            >
              Browse essentials
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-line pt-5 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-forest" />
              Trusted brands
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-forest" />
              Clear buying units
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-forest" />
              Transparent prices
            </span>
          </div>
        </div>
        <div
          className="material-scene relative min-h-[220px] overflow-hidden border-t border-line sm:min-h-[380px] lg:border-l lg:border-t-0"
          aria-label="A collection of building materials and tools"
        >
          <div className="absolute left-[9%] top-[9%] h-[71%] w-[40%]">
            <Media
              src={products[0].image}
              alt="JK Cement 50 kg bag"
              priority
              sizes="(max-width: 1024px) 40vw, 260px"
              className="mix-blend-multiply"
            />
          </div>
          <div className="absolute right-[9%] top-[19%] h-[46%] w-[39%]">
            <Media
              src={products[22].image}
              alt="Bosch angle grinder"
              priority
              sizes="(max-width: 1024px) 40vw, 250px"
              className="mix-blend-multiply"
            />
          </div>
          <div className="absolute bottom-[9%] right-[8%] h-[32%] w-[53%]">
            <Media
              src={products[17].image}
              alt="CPVC pipe for plumbing"
              priority
              sizes="(max-width: 1024px) 50vw, 300px"
              className="mix-blend-multiply"
            />
          </div>
          <span className="absolute left-8 top-7 bg-canvas px-2 text-[10px] uppercase tracking-[2px] text-muted">
            The project collection
          </span>
          <span className="absolute bottom-7 left-8 bg-canvas px-2 text-[10px] text-muted">
            Foundation / Fittings / Finishing
          </span>
        </div>
      </section>
      <section id="categories" className="scroll-mt-36 pt-4">
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
          {categories.map((c, i) => (
            <Link
              href={`/categories/${c.slug}`}
              key={c.id}
              className="group flex min-h-28 min-w-0 items-center gap-2 rounded-lg border border-line bg-white p-2.5 transition hover:border-forest-line hover:bg-canvas sm:gap-3 sm:p-3"
            >
              <div className="relative h-[72px] w-16 shrink-0 rounded-md bg-canvas sm:h-20 sm:w-20">
                <CategoryArtwork category={c.slug} priority={i < 4} />
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
              <p className="mt-2 text-xs text-forest">Explore all materials</p>
            </div>
            <ArrowUpRight size={23} className="shrink-0 text-forest" />
          </Link>
        </div>
      </section>
      <section className="pt-12">
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
            <div className="eyebrow">FAMILIAR NAMES. DEPENDABLE MATERIALS.</div>
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
  );
}
