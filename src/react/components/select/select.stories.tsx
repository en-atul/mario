import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select } from './select';
import { SelectMulti } from './select-multi';
import { Label } from '../label';

const meta = {
  title: 'React/Components/Forms/Select',
  component: Select,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <option value="">Choose an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="select">Choose an option</Label>
      <Select id="select">
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="error-select" variant="error">
        Choose an option
      </Label>
      <Select id="error-select" variant="error">
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <Select size="sm">
        <option value="">Small</option>
        <option value="1">Option 1</option>
      </Select>
      <Select size="md">
        <option value="">Medium</option>
        <option value="1">Option 1</option>
      </Select>
      <Select size="lg">
        <option value="">Large</option>
        <option value="1">Option 1</option>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <option value="">Disabled select</option>
      <option value="1">Option 1</option>
    </Select>
  ),
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-64 space-y-2">
        <Label>Select multiple options</Label>
        <SelectMulti
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
            { value: 'option4', label: 'Option 4' },
            { value: 'option5', label: 'Option 5' },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const MultipleWithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['option1', 'option3']);
    return (
      <div className="w-64 space-y-2">
        <Label>Select multiple options</Label>
        <SelectMulti
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
            { value: 'option4', label: 'Option 4' },
            { value: 'option5', label: 'Option 5' },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const MultipleWithSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-64 space-y-2">
        <Label>Search and select</Label>
        <SelectMulti
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
            { value: 'date', label: 'Date' },
            { value: 'elderberry', label: 'Elderberry' },
            { value: 'fig', label: 'Fig' },
            { value: 'grape', label: 'Grape' },
          ]}
          value={value}
          onChange={setValue}
          placeholder="Type to search..."
        />
      </div>
    );
  },
};
