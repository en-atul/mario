import { type ComponentProps, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type RadioProps = ComponentProps<'input'>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        ref={ref}
        className={cn(
          'h-4 w-4 border-slate-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Radio.displayName = 'Radio';

