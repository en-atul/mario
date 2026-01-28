import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsLink } from './link.wc';

defineDsLink();

type LinkArgs = {
  variant?: 'default' | 'muted' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  href?: string;
};

const meta = {
  title: 'Primitives (Web)/Actions/Link',
  args: {
    variant: 'default',
    size: 'md',
    text: 'Link',
    href: '#',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'muted', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    text: { control: 'text' },
  },
  render: (args) => (
    <ds-link variant={args.variant} size={args.size} href={args.href}>
      {args.text}
    </ds-link>
  ),
} satisfies Meta<LinkArgs>;

export default meta;
type Story = StoryObj<LinkArgs>;

export const Default: Story = {};
