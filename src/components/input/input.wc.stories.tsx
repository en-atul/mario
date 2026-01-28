import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsInput } from './input.wc';
import { defineDsLabel } from '../label/label.wc';

defineDsInput();
defineDsLabel();

type InputArgs = {
  placeholder?: string;
  variant?: 'default' | 'error';
  size?: 'sm' | 'md' | 'lg';
  currency?: boolean;
  currencySymbol?: string;
  disabled?: boolean;
};

const meta = {
  title: 'Primitives (Web)/Forms/Input',
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    size: 'md',
    currency: false,
    currencySymbol: '$',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'error'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    currency: { control: 'boolean' },
    currencySymbol: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => (
    <div className="w-64 space-y-2">
      <ds-label>Email</ds-label>
      <ds-input
        placeholder={args.placeholder}
        variant={args.variant}
        size={args.size}
        currency={args.currency}
        currency-symbol={args.currencySymbol}
        disabled={args.disabled}
      />
    </div>
  ),
} satisfies Meta<InputArgs>;

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {};
