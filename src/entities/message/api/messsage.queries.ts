import { queryOptions } from '@tanstack/react-query';
import { api } from 'shared/openapi';

import { ConversationModel, MessageModel } from '../model/log';

export const messageQueries = {
  keys: {
    root: ['message'] as const,
    list: (userId: string) => [...messageQueries.keys.root, userId] as const,
  },

  list_my(myId: string) {
    return queryOptions({
      queryKey: [...messageQueries.keys.root],
      queryFn: api.getMessageList,
      select: (messages) => {
        return messages.map((conversation) => {
          return new ConversationModel(conversation, myId)._format;
        });
      },
    });
  },

  list(userId: string) {
    return queryOptions({
      queryKey: [...messageQueries.keys.list(userId)],
      queryFn: async () => await api.getMessageListByUser({ userId }),
      select: (messages) => {
        return messages?.reduce((map, message) => {
          const model = new MessageModel(message, userId);
          const { date, ...rest } = model._format;

          const ex = map.get(date);

          if (ex) {
            map.set(date, [...ex, rest]);
          } else {
            map.set(date, [rest]);
          }

          return map;
        }, new Map<string, Omit<MessageModel['_format'], 'date'>[]>());
      },
    });
  },
};
