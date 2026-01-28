import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsToast } from './toast.wc';

defineDsToast();

type ToastArgs = {
  variant?: 'default' | 'success' | 'error' | 'warning';
  title?: string;
  description?: string;
  duration?: number;
};

const meta = {
  title: 'Primitives (Web)/Feedback/Toast',
  args: {
    variant: 'default',
    title: 'Notification',
    description: 'This is a default toast message.',
    duration: 5000,
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'error', 'warning'] },
    title: { control: 'text' },
    description: { control: 'text' },
    duration: { control: 'number' },
  },
  render: (args) => (
    <ds-toast
      variant={args.variant}
      title={args.title}
      description={args.description}
      duration={args.duration}
    />
  ),
} satisfies Meta<ToastArgs>;

export default meta;
type Story = StoryObj<ToastArgs>;

export const Default: Story = {};
