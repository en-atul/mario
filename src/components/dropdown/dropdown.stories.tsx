import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './dropdown';
import { Button } from '../button';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown
      trigger={<Button>Open Menu</Button>}
      items={[
        { label: 'Profile', onClick: () => console.log('Profile') },
        { label: 'Settings', onClick: () => console.log('Settings') },
        { label: 'Logout', onClick: () => console.log('Logout') },
      ]}
    />
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <Dropdown
      trigger={<Button>Actions</Button>}
      items={[
        { label: 'Edit', onClick: () => console.log('Edit') },
        { label: 'Duplicate', onClick: () => console.log('Duplicate') },
        { separator: true },
        { label: 'Delete', onClick: () => console.log('Delete') },
      ]}
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Dropdown
      trigger={<Button>Menu</Button>}
      items={[
        { label: 'Enabled', onClick: () => console.log('Enabled') },
        { label: 'Disabled', disabled: true },
        { label: 'Another', onClick: () => console.log('Another') },
      ]}
    />
  ),
};

export const RightAligned: Story = {
  render: () => (
    <div className="flex justify-end">
      <Dropdown
        trigger={<Button>Right Aligned</Button>}
        align="right"
        items={[
          { label: 'Item 1', onClick: () => console.log('Item 1') },
          { label: 'Item 2', onClick: () => console.log('Item 2') },
        ]}
      />
    </div>
  ),
};

