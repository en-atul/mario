import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Radio } from './radio';
import { Label } from '../label';

const meta = {
  title: 'React/Components/Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Radio
            id="option1"
            name="radio-group"
            value="option1"
            checked={value === 'option1'}
            onChange={(e) => setValue(e.target.value)}
          />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="option2"
            name="radio-group"
            value="option2"
            checked={value === 'option2'}
            onChange={(e) => setValue(e.target.value)}
          />
          <Label htmlFor="option2">Option 2</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="option3"
            name="radio-group"
            value="option3"
            checked={value === 'option3'}
            onChange={(e) => setValue(e.target.value)}
          />
          <Label htmlFor="option3">Option 3</Label>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Radio id="disabled1" name="disabled" disabled />
        <Label htmlFor="disabled1" className="opacity-50">
          Disabled
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="disabled2" name="disabled" disabled defaultChecked />
        <Label htmlFor="disabled2" className="opacity-50">
          Disabled (checked)
        </Label>
      </div>
    </div>
  ),
};
