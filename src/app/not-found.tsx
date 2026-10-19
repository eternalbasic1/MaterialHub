import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
      <PackageSearch size={60} className="text-forest" />
      <p className="mt-6 text-xs font-bold tracking-[3px] text-forest">
        404 · OFF THE BLUEPRINT
      </p>
      <h1 className="page-title mt-4">This page hasn’t been built.</h1>
      <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
        The material or page you’re looking for isn’t here. Let’s get you back
        to the right foundation.
      </p>
      <Link href="/" className="primary-button mt-7 gap-2">
        Back to the store <ArrowRight size={15} />
      </Link>
    </div>
  );
}
