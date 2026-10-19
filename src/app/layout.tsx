import localFont from "next/font/local";
import type { Metadata } from "next";
import { CartProvider } from "@/features/cart/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/features/catalog/data";
import "./globals.css";
import { CartDock } from "@/components/CartDock";
const inter = localFont({
  src: "../../public/fonts/inter-variable.woff2",
  display: "swap",
  variable: "--font-inter",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MaterialHub — Everything for your next build",
    template: "%s | MaterialHub",
  },
  description:
    "Shop quality cement, steel, electricals, plumbing, paints and construction essentials. Trusted brands, transparent prices, delivered to your site.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "MaterialHub — Build better. Build together.",
    description: "Your next great build starts here.",
    siteName: "MaterialHub",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/warehouse.webp",
        width: 1000,
        height: 1000,
        alt: "Construction materials warehouse",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body className={inter.variable}>
        <a
          href="#main"
          className="sr-only z-[100] rounded bg-forest px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main" className="min-h-[55vh]">
            {children}
          </main>
          <Footer />
          <CartDock />
        </CartProvider>
      </body>
    </html>
  );
}
