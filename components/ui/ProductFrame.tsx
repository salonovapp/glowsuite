import Image from 'next/image';
import { cn } from '@/lib/utils';

type FrameVariant = 'light' | 'dark' | 'none';

interface ProductFrameProps {
  /** Path to the screenshot (relative to /public or absolute URL) */
  src: string;
  /** Descriptive alt text for accessibility */
  alt: string;
  /**
   * Explicit width in pixels. Required unless using fill mode.
   * Match the natural screenshot width for best quality.
   */
  width?: number;
  /**
   * Explicit height in pixels. Required unless using fill mode.
   */
  height?: number;
  /**
   * Use fill mode (parent must be relative + have a defined height).
   * Use this inside fixed-aspect-ratio containers.
   */
  fill?: boolean;
  /** Frame style. Default: 'light' */
  variant?: FrameVariant;
  /** Show drop shadow. Default: true */
  shadow?: boolean;
  /** Prioritize loading (LCP/above-fold images). Default: false */
  priority?: boolean;
  /** Optional caption below the frame */
  caption?: string;
  /** Extra class names on the outer wrapper */
  className?: string;
  /** Quality setting for Next.js Image (1–100). Default: 90 */
  quality?: number;
  /** Aspect ratio for fill containers, e.g. '16/9', '4/3'. Default: '16/9' */
  aspectRatio?: string;
}

const variantStyles: Record<FrameVariant, string> = {
  light: 'bg-bg-subtle border border-[var(--border)]',
  dark:  'bg-bg-dark border border-white/10',
  none:  '',
};

/**
 * ProductFrame — Reusable product screenshot presentation component.
 *
 * Wraps Next.js Image with consistent styling: rounded corners,
 * optional border frame, optional shadow, and optional caption.
 *
 * Usage:
 *   // Fixed dimensions (preferred for performance)
 *   <ProductFrame
 *     src="/images/screenshot-dashboard.webp"
 *     alt="GlowSuite dashboard showing appointment overview"
 *     width={1280}
 *     height={800}
 *     priority          // above-fold image
 *   />
 *
 *   // Fill mode inside aspect-ratio container
 *   <ProductFrame
 *     src="/images/screenshot-pos.webp"
 *     alt="Point of sale interface"
 *     fill
 *     aspectRatio="4/3"
 *     caption="Modern POS built for speed"
 *   />
 */
export function ProductFrame({
  src,
  alt,
  width,
  height,
  fill = false,
  variant = 'light',
  shadow = true,
  priority = false,
  caption,
  className,
  quality = 90,
  aspectRatio = '16/9',
}: ProductFrameProps) {
  const outerClasses = cn(
    'rounded-[var(--radius-product)] overflow-hidden',
    variantStyles[variant],
    shadow && 'shadow-[var(--shadow-md)]',
    // Pad the frame slightly so the screenshot doesn't touch the edge
    variant !== 'none' && 'p-1.5',
    className
  );

  const imageWrapperClasses = cn(
    'rounded-[var(--radius-lg)] overflow-hidden',
    fill && 'relative',
  );

  return (
    <figure className="flex flex-col gap-3">
      <div className={outerClasses}>
        {fill ? (
          <div
            className={imageWrapperClasses}
            style={{ aspectRatio }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              quality={quality}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 70vw"
            />
          </div>
        ) : (
          <div className={imageWrapperClasses}>
            <Image
              src={src}
              alt={alt}
              width={width ?? 1280}
              height={height ?? 800}
              className="w-full h-auto"
              quality={quality}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 70vw"
            />
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="text-center text-sm text-[var(--text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
