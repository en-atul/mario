import { type ComponentProps, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, X, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const selectVariants = cva(
  'flex w-full min-h-10 rounded-md border border-slate-300 bg-white text-sm ring-offset-white focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-danger-600 focus-within:ring-danger-500',
      },
      size: {
        sm: 'min-h-8 text-xs',
        md: 'min-h-10 text-sm',
        lg: 'min-h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectMultiProps = Omit<ComponentProps<'div'>, 'onChange'> &
  VariantProps<typeof selectVariants> & {
    options: SelectOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
  };

export const SelectMulti = ({
  className,
  variant,
  size,
  options,
  value = [],
  onChange,
  placeholder = 'Select options...',
  ...props
}: SelectMultiProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    if (isOpen) {
      requestAnimationFrame(() => {
        updatePosition();
      });
      
      const handleScroll = () => updatePosition();
      const handleResize = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      let resizeObserver: ResizeObserver | null = null;
      if (containerRef.current && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          updatePosition();
        });
        resizeObserver.observe(containerRef.current);
      }
      
      inputRef.current?.focus();
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }
  }, [isOpen, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest('[data-select-dropdown]')
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOptions = options.filter((opt) => value.includes(opt.value));
  const filteredOptions = options.filter(
    (opt) =>
      !value.includes(opt.value) &&
      (searchTerm === '' || opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = value.filter((v) => v !== optionValue);
    onChange?.(newValue);
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)} {...props}>
      <div
        className={cn(selectVariants({ variant, size }), 'cursor-text')}
        onClick={() => {
          inputRef.current?.focus();
          setIsOpen(true);
        }}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1 px-2 py-1.5">
          {selectedOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-1 bg-slate-100 text-slate-700 rounded-full px-2 py-0.5 text-xs font-medium group"
            >
              <span>{option.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value, e);
                }}
                className="ml-1"
                onMouseDown={(e) => e.preventDefault()}
              >
                <X className="h-3 w-3 group-hover:text-red-500" />
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="flex-1 min-w-[120px] border-0 bg-transparent p-0 outline-none focus:ring-0 placeholder:text-slate-400 text-sm"
            placeholder={selectedOptions.length === 0 ? placeholder : ''}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && searchTerm === '' && selectedOptions.length > 0) {
                handleRemove(selectedOptions[selectedOptions.length - 1].value, e as any);
              }
            }}
          />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          <ChevronDown
            className={cn(
              'h-4 w-4 text-slate-400 transition-transform',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </div>
      </div>

      {isOpen &&
        typeof document !== 'undefined' &&
        position.width > 0 &&
        createPortal(
          <div
            data-select-dropdown
            className="fixed z-[9999] max-h-60 mt-1 overflow-auto rounded-md border border-slate-200 bg-white shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      handleToggle(option.value);
                      setSearchTerm('');
                    }}
                    disabled={option.disabled}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm transition-colors flex items-center justify-between',
                      isSelected
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-slate-50 text-slate-900',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm text-slate-500">
                No options found
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

SelectMulti.displayName = 'SelectMulti';

