"use client";

import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";

interface ImageWithFallbackType {
  alt?: string;
  src?: string;
  fallback?: ReactNode;
}

export default function ImageWithFallback({
  alt,
  src,
  fallback,
}: ImageWithFallbackType) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return error ? (
    fallback
  ) : (
    <Image
      alt={alt ?? ""}
      src={src ?? ""}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setError(true);
        }
      }}
      onError={() => setError(true)}
    />
  );
}
