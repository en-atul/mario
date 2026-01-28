import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './link';

const meta = {
  title: 'React/Components/Actions/Link',
  component: Link,
  args: {
    children: 'Link',
    href: '#',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: 'muted' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link size="sm" href="#">
        Small Link
      </Link>
      <Link size="md" href="#">
        Medium Link
      </Link>
      <Link size="lg" href="#">
        Large Link
      </Link>
    </div>
  ),
};
