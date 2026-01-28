import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsCheckbox } from './checkbox.wc';
import { defineDsLabel } from '../label/label.wc';

defineDsCheckbox();
defineDsLabel();

type CheckboxArgs = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
};

const meta = {
  title: 'Primitives/Forms/Checkbox',
  id: 'primitives-forms-checkbox',
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    label: 'Accept terms',
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <ds-checkbox checked={args.checked} disabled={args.disabled} />
      <ds-label>{args.label}</ds-label>
    </div>
  ),
} satisfies Meta<CheckboxArgs>;

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {};
