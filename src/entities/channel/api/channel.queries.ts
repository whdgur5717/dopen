/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryOptions } from '@tanstack/react-query';
import { client } from 'shared/supabase';

export const channelQueries = {
  keys: {
    list: ['channel_list'] as const,
    channelInfo: (channel: string) =>
      [channelQueries.keys.list, channel] as const,
  },

  channelList() {
    return queryOptions({
      queryKey: [...channelQueries.keys.list],
      queryFn: async () => await client.channel.getChannelList(),
      staleTime: Infinity,
    });
  },
  postList(id: string) {
    return queryOptions({
      queryKey: [...channelQueries.keys.channelInfo(id)],
      queryFn: async () => await client.channel.getPostList(id),
      staleTime: Infinity,
    });
  },
};
