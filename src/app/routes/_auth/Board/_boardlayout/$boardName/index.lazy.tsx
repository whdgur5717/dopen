import { createLazyFileRoute } from '@tanstack/react-router';
import BoardPage from 'pages/BoardPage';

export const Route = createLazyFileRoute(
  '/_auth/Board/_boardlayout/$boardName/',
)({
  component: () => <BoardPage />,
});
