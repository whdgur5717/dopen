import { createLazyFileRoute } from '@tanstack/react-router';
import LoginPage from 'pages/LoginPage';

export const Route = createLazyFileRoute('/(auth)/Login/')({
  component: () => <LoginPage />,
});
