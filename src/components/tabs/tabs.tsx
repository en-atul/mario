import { type ComponentProps, type ReactNode, useState } from 'react';
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

  const activeItem = items.find((item) => item.value === activeTab);

  return (
    <div className={cn('w-full', className)}>
      <div className="border-b border-slate-200">
        <div className="flex gap-1" role="tablist">
          {items.map((item) => (
            <button
              key={item.value}
              role="tab"
              aria-selected={activeTab === item.value}
              aria-controls={`tabpanel-${item.value}`}
              disabled={item.disabled}
              onClick={() => setActiveTab(item.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
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
        className="mt-4"
      >
        {activeItem?.content}
      </div>
    </div>
  );
};

