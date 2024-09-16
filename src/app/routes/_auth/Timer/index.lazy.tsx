import { createLazyFileRoute } from '@tanstack/react-router';
import TimerPage from 'pages/TimerPage';

export const Route = createLazyFileRoute('/_auth/Timer/')({
  component: () => <TimerPage />,
});
