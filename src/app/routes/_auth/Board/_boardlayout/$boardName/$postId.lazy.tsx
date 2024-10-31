import { createLazyFileRoute } from '@tanstack/react-router';
import PostPage from 'pages/PostPage';

export const Route = createLazyFileRoute(
  '/_auth/Board/_boardlayout/$boardName/$postId',
)({
  component: () => <PostPage />,
});
