import { type JSX } from 'react';

type ContainerWidth = 'standard' | 'wide' | 'narrow';

interface ContainerProps {
  width?: ContainerWidth;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

const widthClass: Record<ContainerWidth, string> = {
  standard: 'container-standard',
  wide:     'container-wide',
  narrow:   'container-narrow',
};

/**
 * GlowSuite Container primitive.
 * Controls max-width and responsive horizontal padding.
 *
 * - standard (1120px): Most page sections
 * - wide     (1320px): Product screenshots, media-rich areas
 * - narrow   (720px):  Article, form, centered copy blocks
 *
 * Usage:
 *   <Container>...</Container>
 *   <Container width="wide">...</Container>
 *   <Container width="narrow" as="article">...</Container>
 */
export function Container({
  width = 'standard',
  as: Tag = 'div',
  className = '',
  children,
}: ContainerProps): JSX.Element {
  const classes = [widthClass[width], className].filter(Boolean).join(' ');
  return <Tag className={classes}>{children}</Tag>;
}
