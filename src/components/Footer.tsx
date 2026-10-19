import Link from "next/link";
import {
  BadgeCheck,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Truck,
} from "lucide-react";
import { categories } from "@/features/catalog/data";
import { Logo } from "./Header";
import { InfoDialog } from "./InfoDialog";
export function TrustStrip() {
  return (
    <div className="border-y border-line bg-white">
      <div className="page-shell grid grid-cols-2 gap-x-5 gap-y-6 py-7 md:grid-cols-4">
        {[
          {
            icon: Truck,
            title: "Delivery to your site",
            text: "Plan around your project",
          },
          {
            icon: BadgeCheck,
            title: "Recognised brands",
            text: "A familiar range of materials",
          },
          {
            icon: ShieldCheck,
            title: "Clear price breakdowns",
            text: "Units, discounts and sample GST",
          },
          {
            icon: PackageCheck,
            title: "Pick up where you left off",
            text: "Your cart stays in this browser",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon
              size={22}
              strokeWidth={1.4}
              className="mt-0.5 shrink-0 text-forest"
            />
            <div>
              <p className="text-xs font-semibold leading-5 text-ink">
                {title}
              </p>
              <p className="mt-1 text-[11px] leading-5 text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Footer() {
  return (
    <>
      <TrustStrip />
      <footer className="bg-canvas pb-24 pt-11 text-muted sm:pb-0">
        <div className="page-shell">
          <div className="grid gap-9 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
            <div>
              <Logo />
              <p className="mt-5 max-w-64 text-xs leading-7">
                Construction essentials and finishing touches, brought together
                for your next project.
              </p>
            </div>
            <div>
              <h3 className="mb-5 text-sm font-semibold text-ink">
                Explore materials
              </h3>
              <div className="space-y-3 text-xs">
                {categories.slice(0, 5).map((c) => (
                  <Link
                    className="block hover:text-forest"
                    key={c.id}
                    href={`/categories/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-5 text-sm font-semibold text-ink">
                Information
              </h3>
              <div className="flex flex-col items-start gap-3 text-xs">
                {[
                  "About MaterialHub",
                  "Delivery information",
                  "Returns & refunds",
                  "Privacy policy",
                ].map((title) => (
                  <InfoDialog
                    key={title}
                    title={title}
                    className="text-left hover:text-forest"
                    label={title}
                  >
                    MaterialHub is a frontend demonstration inspired by a
                    construction materials marketplace. Prices, taxes, delivery
                    and offers are illustrative. No personal information is sent
                    to a server and no real orders or payments are processed.
                    Your cart is saved only in your browser.
                  </InfoDialog>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-5 text-sm font-semibold text-ink">
                Always within reach
              </h3>
              <p className="text-xs leading-7">
                Shop on your phone or desktop.
                <br />A dedicated mobile app is planned.
              </p>
              <div className="mt-4 inline-flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3">
                <Smartphone
                  size={25}
                  strokeWidth={1.4}
                  className="text-forest"
                />
                <div>
                  <span className="block text-[11px] text-muted">
                    iOS & Android
                  </span>
                  <span className="text-xs font-medium text-ink">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-line py-5 text-[11px] leading-5 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} MaterialHub.</p>
            <p>Demo storefront · Sample prices & GST · Gurugram</p>
          </div>
        </div>
      </footer>
    </>
  );
}
