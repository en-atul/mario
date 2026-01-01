import { type ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const separatorVariants = cva('shrink-0 bg-slate-200', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type SeparatorProps = ComponentProps<'div'> &
  VariantProps<typeof separatorVariants> & {
    decorative?: boolean;
  };

export const Separator = ({
  className,
  orientation,
  decorative = true,
  ...props
}: SeparatorProps) => {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
};

