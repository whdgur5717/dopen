import { createFileRoute } from '@tanstack/react-router';
import { postQueries } from 'entities/post/api/post.queries';

export const Route = createFileRoute(
  '/_auth/Board/_boardlayout/$boardName/$postId',
)({
  loader: async ({ params, context: { queryClient } }) => {
    if (!params.postId) {
      throw new Error('포스트가 유효하지 않습니다');
    }

    const data = await queryClient.ensureQueryData({
      ...postQueries.post(params.postId),
    });

    return data;
  },
});
