import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from './switch';
import { Label } from '../label';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="flex items-center gap-2">
        <Switch
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <Label>Enable notifications</Label>
      </div>
    );
  },
};

export const Checked: Story = {
  render: () => <Switch defaultChecked />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch disabled />
        <Label className="opacity-50">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch disabled defaultChecked />
        <Label className="opacity-50">Disabled (checked)</Label>
      </div>
    </div>
  ),
};

