import { createLazyFileRoute } from '@tanstack/react-router';
import Login from 'pages/LoginPage';

export const Route = createLazyFileRoute('/Login/')({
  component: () => <Login />,
});
