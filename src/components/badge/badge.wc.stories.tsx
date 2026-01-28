import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsBadge } from './badge.wc';

defineDsBadge();

type BadgeArgs = {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

const meta = {
  title: 'Primitives (Web)/Feedback/Badge',
  args: {
    variant: 'default',
    size: 'md',
    label: 'Badge',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
  },
  render: (args) => (
    <ds-badge variant={args.variant} size={args.size}>
      {args.label}
    </ds-badge>
  ),
} satisfies Meta<BadgeArgs>;

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Default: Story = {};
