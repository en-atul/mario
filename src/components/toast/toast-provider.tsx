import { type ReactNode, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Toast, type ToastProps } from './toast';

export type ToastItem = ToastProps & {
  id: string;
};

type ToastContextType = {
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: ToastItem = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export const useToast = () => {
  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const event = new CustomEvent('toast', { detail: toast });
    window.dispatchEvent(event);
  }, []);

  return { addToast };
};

if (typeof window !== 'undefined') {
  window.addEventListener('toast', ((e: CustomEvent) => {
    const event = new CustomEvent('toast-add', { detail: e.detail });
    window.dispatchEvent(event);
  }) as EventListener);
}

