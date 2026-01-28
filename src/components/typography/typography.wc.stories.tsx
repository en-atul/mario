import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsTypography } from './typography.wc';

defineDsTypography();

type TypographyArgs = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted'
    | 'blockquote'
    | 'code'
    | 'pre';
  text?: string;
};

const meta = {
  title: 'Primitives (Web)/Layout/Typography',
  args: {
    variant: 'p',
    text: 'Typography',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'lead',
        'large',
        'small',
        'muted',
        'blockquote',
        'code',
        'pre',
      ],
    },
    text: { control: 'text' },
  },
  render: (args) => (
    <ds-typography variant={args.variant}>{args.text}</ds-typography>
  ),
} satisfies Meta<TypographyArgs>;

export default meta;
type Story = StoryObj<TypographyArgs>;

export const Default: Story = {};
