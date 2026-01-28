import { type ComponentProps, forwardRef, type ElementType } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b border-slate-200 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-xl text-slate-600',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-slate-600',
      blockquote: 'mt-6 border-l-4 border-slate-300 pl-6 italic',
      code: 'relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      pre: 'my-4 overflow-x-auto rounded-lg bg-slate-950 p-4',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

const variantElementMap: Record<string, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  blockquote: 'blockquote',
  code: 'code',
  pre: 'pre',
};

export type TypographyProps = ComponentProps<'p'> &
  VariantProps<typeof typographyVariants> & {
    as?: ElementType;
  };

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', as, ...props }, ref) => {
    const variantKey = variant || 'p';
    const Component = (as || variantElementMap[variantKey] || 'p') as ElementType;
    return (
      <Component
        ref={ref as never}
        className={cn(typographyVariants({ variant: variantKey }), className)}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';
