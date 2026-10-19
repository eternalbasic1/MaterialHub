import { CartPage } from "@/components/CartPage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata = {
  title: "Your cart",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cart" },
};
export default function Cart() {
  return (
    <div className="page-shell pb-12">
      <Breadcrumbs items={[{ label: "Your cart" }]} />
      <CartPage />
    </div>
  );
}
