import { type ComponentProps, type ReactNode, useEffect, useRef, useId, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animation, transition } from '../../tokens/motion';
import { trapFocus, saveFocus, restoreFocus } from '../../utils/focus-trap';
import { cn } from '../../utils/cn';

const ModalContext = createContext<{ titleId: string } | null>(null);

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
};

export const Modal = ({
  open,
  onClose,
  children,
  size = 'md',
  className,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalId = useId();
  const titleId = `${modalId}-title`;

  useEffect(() => {
    if (open) {
      previousFocusRef.current = saveFocus();
    } else {
      restoreFocus(previousFocusRef.current);
      previousFocusRef.current = null;
    }
  }, [open]);

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (open && modalRef.current) {
      const cleanup = trapFocus(modalRef.current);
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
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={onClose}
              >
                <motion.div
                  className="fixed inset-0 bg-black/50"
                  initial={animation.overlay.initial}
                  animate={animation.overlay.animate}
                  exit={animation.overlay.exit}
                  transition={transition.overlay}
                />
                <motion.div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  className={cn(
                    'relative z-50 w-full rounded-lg border border-slate-200 bg-white shadow-xl',
                    sizeClasses[size],
                    className
                  )}
                  initial={animation.modal.initial}
                  animate={animation.modal.animate}
                  exit={animation.modal.exit}
                  transition={transition.modal}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ModalContext.Provider value={{ titleId }}>
                    {children}
                  </ModalContext.Provider>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

const ModalHeaderComponent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex items-center justify-between p-6 border-b border-slate-200', className)}
    {...props}
  />
);

const ModalTitleComponent = ({
  className,
  id,
  ...props
}: ComponentProps<'h2'>) => {
  const context = useContext(ModalContext);
  const titleId = id || context?.titleId;
  return (
    <h2
      id={titleId}
      className={cn('text-xl font-semibold', className)}
      {...props}
    />
  );
};

const ModalBodyComponent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('p-6', className)} {...props} />
);

const ModalFooterComponent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex items-center justify-end gap-2 p-6 border-t border-slate-200', className)}
    {...props}
  />
);

Modal.Header = ModalHeaderComponent;
Modal.Title = ModalTitleComponent;
Modal.Body = ModalBodyComponent;
Modal.Footer = ModalFooterComponent;

export const ModalHeader = ModalHeaderComponent;
export const ModalTitle = ModalTitleComponent;
export const ModalBody = ModalBodyComponent;
export const ModalFooter = ModalFooterComponent;

