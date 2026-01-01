import { type ComponentProps, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const selectVariants = cva(
  'flex w-full rounded-md border border-slate-300 bg-white px-2 py-2 pr-10 text-sm ring-offset-white appearance-none [-webkit-appearance:none] [-moz-appearance:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-danger-600 focus-visible:ring-danger-500',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type SelectProps = ComponentProps<'select'> & VariantProps<typeof selectVariants>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, multiple, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          multiple={multiple}
          className={cn(
            selectVariants({ variant, size }),
            multiple && 'pr-3',
            className
          )}
          {...props}
        />
        {!multiple && (
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

