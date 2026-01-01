import { type ComponentProps, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const linkVariants = cva(
  'underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-600 hover:text-primary-700',
        muted: 'text-slate-600 hover:text-slate-900',
        destructive: 'text-danger-600 hover:text-danger-700',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type LinkProps = ComponentProps<'a'> & VariantProps<typeof linkVariants>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';

