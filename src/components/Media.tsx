"use client";
import Image from "next/image";
import { useState } from "react";
export function Media({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 50vw, 300px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/images/placeholder.svg" : src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  );
}
