import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from './dialog';
import { Button } from '../button';

const meta = {
  title: 'Components/Overlays/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <p>This is the dialog content area.</p>
        </DialogContent>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const Simple: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Simple Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Simple Dialog</DialogTitle>
            <DialogDescription>
              This is a simple dialog with minimal content.
            </DialogDescription>
          </DialogHeader>
        </Dialog>
      </>
    );
  },
};

