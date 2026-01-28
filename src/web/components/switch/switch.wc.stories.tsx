import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsSwitch } from './switch.wc';
import { defineDsLabel } from '../label/label.wc';

defineDsSwitch();
defineDsLabel();

type SwitchArgs = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
};

const meta = {
  title: 'Primitives/Forms/Switch',
  args: {
    checked: false,
    disabled: false,
    label: 'Enable notifications',
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <ds-switch checked={args.checked} disabled={args.disabled} />
      <ds-label>{args.label}</ds-label>
    </div>
  ),
} satisfies Meta<SwitchArgs>;

export default meta;
type Story = StoryObj<SwitchArgs>;

export const Default: Story = {};
