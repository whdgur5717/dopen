import ReflectionViewPage from '@/pages/ReflectionViewPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/_auth/Board/_boardlayout/Reflection/$postId',
)({
  component: () => <ReflectionViewPage />,
});
