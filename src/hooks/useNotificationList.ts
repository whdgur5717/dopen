import { Notification, User } from '@/apis/type';
import { NOTIFICATION_LIST } from '@/constants/queryKeys';
import {
  NotificationType,
  checkNotification,
  getUserNotificationList,
  pushNotification,
} from '@/shared/api/notification/api';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface MyNotificationListItem {
  type: NotificationType;
  author: User;
  date: string; //UTC
  _id: string;
}

export const messageByTypes: { [key in NotificationType]: string } = {
  MESSAGE: '회원님에게 메시지를 보냈습니다.',
  COMMENT: '회원님의 게시물에 댓글을 남겼습니다.',
  FOLLOW: '회원님을 팔로우하기 시작했습니다 ',
  LIKE: '회원님의 게시물에 좋아요를 보냈습니다',
};

export const useNotificationList = () => {
  const { data } = useSuspenseQuery<
    Notification[],
    AxiosError,
    MyNotificationListItem[]
  >({
    queryKey: [NOTIFICATION_LIST],
    queryFn: getUserNotificationList,
    refetchOnWindowFocus: true,

    select: (data) => {
      return data.map<MyNotificationListItem>((notify) => {
        const { createdAt: date, _id, author, seen } = notify;
        if (notify.message) {
          return { type: 'MESSAGE', author, date, _id, seen };
        }

        if (notify.comment) {
          return { type: 'COMMENT', author, date, _id, seen };
        }

        if (notify.follow) {
          return { type: 'FOLLOW', author, date, _id, seen };
        }

        if (notify.like) {
          return { type: 'LIKE', author, date, _id, seen };
        }

        return { type: 'MESSAGE', author, date, _id, seen };
      });
    },
  });

  return { myNotificationList: data ?? [] };
};

export const usePushNotification = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: pushNotification,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATION_LIST] });
    },
  });
  return mutate;
};

export const useCheckNotification = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: checkNotification,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATION_LIST] });
    },
  });
  return mutate;
};
