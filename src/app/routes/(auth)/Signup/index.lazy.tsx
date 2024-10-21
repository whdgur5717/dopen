import { createLazyFileRoute } from '@tanstack/react-router';
import SignUp from 'pages/SignUpPage';

export const Route = createLazyFileRoute('/(auth)/Signup/')({
  component: () => <SignUp />,
});
