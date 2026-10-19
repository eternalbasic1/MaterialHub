import Link from "next/link";
import { ChevronRight } from "lucide-react";
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 py-6 text-xs leading-5 text-muted"
    >
      <Link href="/" className="hover:text-forest">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="inline-flex min-w-0 items-center gap-2">
          <ChevronRight size={11} className="shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-forest">
              {item.label}
            </Link>
          ) : (
            <span className="line-clamp-1 text-muted" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
