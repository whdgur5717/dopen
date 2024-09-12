import PostViewPage from '@/pages/PostViewPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_auth/Board/_boardlayout/$boardName/$postId',
)({
  component: () => <PostViewPage />,
});
