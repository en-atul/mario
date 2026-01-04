import { type ComponentProps, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animation, transition } from '../../tokens/motion';
import { cn } from '../../utils/cn';

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
};

export const Dialog = ({
  open,
  onOpenChange,
  children,
  className,
}: DialogProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={() => onOpenChange(false)}
              >
                <motion.div
                  className="fixed inset-0 bg-black/50"
                  initial={animation.overlay.initial}
                  animate={animation.overlay.animate}
                  exit={animation.overlay.exit}
                  transition={transition.overlay}
                />
                <motion.div
                  className={cn(
                    'relative z-50 w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-lg',
                    className
                  )}
                  initial={animation.modal.initial}
                  animate={animation.modal.animate}
                  exit={animation.modal.exit}
                  transition={transition.modal}
                  onClick={(e) => e.stopPropagation()}
                >
                  {children}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export const DialogHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}: ComponentProps<'h2'>) => (
  <h2
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: ComponentProps<'p'>) => (
  <p className={cn('text-sm text-slate-600', className)} {...props} />
);

export const DialogContent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export const DialogFooter = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0', className)}
    {...props}
  />
);

