import { type ComponentProps, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, X, Check, Loader2 } from 'lucide-react';
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

export type LoadOptionsResult = {
  options: SelectOption[];
  hasMore: boolean;
};

export type SelectAsyncProps = Omit<ComponentProps<'div'>, 'onChange'> &
  VariantProps<typeof selectVariants> & {
    loadOptions: (searchTerm: string, page: number) => Promise<LoadOptionsResult>;
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    isMulti?: boolean;
  };

export const SelectAsync = ({
  className,
  variant,
  size,
  loadOptions,
  value = [],
  onChange,
  placeholder = 'Select options...',
  isMulti = false,
  ...props
}: SelectAsyncProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>(null);

  const fetchOptions = useCallback(
    async (search: string, pageNum: number, append = false) => {
      setIsLoading(true);
      try {
        const result = await loadOptions(search, pageNum);
        if (append) {
          setOptions((prev) => [...prev, ...result.options]);
        } else {
          setOptions(result.options);
        }
        setHasMore(result.hasMore);
      } catch (error) {
        console.error('Error loading options:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [loadOptions]
  );

  useEffect(() => {
    if (isOpen) {
      setPage(1);
      fetchOptions(searchTerm, 1, false);
    }
  }, [isOpen, searchTerm, fetchOptions]);

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
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading && isOpen) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchOptions(searchTerm, nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, isOpen, page, searchTerm, fetchOptions]);

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

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (isOpen) {
        setPage(1);
        fetchOptions(searchTerm, 1, false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, isOpen, fetchOptions]);

  const selectedOptions = options.filter((opt) => value.includes(opt.value));
  const filteredOptions = isMulti
    ? options.filter((opt) => !value.includes(opt.value))
    : options;

  const handleToggle = (optionValue: string) => {
    if (isMulti) {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    } else {
      onChange?.([optionValue]);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = value.filter((v) => v !== optionValue);
    onChange?.(newValue);
  };

  const displayValue = isMulti
    ? undefined
    : options.find((opt) => value.includes(opt.value));

  return (
    <div ref={containerRef} className={cn('relative w-full', className)} {...props}>
      <div
        className={cn(selectVariants({ variant, size }), 'cursor-text')}
        onClick={() => {
          inputRef.current?.focus();
          setIsOpen(true);
        }}
      >
        {isMulti ? (
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
        ) : (
          <div className="flex flex-1 items-center px-2 py-1.5">
            <input
              ref={inputRef}
              type="text"
              value={isOpen ? searchTerm : displayValue?.label || ''}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              className="flex-1 min-w-[120px] border-0 bg-transparent p-0 outline-none focus:ring-0 placeholder:text-slate-400 text-sm"
              placeholder={placeholder}
            />
          </div>
        )}
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
            className="fixed z-[9999] max-h-60 overflow-auto rounded-md border border-slate-200 bg-white shadow-lg mt-1"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
          >
            {filteredOptions.length > 0 ? (
              <>
                {filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        handleToggle(option.value);
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
                })}
                {hasMore && (
                  <div ref={loadMoreRef} className="px-3 py-2 flex items-center justify-center">
                    {isLoading && (
                      <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                    )}
                  </div>
                )}
              </>
            ) : isLoading ? (
              <div className="px-3 py-8 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              </div>
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

SelectAsync.displayName = 'SelectAsync';

