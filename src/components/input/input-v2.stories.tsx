import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineInputV2 } from './input-v2';
import { Label } from '../label';

defineInputV2();

type InputV2StoryArgs = {
  value?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error';
  currency?: boolean;
  currencySymbol?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
};

const meta = {
  title: 'Components/Forms/Input V2 (Web Component)',
  args: {
    placeholder: 'Enter text...',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    currency: {
      control: 'boolean',
    },
    currencySymbol: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<InputV2StoryArgs>;

export default meta;
type Story = StoryObj<InputV2StoryArgs>;

export const Default: Story = {
  render: (args) => (
    <mario-input-v2
      placeholder={args.placeholder}
      value={args.value}
      type={args.type}
      name={args.name}
      id={args.id}
      size={args.size}
      variant={args.variant}
      currency={args.currency}
      currency-symbol={args.currencySymbol}
      disabled={args.disabled}
      readonly={args.readOnly}
      required={args.required}
    />
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="input-v2">Email</Label>
      <mario-input-v2 id="input-v2" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="error-input-v2" variant="error">
        Email
      </Label>
      <mario-input-v2
        id="error-input-v2"
        variant="error"
        placeholder="email@example.com"
      />
    </div>
  ),
};

export const Currency: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="currency-input-v2">Amount</Label>
      <mario-input-v2
        id="currency-input-v2"
        currency
        currency-symbol="$"
        placeholder="0.00"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <mario-input-v2 size="sm" placeholder="Small input" />
      <mario-input-v2 size="md" placeholder="Medium input" />
      <mario-input-v2 size="lg" placeholder="Large input" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <mario-input-v2 disabled placeholder="Disabled input" />,
};
