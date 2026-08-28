import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Set for above-the-fold (LCP) images so they are not lazily loaded. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Image wrapper with sensible performance defaults: intrinsic dimensions to
 * avoid layout shift, lazy loading and async decoding for everything below
 * the fold, and eager/high-priority loading for the hero image.
 */
export function AppImage({ src, alt, width, height, className, priority, sizes }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "low"}
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}
