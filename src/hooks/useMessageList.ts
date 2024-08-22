import { AxiosError } from 'axios';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMessageList } from '@/apis/message';
import { Conversation } from '@/apis/type';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { MESSAGE_LIST } from '@/constants/queryKeys';
import { useCheckUserAuth } from './useAuth';

export const useMessageList = () => {
  const { data: myInfo } = useCheckUserAuth();

  const { data } = useSuspenseQuery<Conversation[], AxiosError>({
    queryKey: [MESSAGE_LIST, myInfo?._id],
    queryFn: getMessageList,
  });

  const messageLogList = data?.map(
    ({ createdAt, message, sender, receiver }) => {
      const otherType = sender._id === myInfo?._id ? receiver : sender;

      return {
        key: createdAt,
        userImage: otherType.coverImage,
        username: otherType.username,
        content: message,
        subContent: calculateTimeDiff(createdAt) || '',
        userId: otherType._id,
      };
    },
  );
  return messageLogList ? messageLogList : [];
};
