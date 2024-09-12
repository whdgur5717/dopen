import Login from '@/pages/Login';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/Login/')({
  component: () => <Login />,
});
