import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs
      items={[
        {
          value: 'tab1',
          label: 'Tab 1',
          content: <div className="py-4">Content for Tab 1</div>,
        },
        {
          value: 'tab2',
          label: 'Tab 2',
          content: <div className="py-4">Content for Tab 2</div>,
        },
        {
          value: 'tab3',
          label: 'Tab 3',
          content: <div className="py-4">Content for Tab 3</div>,
        },
      ]}
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs
      items={[
        {
          value: 'tab1',
          label: 'Enabled',
          content: <div className="py-4">This tab is enabled</div>,
        },
        {
          value: 'tab2',
          label: 'Disabled',
          disabled: true,
          content: <div className="py-4">This tab is disabled</div>,
        },
        {
          value: 'tab3',
          label: 'Another',
          content: <div className="py-4">Another enabled tab</div>,
        },
      ]}
    />
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Tabs
      defaultValue="tab2"
      items={[
        {
          value: 'tab1',
          label: 'Tab 1',
          content: <div className="py-4">First tab content</div>,
        },
        {
          value: 'tab2',
          label: 'Tab 2',
          content: <div className="py-4">Second tab content (default)</div>,
        },
      ]}
    />
  ),
};

