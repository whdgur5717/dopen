import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MY_COMMENT_LIST, POST_DETAIL } from 'constants/queryKeys';
import { createComment, deleteComment } from 'shared/api/comment/api';
import { pushNotification } from 'shared/api/notification/api';

export const useCreateComment = (author: string) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation({
    mutationFn: createComment,
    onSuccess: async (data) => {
      await pushNotification({
        notificationType: 'COMMENT',
        notificationTypeId: data._id,
        userId: author,
        postId: data.post,
      });
      queryClient.invalidateQueries({ queryKey: [POST_DETAIL, data.post] });
    },
    onError: () => {
      alert('저장에 실패했습니다. 다시 시도해주세요');
    },
  });
  return {
    pushComment: mutate,
    isSuccess,
  };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_DETAIL] });
      queryClient.invalidateQueries({ queryKey: [MY_COMMENT_LIST] });
    },
    onError: () => {
      alert('삭제에 실패했습니다. 다시 시도해주세요');
    },
  });
  return mutate;
};
