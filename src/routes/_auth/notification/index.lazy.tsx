import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/notification/')({
  component: () => <div>Hello /notification/!</div>,
});
