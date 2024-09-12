import BoardEnterPage from '@/pages/BoardEnterPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/Board/')({
  component: () => <BoardEnterPage />,
});
