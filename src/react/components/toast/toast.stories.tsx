import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './toast';
import { Button } from '../button';
import { ToastProvider, useToast } from './toast-provider';

const meta = {
  title: 'React/Components/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastDemo = () => {
  const { addToast } = useToast();

  return (
    <div className="space-x-2">
      <Button
        onClick={() =>
          addToast({
            title: 'Success',
            description: 'Your changes have been saved.',
            variant: 'success',
          })
        }
      >
        Show Success
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Error',
            description: 'Something went wrong.',
            variant: 'error',
          })
        }
      >
        Show Error
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Warning',
            description: 'Please review your input.',
            variant: 'warning',
          })
        }
      >
        Show Warning
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <Toast
      title="Notification"
      description="This is a default toast message."
    />
  ),
};

export const Success: Story = {
  render: () => (
    <Toast
      variant="success"
      title="Success"
      description="Your changes have been saved."
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Toast
      variant="error"
      title="Error"
      description="Something went wrong."
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <Toast
      variant="warning"
      title="Warning"
      description="Please review your input."
    />
  ),
};

export const WithProvider: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
