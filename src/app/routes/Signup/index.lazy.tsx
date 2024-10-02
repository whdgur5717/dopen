import { createLazyFileRoute } from '@tanstack/react-router';
import SignUp from 'pages/SignUpPage';

export const Route = createLazyFileRoute('/Signup/')({
  component: () => <SignUp />,
});
