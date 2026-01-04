import { type ComponentProps, useState, useRef, useEffect, useId } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listboxId = useId();

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

  const handleRemove = (optionValue: string, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const newValue = value.filter((v) => v !== optionValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm('');
        inputRef.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = focusedIndex < filteredOptions.length - 1 ? focusedIndex + 1 : 0;
        setFocusedIndex(nextIndex);
        optionRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : filteredOptions.length - 1;
        setFocusedIndex(prevIndex);
        optionRefs.current[prevIndex]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setFocusedIndex(0);
        optionRefs.current[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        const lastIndex = filteredOptions.length - 1;
        setFocusedIndex(lastIndex);
        optionRefs.current[lastIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions.length]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredOptions.length, searchTerm]);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)} {...props}>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={placeholder}
        className={cn(selectVariants({ variant, size }), 'cursor-text')}
        onClick={() => {
          inputRef.current?.focus();
          setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
            inputRef.current?.focus();
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
            setTimeout(() => {
              optionRefs.current[0]?.focus();
              setFocusedIndex(0);
            }, 0);
          }
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
            aria-autocomplete="list"
            aria-controls={isOpen ? listboxId : undefined}
            aria-activedescendant={
              isOpen && focusedIndex >= 0
                ? `${listboxId}-option-${focusedIndex}`
                : undefined
            }
            className="flex-1 min-w-[120px] border-0 bg-transparent p-0 outline-none focus:ring-0 placeholder:text-slate-400 text-sm"
            placeholder={selectedOptions.length === 0 ? placeholder : ''}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && searchTerm === '' && selectedOptions.length > 0) {
                handleRemove(selectedOptions[selectedOptions.length - 1].value, e);
              } else if (e.key === 'ArrowDown' && !isOpen) {
                e.preventDefault();
                setIsOpen(true);
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
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-label="Options"
            data-select-dropdown
            className="fixed z-[9999] max-h-60 mt-1 overflow-auto rounded-md border border-slate-200 bg-white shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = value.includes(option.value);
                return (
                  <button
                    key={option.value}
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      handleToggle(option.value);
                      setSearchTerm('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle(option.value);
                        setSearchTerm('');
                      }
                    }}
                    disabled={option.disabled}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm transition-colors flex items-center justify-between focus:outline-none focus:bg-slate-100',
                      isSelected
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-slate-50 text-slate-900',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary-600 flex-shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })
            ) : (
              <div role="status" className="px-3 py-2 text-sm text-slate-500">
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

