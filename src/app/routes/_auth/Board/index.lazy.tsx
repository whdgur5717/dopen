import { createLazyFileRoute } from '@tanstack/react-router';
import BoardEnterPage from 'pages/BoardEnterPage';

export const Route = createLazyFileRoute('/_auth/Board/')({
  component: () => <BoardEnterPage />,
});
