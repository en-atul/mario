import { type ComponentProps, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

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
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className={cn(
                    'relative z-50 w-full rounded-lg border border-slate-200 bg-white shadow-xl',
                    sizeClasses[size],
                    className
                  )}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
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

export const ModalHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex items-center justify-between p-6 border-b border-slate-200', className)}
    {...props}
  />
);

export const ModalTitle = ({
  className,
  ...props
}: ComponentProps<'h2'>) => (
  <h2
    className={cn('text-xl font-semibold', className)}
    {...props}
  />
);

export const ModalBody = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('p-6', className)} {...props} />
);

export const ModalFooter = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex items-center justify-end gap-2 p-6 border-t border-slate-200', className)}
    {...props}
  />
);

