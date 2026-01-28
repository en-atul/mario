import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsSkeleton } from './skeleton.wc';

defineDsSkeleton();

const meta = {
  title: 'Primitives (Web)/Feedback/Skeleton',
  render: () => (
    <div className="space-y-2">
      <ds-skeleton style={{ height: '1rem', width: '16rem' }} />
      <ds-skeleton style={{ height: '1rem', width: '12rem' }} />
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
