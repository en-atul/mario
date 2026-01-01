import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';
import { Label } from '../label';

const meta = {
  title: 'Components/Forms/Input',
  component: Input,
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
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="input">Email</Label>
      <Input id="input" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="error-input" variant="error">
        Email
      </Label>
      <Input
        id="error-input"
        variant="error"
        placeholder="email@example.com"
      />
    </div>
  ),
};

export const Currency: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="currency-input">Amount</Label>
      <Input
        id="currency-input"
        currency
        currencySymbol="$"
        placeholder="0.00"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <Input disabled placeholder="Disabled input" />,
};

