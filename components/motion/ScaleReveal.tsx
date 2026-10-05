'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { useInView, usePrefersReducedMotion } from './hooks';
import { cn } from '@/lib/utils';

interface ScaleRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** Scale start value. Default: 0.95 */
  from?: number;
}

/**
 * Subtle scale + fade reveal. Ideal for cards, images,
 * and product frames where a soft "pop into existence" suits the design.
 */
export function ScaleReveal({
  children,
  delay = 0,
  duration = 550,
  from = 0.95,
  className,
}: ScaleRevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reduced = usePrefersReducedMotion();

  const style: CSSProperties =
    reduced
      ? {}
      : {
          opacity: inView ? 1 : 0,
          transform: inView ? 'scale(1)' : `scale(${from})`,
          transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          willChange: inView ? 'auto' : 'opacity, transform',
        };

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Staggered container helper
// ---------------------------------------------------------------------------

interface StaggeredGroupProps {
  children: ReactNode[];
  /** Base delay for the first child, in ms. Default: 0 */
  baseDelay?: number;
  /** Additional delay per child, in ms. Default: 80 */
  staggerMs?: number;
  className?: string;
  /** Wrapper tag. Default: 'div' */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Wraps an array of children and applies FadeUp-style stagger delays
 * using inline CSS variables. Children are responsible for consuming
 * `--stagger-delay` if using custom animation, or this component
 * wraps each child in a FadeUp with a computed delay.
 *
 * Usage:
 *   <StaggeredGroup baseDelay={0} staggerMs={100}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </StaggeredGroup>
 */
export function StaggeredGroup({
  children,
  baseDelay = 0,
  staggerMs = 80,
  className,
  as: Tag = 'div',
}: StaggeredGroupProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.06 });
  const reduced = usePrefersReducedMotion();

  return (
    // @ts-expect-error – dynamic tag typing
    <Tag ref={ref} className={cn(className)}>
      {children.map((child, i) => {
        const delay = baseDelay + i * staggerMs;
        const style: CSSProperties = reduced
          ? {}
          : {
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
              willChange: inView ? 'auto' : 'opacity, transform',
            };
        return (
          <div key={i} style={style}>
            {child}
          </div>
        );
      })}
    </Tag>
  );
}
