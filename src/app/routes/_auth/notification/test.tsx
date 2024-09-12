import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/notification/test')({
  component: () => <div>Hello /_auth/notification/test!</div>,
});
