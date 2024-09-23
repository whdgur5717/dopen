import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueries } from 'entities/post/post.queries';
import { api } from 'shared/openapi';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createComment,
    onSuccess: (_, ctx) => {
      queryClient.invalidateQueries({
        queryKey: postQueries.keys.detail(ctx.createCommentRequest.postId),
      });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteComment,
    onSuccess: (_, ctx) => {
      queryClient.invalidateQueries({
        queryKey: postQueries.keys.detail(ctx.id),
      });
    },
  });
};
