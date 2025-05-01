"use client";

import Image, { ImageProps } from "next/image";
import { resolvePath } from "@/utils/path-utils";

interface NextImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

/**
 * A wrapper around Next.js Image component that handles paths correctly
 * when deploying to GitHub Pages or other platforms with a base path
 */
export default function NextImage({ src, ...props }: NextImageProps) {
  const resolvedSrc = resolvePath(src);
  
  return (
    <Image
      src={resolvedSrc}
      unoptimized={true} // Disable image optimization for static export
      {...props}
    />
  );
} 