# MaterialHub

A complete, responsive construction-materials storefront inspired by the supplied GoMaterial references. Built with **Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Lucide React**. No backend or account is required.

## Run locally

Use Node.js 22 or newer (tested with Node.js 24).

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview, run `npm run build` followed by `npm start`.

## Included

- Home with hero, 11 image-based categories, builder favourites, promotions and brands.
- Category listings with subcategory pills, sorting, price filters, URL state, browser back/forward support, and a mobile filter dialog.
- Product pages with image galleries, selected variant prices, size/color/pack controls, quantity selectors, specifications and a mobile purchase bar.
- Global search with suggestions and a full results page.
- Persistent cart, separate variant lines, quantity adjustments, removal and related products.
- `FREE300`: up to ₹300 off the basic subtotal, capped at that subtotal. Sample GST is calculated proportionally after discount. Currency is calculated in paise.
- Order review and demo confirmation; no payment, address submission, real order or delivery.
- Responsive header/footer, accessible dialogs, loading states, image fallbacks, notifications and 404 pages.
- Pre-rendered Home, 11 category routes and 24 product routes, canonical links, metadata, Product/Breadcrumb JSON-LD, sitemap and robots configuration.

## Source structure

```text
src/
  app/                       Next.js routes, metadata, global layout and styles
    categories/[slug]/       Product listings
    products/[slug]/         Product details
    search/                  Search results
    cart/                    Shopping cart
    checkout/                Demo order review
  components/                Header, Footer, cards, galleries and shopping UI
  features/
    catalog/                 Typed local catalog, filters and formatting
    cart/                    Context provider, persistence and pricing logic
public/
  images/                    Optimized local assets and provenance manifest
  fonts/                     Locally hosted Inter variable font
 tests/                      Unit and HTTP smoke tests
```

## Catalog and images

Edit `src/features/catalog/mockData.json` to change the 24 fixture products and 11 categories. Types live in `src/features/catalog/types.ts`; local catalog helpers live in `src/features/catalog/data.ts`. All prices, stock, tax rates, variant offers and delivery information are demonstrative.

Product photos were downloaded from image URLs exposed by GoMaterial’s public catalog. Its S3 image URLs returned HTTP 403, so the matching JK Cement, UltraTech, steel, white cement, Polycab, HeatX and other reference images were extracted from the user-supplied screenshots. The paint and two waterproofing items use representative category imagery where an individual image was unavailable. Screenshot-derived thumbnails have limited source resolution. No private access or authenticated API is used.

All imagery is stored locally as WebP; the running site does not call GoMaterial, Shopify, Google Fonts or another catalog service. `public/images/sources.json` records the image sources. The Inter font is locally hosted under the SIL Open Font License, included beside it.

## Visual identity

The storefront uses a central forest-green and white theme in `src/app/globals.css`: pure white `#FFFFFF` for the canvas and all surface backgrounds, forest green `#175C46`, dark ink `#202D28`, muted text `#65756D`, and borders `#E1E8E3`. Buttons, links, focus states, variant selection, sidebars and notifications share these tokens. Manufacturer packaging and wordmark colors are retained.

Home uses an architectural materials composition and compact category tiles created from individual product photos. `src/components/CategoryArtwork.tsx` selects representative products; waterproofing uses an original Lucide line illustration. Borrowed category collages are no longer used in the Home design. The footer is light, delivery messaging is understated, product actions share a consistent layout, and Cart shows line subtotals calculated in paise alongside unit prices. Desktop category navigation remains hidden on Home and available on internal pages.

## Branding and SEO

“MaterialHub” is provisional branding. Update the logo/header and `site` configuration in the catalog helper for your business. Configure `NEXT_PUBLIC_SITE_URL` using `.env.example` before building for a real domain. Category and product content is present in the initial HTML; interactive URL filters update after hydration without removing the initial catalog from search-engine HTML.

The demo intentionally uses **noindex** metadata and disallows crawling. Before a real launch, replace demo business/catalog content, review tax and delivery settings, configure the real domain, and update both the layout robots metadata and `src/app/robots.ts`. A browser-local cart is appropriate for this demo; real pricing, inventory, accounts, orders and payments need a backend. Seller/profile/footer dialogs explicitly describe their demo status.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run format:check
```

With the website already running:

```sh
npm run test:smoke
```

The Playwright smoke suite uses HTTP requests and needs no installed browser. Set `TEST_BASE_URL` to check another local port or a deployed preview. It checks every category/product route, catalog images, initial HTML, metadata, structured data, search states, 404s, sitemap and robots. Unit tests cover cart merging, variants, invalid saved data, coupon caps, paise rounding and filtering.

Interactive browser QA also covers adding products, variant selection, quantity changes, refresh persistence, coupons, demo checkout, mobile navigation/filter validation, and layout overflow. See `docs/verification.md` for the final record.
