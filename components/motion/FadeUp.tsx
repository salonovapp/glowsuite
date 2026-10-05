'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { useInView, usePrefersReducedMotion } from './hooks';
import { cn } from '@/lib/utils';

interface FadeUpProps {
  children: ReactNode;
  /** Delay in ms before animation starts after entering viewport. Default: 0 */
  delay?: number;
  /** Animation duration in ms. Default: 600 */
  duration?: number;
  /** Extra class names */
  className?: string;
  /** Render as a different element. Default: 'div' */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Wraps children in a fade-up entrance animation triggered
 * when the element scrolls into view.
 *
 * Fully respects prefers-reduced-motion.
 * Content is visible on server render (no flash or CLS).
 *
 * Usage:
 *   <FadeUp delay={100}>
 *     <h2>Hello</h2>
 *   </FadeUp>
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 600,
  className,
  as: Tag = 'div',
}: FadeUpProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reduced = usePrefersReducedMotion();

  // When reduced motion is preferred OR element is in view → fully visible.
  // Otherwise (mounted but not yet visible) → hidden + shifted down.
  const style: CSSProperties =
    reduced
      ? {}
      : {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(22px)',
          transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          willChange: inView ? 'auto' : 'opacity, transform',
        };

  return (
    // @ts-expect-error – dynamic tag typing
    <Tag ref={ref} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
