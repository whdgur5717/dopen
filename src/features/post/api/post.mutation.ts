import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueries } from 'entities/post/post.queries';
import { createPost, deletePost } from 'shared/openapi';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...postQueries.keys.list(data.channel._id)],
      });
    },
  });
};

export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: deletePost,
  });
};
