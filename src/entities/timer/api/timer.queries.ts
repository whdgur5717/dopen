import { queryOptions } from '@tanstack/react-query';
import { client } from 'shared/supabase';

export const timerQueries = {
  keys: {
    root: ['timer'] as const,
    list: (userId: string) => [...timerQueries.keys.root, userId] as const,
  },
  getUserTimerList(userId: string) {
    return queryOptions({
      queryKey: timerQueries.keys.list(userId),
      queryFn: () => client.timerStamp.getTimerStamps(userId),
    });
  },
};
