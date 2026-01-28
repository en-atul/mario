import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsButton } from './button.wc';

defineDsButton();

type ButtonArgs = {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  disabled?: boolean;
};

const meta = {
  title: 'Primitives/Actions/Button',
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Button',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
  render: (args) => (
    <ds-button variant={args.variant} size={args.size} disabled={args.disabled}>
      {args.label}
    </ds-button>
  ),
} satisfies Meta<ButtonArgs>;

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Default: Story = {};
