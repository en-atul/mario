import { type ComponentProps, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type SwitchProps = Omit<ComponentProps<'input'>, 'type'>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          ref={ref}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            "peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}
        />
      </label>
    );
  }
);

Switch.displayName = 'Switch';
