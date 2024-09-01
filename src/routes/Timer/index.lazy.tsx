import TimerPage from '@/pages/TimerPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/Timer/')({
  component: () => <TimerPage />,
});
