import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './tooltip';
import { Button } from '../button';

const meta = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <Tooltip content="Top tooltip" side="top">
        <Button>Top</Button>
      </Tooltip>
      <div className="flex gap-8">
        <Tooltip content="Left tooltip" side="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Tooltip content={<div>Rich <strong>content</strong> with <em>formatting</em></div>}>
      <Button>Hover for rich content</Button>
    </Tooltip>
  ),
};

