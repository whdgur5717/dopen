/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryOptions } from '@tanstack/react-query';
import { client } from 'shared/supabase';

export const channelQueries = {
  keys: {
    list: ['channel_list'] as const,
    channelInfo: (channel: string) =>
      [channelQueries.keys.list, channel] as const,
  },
  /**
   *
   * @returns 전체 채널 리스트 중 게시글 업로드하는 채널만 필터링
   */

  channelList() {
    return queryOptions({
      queryKey: [...channelQueries.keys.list],
      queryFn: async () => await client.channel.getChannelList(),
    });
  },
};
