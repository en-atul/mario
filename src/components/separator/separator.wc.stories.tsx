import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsSeparator } from './separator.wc';

defineDsSeparator();

type SeparatorArgs = {
  orientation?: 'horizontal' | 'vertical';
};

const meta = {
  title: 'Primitives (Web)/Layout/Separator',
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  render: (args) =>
    args.orientation === 'vertical' ? (
      <div className="flex h-20 items-center gap-4">
        <div>Left</div>
        <ds-separator orientation="vertical" />
        <div>Right</div>
      </div>
    ) : (
      <div className="w-64">
        <div className="py-4">Above</div>
        <ds-separator orientation="horizontal" />
        <div className="py-4">Below</div>
      </div>
    ),
} satisfies Meta<SeparatorArgs>;

export default meta;
type Story = StoryObj<SeparatorArgs>;

export const Default: Story = {};
