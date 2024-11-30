import { createFileRoute } from '@tanstack/react-router';
import LoginPage from 'pages/LoginPage';

export const Route = createFileRoute('/(auth)/Login/')({
  component: () => <LoginPage />,
});
