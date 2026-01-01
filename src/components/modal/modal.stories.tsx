import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from './modal';
import { Button } from '../button';

const meta = {
  title: 'Components/Overlays/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = ({ size }: { size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>This is the modal content. You can put any content here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalDemo size="xl" />,
};

export const FullWidth: Story = {
  render: () => <ModalDemo size="full" />,
};

