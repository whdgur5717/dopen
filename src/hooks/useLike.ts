import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AUTH, POST_DETAIL } from 'constants/queryKeys';
import { createLike, deleteLike } from 'shared/api/post/api';

import { useCheckUserAuth } from './useAuth';
import { usePostDetail } from './usePost';

export const useLike = (postId: string) => {
  const queryClient = useQueryClient();
  const { data: myInfo } = useCheckUserAuth();
  const {
    data: { likes },
  } = usePostDetail({
    id: postId!,
    enabled: !!postId,
  });
  const clicked = likes.filter((like) => like.user === myInfo?._id);
  const mutate = useMutation({
    mutationFn: async () => {
      if (!clicked.length) {
        return await createLike(postId);
      } else {
        return await deleteLike(clicked[0]._id);
      }
    },

    onError: () => {
      alert('잠시 후에 시도해주세요');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [POST_DETAIL, postId] });
      queryClient.invalidateQueries({ queryKey: [AUTH] });
    },
  });

  return {
    countLike: likes.length,
    mutateAsync: mutate.mutateAsync,
    clicked: clicked.length > 0,
  };
};
