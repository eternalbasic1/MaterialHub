import { CheckoutPage } from "@/components/CheckoutPage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata = {
  title: "Demo checkout",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};
export default function Checkout() {
  return (
    <div className="page-shell pb-14">
      <Breadcrumbs
        items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />
      <CheckoutPage />
    </div>
  );
}
