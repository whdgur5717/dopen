import SignUp from '@/pages/SignUp';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/Signup/')({
  component: () => <SignUp />,
});
