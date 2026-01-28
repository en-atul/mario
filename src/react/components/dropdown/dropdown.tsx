import { type ReactNode, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export type DropdownItem = {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
};

export type DropdownProps = {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
};

export const Dropdown = ({
  trigger,
  items,
  align = 'left',
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        (triggerRef.current?.firstElementChild as HTMLElement)?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstButton = menuRef.current?.querySelector('button:not([disabled])');
        (firstButton as HTMLElement)?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <div key={index} className="my-1 h-px bg-slate-200" />
              );
            }
            return (
              <button
                key={index}
                role="menuitem"
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = e.currentTarget.nextElementSibling as HTMLElement;
                    next?.focus();
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = e.currentTarget.previousElementSibling as HTMLElement;
                    prev?.focus();
                  } else if (e.key === 'Home') {
                    e.preventDefault();
                    const first = menuRef.current?.querySelector('button:not([disabled])') as HTMLElement;
                    first?.focus();
                  } else if (e.key === 'End') {
                    e.preventDefault();
                    const buttons = menuRef.current?.querySelectorAll('button:not([disabled])');
                    const last = buttons?.[buttons.length - 1] as HTMLElement;
                    last?.focus();
                  }
                }}
                disabled={item.disabled}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm transition-colors focus:outline-none focus:bg-slate-100',
                  item.disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-slate-100'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
