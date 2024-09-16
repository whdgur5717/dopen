import { createFileRoute } from '@tanstack/react-router';
import PostViewPage from 'pages/PostViewPage';

export const Route = createFileRoute(
  '/_auth/Board/_boardlayout/$boardName/$postId',
)({
  component: () => <PostViewPage />,
});
