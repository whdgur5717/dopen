import { createLazyFileRoute } from '@tanstack/react-router';
import ReflectionViewPage from 'pages/ReflectionViewPage';

export const Route = createLazyFileRoute(
  '/_auth/Board/_boardlayout/Reflection/$postId',
)({
  component: () => <ReflectionViewPage />,
});
