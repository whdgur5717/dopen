import { createLazyFileRoute } from '@tanstack/react-router';
import LoginPage from 'pages/LoginPage';

export const Route = createLazyFileRoute('/Login/')({
  component: () => <LoginPage />,
});
