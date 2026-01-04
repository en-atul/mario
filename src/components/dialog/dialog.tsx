import { type ComponentProps, type ReactNode, useEffect, useRef, useId, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animation, transition } from '../../tokens/motion';
import { trapFocus, saveFocus, restoreFocus } from '../../utils/focus-trap';
import { cn } from '../../utils/cn';

const DialogContext = createContext<{ titleId: string; descriptionId: string } | null>(null);

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;

  // Save focus when dialog opens
  useEffect(() => {
    if (open) {
      previousFocusRef.current = saveFocus();
    } else {
      // Restore focus when dialog closes
      restoreFocus(previousFocusRef.current);
      previousFocusRef.current = null;
    }
  }, [open]);

  // Body scroll lock
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

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // Focus trap
  useEffect(() => {
    if (open && dialogRef.current) {
      const cleanup = trapFocus(dialogRef.current);
      return cleanup;
    }
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
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  aria-describedby={descriptionId}
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
                  <DialogContext.Provider value={{ titleId, descriptionId }}>
                    {children}
                  </DialogContext.Provider>
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
  id,
  ...props
}: ComponentProps<'h2'>) => {
  const context = useContext(DialogContext);
  const titleId = id || context?.titleId;
  return (
    <h2
      id={titleId}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
};

export const DialogDescription = ({
  className,
  id,
  ...props
}: ComponentProps<'p'>) => {
  const context = useContext(DialogContext);
  const descriptionId = id || context?.descriptionId;
  return (
    <p
      id={descriptionId}
      className={cn('text-sm text-slate-600', className)}
      {...props}
    />
  );
};

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

