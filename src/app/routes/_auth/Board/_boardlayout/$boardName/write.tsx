import PostEditPage from '@/pages/PostEditPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_auth/Board/_boardlayout/$boardName/write',
)({
  component: () => <PostEditPage />,
});
