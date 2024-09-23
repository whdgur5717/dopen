import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueries } from 'entities/post/post.queries';
import { api } from 'shared/openapi';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...postQueries.keys.list(data.channel._id)],
      });
    },
  });
};

export const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...postQueries.keys.list(data.channel._id)],
      });
    },
  });
};

export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: api.deletePost,
  });
};
