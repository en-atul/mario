import { type ComponentProps, type ReactNode, useEffect } from 'react';
import { cn } from '../../utils/cn';

export type ToastProps = ComponentProps<'div'> & {
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
};

export const Toast = ({
  variant = 'default',
  duration = 5000,
  onClose,
  title,
  description,
  className,
  ...props
}: ToastProps) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variantClasses = {
    default: 'bg-white border-slate-200',
    success: 'bg-success-50 border-success-200 text-success-900',
    error: 'bg-danger-50 border-danger-200 text-danger-900',
    warning: 'bg-warning-50 border-warning-200 text-warning-900',
  };

  const role = variant === 'error' ? 'alert' : 'status';
  const ariaLive = variant === 'error' ? 'assertive' : 'polite';

  return (
    <div
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="p-4">
        {title && <div className="font-semibold">{title}</div>}
        {description && (
          <div className={cn('text-sm', title && 'mt-1')}>{description}</div>
        )}
      </div>
    </div>
  );
};

