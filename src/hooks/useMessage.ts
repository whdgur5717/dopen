import { MESSAGE } from '@/constants/queryKeys';
import { getMessageListByUser, sendMessage } from '@/shared/api/message/api';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { convertDateToString } from 'shared/utils/convertDateToString';

interface MessageLog {
  time: string;
  message: string;
  _id: string;
  type: 'sent' | 'received';
}

export const useMessage = (userId: string) => {
  const { data: messageList } = useSuspenseQuery({
    queryKey: [MESSAGE, userId],
    queryFn: async () => await getMessageListByUser(userId),

    select: (data) => {
      const messageLogs = new Map<string, MessageLog[]>();
      data?.forEach(({ message, sender, _id, createdAt }) => {
        const { date, time } = convertDateToString(new Date(createdAt));
        const type = userId === sender._id ? 'sent' : 'received';
        //userId 상대방임
        const existingMessages = messageLogs.get(date);
        if (existingMessages) {
          messageLogs.set(date, [
            ...existingMessages,
            { _id, message, type, time },
          ]);
        } else {
          messageLogs.set(date, [{ _id, message, type, time }]);
        }
      });
      return Array.from(messageLogs.entries());
    },
  });

  return messageList || [];
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: sendMessage,
    onSuccess: async (data, { receiver }) => {
      queryClient.invalidateQueries({ queryKey: [MESSAGE, receiver] });
      return data;
    },
  });

  return mutate;
};
