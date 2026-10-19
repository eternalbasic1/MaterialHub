import { Droplets } from "lucide-react";
import { products } from "@/features/catalog/data";
import { Media } from "./Media";
// Original category artwork assembled from individual products, not source-site collages.
const representatives: Record<string, string> = {
  "cement-and-steel": "1",
  "electrical-and-lighting": "5",
  bathware: "7",
  "tiling-and-adhesives": "9",
  "paint-and-finishes": "13",
  "electrical-appliances": "14",
  "pipes-and-fittings": "18",
  "hardware-and-locks": "20",
  "plywood-and-laminates": "22",
  "tools-and-site-supplies": "24",
};
export function CategoryArtwork({
  category,
  priority = false,
}: {
  category: string;
  priority?: boolean;
}) {
  const product = products.find((p) => p.id === representatives[category]);
  if (!product)
    return (
      <div
        className="flex h-full w-full items-center justify-center text-forest"
        aria-hidden="true"
      >
        <Droplets size={40} strokeWidth={1.15} />
      </div>
    );
  return (
    <Media
      src={product.image}
      alt=""
      priority={priority}
      sizes="96px"
      className="p-2 mix-blend-multiply transition duration-300 group-hover:scale-105"
    />
  );
}
