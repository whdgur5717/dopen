import { useSuspenseQuery } from '@tanstack/react-query';
import { Conversation } from 'apis/type';
import { AxiosError } from 'axios';
import { MESSAGE_LIST } from 'constants/queryKeys';
import { getMessageList } from 'shared/api/message/api';
import { calculateTimeDiff } from 'shared/utils/calculateTimeDiff';

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
