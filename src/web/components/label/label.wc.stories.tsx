import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsLabel } from './label.wc';

defineDsLabel();

type LabelArgs = {
  variant?: 'default' | 'muted' | 'error';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
};

const meta = {
  title: 'Primitives/Forms/Label',
  args: {
    variant: 'default',
    size: 'md',
    text: 'Label',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'muted', 'error'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    text: { control: 'text' },
  },
  render: (args) => (
    <ds-label variant={args.variant} size={args.size}>
      {args.text}
    </ds-label>
  ),
} satisfies Meta<LabelArgs>;

export default meta;
type Story = StoryObj<LabelArgs>;

export const Default: Story = {};
