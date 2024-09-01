import ReflectionPostEditPage from '@/pages/ReflectionPostEditPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_auth/Board/_boardlayout/Reflection/write',
)({
  component: () => <ReflectionPostEditPage />,
  validateSearch: (search) => {
    return {
      postId: search?.id || '',
    };
  },
});
