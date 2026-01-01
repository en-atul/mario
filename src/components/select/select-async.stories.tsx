import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SelectAsync } from './select-async';
import { Label } from '../label';
import type { LoadOptionsResult } from './select-async';

const meta = {
  title: 'Components/Forms/Select/SelectAsync',
  component: SelectAsync,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isMulti: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SelectAsync>;

export default meta;
type Story = StoryObj<typeof SelectAsync>;

const mockLoadOptions = async (
  searchTerm: string,
  page: number
): Promise<LoadOptionsResult> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allItems = Array.from({ length: 1000 }, (_, i) => ({
    value: `option-${i + 1}`,
    label: `Option ${i + 1}${searchTerm ? ` (${searchTerm})` : ''}`,
    disabled: false,
  }));

  const filtered = searchTerm
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allItems;

  const pageSize = 20;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filtered.slice(start, end);

  return {
    options: paginated,
    hasMore: end < filtered.length,
  };
};

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-64 space-y-2">
        <Label>Select an option</Label>
        <SelectAsync
          loadOptions={mockLoadOptions}
          value={value}
          onChange={setValue}
          placeholder="Search and select..."
        />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-64 space-y-2">
        <Label>Select multiple options</Label>
        <SelectAsync
          loadOptions={mockLoadOptions}
          value={value}
          onChange={setValue}
          isMulti
          placeholder="Search and select..."
        />
      </div>
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['option-1', 'option-5']);
    return (
      <div className="w-64 space-y-2">
        <Label>Select multiple options</Label>
        <SelectAsync
          loadOptions={mockLoadOptions}
          value={value}
          onChange={setValue}
          isMulti
          placeholder="Search and select..."
        />
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const searchLoadOptions = async (
      searchTerm: string,
      page: number
    ): Promise<LoadOptionsResult> => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
      const filtered = searchTerm
        ? items.filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : items;

      const pageSize = 3;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginated = filtered.slice(start, end).map((item, i) => ({
        value: `fruit-${start + i + 1}`,
        label: item,
      }));

      return {
        options: paginated,
        hasMore: end < filtered.length,
      };
    };

    return (
      <div className="w-64 space-y-2">
        <Label>Search fruits</Label>
        <SelectAsync
          loadOptions={searchLoadOptions}
          value={value}
          onChange={setValue}
          isMulti
          placeholder="Type to search..."
        />
      </div>
    );
  },
};

