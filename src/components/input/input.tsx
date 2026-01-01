import { type ComponentProps, forwardRef, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  'flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

export type InputProps = ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    currency?: boolean;
    currencySymbol?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, currency, currencySymbol = '$', ...props }, ref) => {
    const formatCurrency = useCallback(
      (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, '');
        if (!numericValue) return '';
        const number = parseFloat(numericValue);
        if (isNaN(number)) return '';
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(number);
      },
      []
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currency && props.onChange) {
          const formatted = formatCurrency(e.target.value);
          const syntheticEvent = {
            ...e,
            target: { ...e.target, value: formatted },
          };
          props.onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
        } else if (props.onChange) {
          props.onChange(e);
        }
      },
      [currency, formatCurrency, props]
    );

    return (
      <div className="relative">
        {currency && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {currencySymbol}
          </span>
        )}
        <input
          type={currency ? 'text' : props.type || 'text'}
          ref={ref}
          className={cn(
            inputVariants({ variant, size }),
            currency && 'pl-7',
            className
          )}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

