import BoardPage from '@/pages/BoardPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/_auth/Board/_boardlayout/$boardName/',
)({
  component: () => <BoardPage />,
});
