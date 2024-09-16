import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueries } from 'entities/post/post.queries';
import { createComment, deleteComment } from 'shared/openapi';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
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
    mutationFn: deleteComment,
    onSuccess: (_, ctx) => {
      queryClient.invalidateQueries({
        queryKey: postQueries.keys.detail(ctx.id),
      });
    },
  });
};
