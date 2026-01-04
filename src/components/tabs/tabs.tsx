import { type ReactNode, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export type TabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
};

export const Tabs = ({ items, defaultValue, className }: TabsProps) => {
  const firstEnabled = items.find((item) => !item.disabled);
  const [activeTab, setActiveTab] = useState(
    defaultValue || firstEnabled?.value || items[0]?.value
  );
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem = items.find((item) => item.value === activeTab);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const enabledItems = items.filter((item) => !item.disabled);
      const currentIndex = enabledItems.findIndex((item) => item.value === activeTab);

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        const nextIndex =
          currentIndex + direction < 0
            ? enabledItems.length - 1
            : (currentIndex + direction) % enabledItems.length;
        const nextTab = enabledItems[nextIndex];
        setActiveTab(nextTab.value);
        const nextTabIndex = items.findIndex((item) => item.value === nextTab.value);
        tabRefs.current[nextTabIndex]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        const firstTab = enabledItems[0];
        setActiveTab(firstTab.value);
        const firstTabIndex = items.findIndex((item) => item.value === firstTab.value);
        tabRefs.current[firstTabIndex]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        const lastTab = enabledItems[enabledItems.length - 1];
        setActiveTab(lastTab.value);
        const lastTabIndex = items.findIndex((item) => item.value === lastTab.value);
        tabRefs.current[lastTabIndex]?.focus();
      }
    };

    const tabList = tabListRef.current;
    if (tabList) {
      tabList.addEventListener('keydown', handleKeyDown);
      return () => tabList.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeTab, items]);

  return (
    <div className={cn('w-full', className)}>
      <div className="border-b border-slate-200">
        <div ref={tabListRef} className="flex gap-1" role="tablist" aria-orientation="horizontal">
          {items.map((item, index) => (
            <button
              key={item.value}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={activeTab === item.value}
              id={`tab-${item.value}`}
              aria-controls={`tabpanel-${item.value}`}
              tabIndex={activeTab === item.value ? 0 : -1}
              disabled={item.disabled}
              onClick={() => setActiveTab(item.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                'border-b-2',
                activeTab === item.value
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900',
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="mt-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {activeItem?.content}
      </div>
    </div>
  );
};

