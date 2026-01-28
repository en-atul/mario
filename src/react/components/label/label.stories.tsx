import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';

const meta = {
  title: 'React/Components/Forms/Label',
  component: Label,
  args: {
    children: 'Label',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: 'muted' },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
    </div>
  ),
};
