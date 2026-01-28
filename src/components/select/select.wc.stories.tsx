import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDsSelect } from './select.wc';
import { defineDsLabel } from '../label/label.wc';

defineDsSelect();
defineDsLabel();

type SelectArgs = {
  variant?: 'default' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

const meta = {
  title: 'Primitives (Web)/Forms/Select',
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'error'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  render: (args) => (
    <div className="w-64 space-y-2">
      <ds-label>Choose an option</ds-label>
      <ds-select variant={args.variant} size={args.size} disabled={args.disabled}>
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </ds-select>
    </div>
  ),
} satisfies Meta<SelectArgs>;

export default meta;
type Story = StoryObj<SelectArgs>;

export const Default: Story = {};
