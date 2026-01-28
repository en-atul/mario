import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsRadio } from './radio.wc';
import { defineDsLabel } from '../label/label.wc';

defineDsRadio();
defineDsLabel();

type RadioArgs = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
};

const meta = {
  title: 'Primitives (Web)/Forms/Radio',
  args: {
    checked: false,
    disabled: false,
    label: 'Option',
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <ds-radio checked={args.checked} disabled={args.disabled} />
      <ds-label>{args.label}</ds-label>
    </div>
  ),
} satisfies Meta<RadioArgs>;

export default meta;
type Story = StoryObj<RadioArgs>;

export const Default: Story = {};
