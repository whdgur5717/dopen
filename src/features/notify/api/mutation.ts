import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationQueries } from 'entities/nofitication/api/notification.queries';
import { createNotification, putNotificationSeen } from 'shared/openapi';
import { CreateNotificationRequest } from 'shared/openapi/generate/model/create-notification-request';

// export const messageByTypes: {
//   [key in keyof CreateNotificationRequestNotificationTypeEnum]: string;
// } = {
//   MESSAGE: '회원님에게 메시지를 보냈습니다.',
//   COMMENT: '회원님의 게시물에 댓글을 남겼습니다.',
//   FOLLOW: '회원님을 팔로우하기 시작했습니다 ',
//   LIKE: '회원님의 게시물에 좋아요를 보냈습니다',
// };

export const usePushNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateNotificationRequest) => {
      return createNotification({
        createNotificationRequest: {
          ...params,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueries.keys.root,
      });
    },
  });
};

export const useCheckNotificationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putNotificationSeen,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueries.keys.root,
      });
    },
  });
};
