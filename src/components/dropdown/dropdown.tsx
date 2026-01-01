import { type ComponentProps, type ReactNode, useState, useRef, useEffect } from 'react';
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

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
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
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                disabled={item.disabled}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm transition-colors',
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

