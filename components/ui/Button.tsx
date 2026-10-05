import { type JSX } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: React.ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:  'btn btn-primary',
  secondary:'btn btn-secondary',
  ghost:    'btn btn-ghost',
  gradient: 'btn btn-gradient',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

/**
 * GlowSuite Button primitive.
 *
 * Usage:
 *   <Button variant="primary">Book a Demo</Button>
 *   <Button variant="gradient" size="lg">Get Started Free</Button>
 *   <Button variant="ghost" size="sm">Learn More</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps): JSX.Element {
  const classes = [
    variantClass[variant],
    sizeClass[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
