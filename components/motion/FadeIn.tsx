'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { useInView, usePrefersReducedMotion } from './hooks';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Simple opacity-only fade entrance (no vertical shift).
 * Ideal for images and decorative elements.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 500,
  className,
  as: Tag = 'div',
}: FadeInProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const reduced = usePrefersReducedMotion();

  const style: CSSProperties =
    reduced
      ? {}
      : {
          opacity: inView ? 1 : 0,
          transition: `opacity ${duration}ms ease ${delay}ms`,
          willChange: inView ? 'auto' : 'opacity',
        };

  return (
    // @ts-expect-error – dynamic tag typing
    <Tag ref={ref} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
