import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './typography';

const meta = {
  title: 'Primitives (React)/Layout/Typography',
  component: Typography,
  args: {
    children: 'Typography',
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
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: { variant: 'h1', children: 'Heading 1' },
};

export const Heading2: Story = {
  args: { variant: 'h2', children: 'Heading 2' },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children: 'This is a paragraph with some text to demonstrate the typography component.',
  },
};

export const Lead: Story = {
  args: {
    variant: 'lead',
    children: 'This is a lead paragraph that stands out.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is muted text for secondary information.',
  },
};

export const Code: Story = {
  args: {
    variant: 'code',
    children: 'const example = "code";',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="p">
        This is a paragraph with regular text content.
      </Typography>
      <Typography variant="lead">This is a lead paragraph.</Typography>
      <Typography variant="muted">This is muted text.</Typography>
      <Typography variant="code">const code = "example";</Typography>
    </div>
  ),
};

