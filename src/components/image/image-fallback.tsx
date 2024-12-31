"use client";

import Image from "next/image";
import { useState, useEffect, ReactNode, CSSProperties } from "react";

interface ImageWithFallbackType {
  alt?: string;
  src?: string;
  size?: number;
  style?: CSSProperties;
  fallback?: ReactNode;
}

export default function ImageWithFallback({
  alt,
  src,
  size,
  style,
  fallback,
}: ImageWithFallbackType) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setError(false);
    }
  }, [src]);

  return error ? (
    fallback
  ) : (
    <Image
      alt={alt ?? ""}
      src={src ?? ""}
      width={size ?? 100}
      height={size ?? 100}
      style={style}
      onLoad={(result) => {
        if (result.currentTarget.naturalWidth === 0) {
          // Broken image
          if (!error) {
            setError(true);
          }
        }
      }}
      onError={() => {
        if (!error) {
          setError(true);
        }
      }}
    />
  );
}
