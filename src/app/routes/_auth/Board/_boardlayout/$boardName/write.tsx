import { createFileRoute } from '@tanstack/react-router';
import PostEditPage from 'pages/PostEditPage';

export const Route = createFileRoute(
  '/_auth/Board/_boardlayout/$boardName/write',
)({
  component: () => <PostEditPage />,
});
