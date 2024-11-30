import { createFileRoute } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { client } from 'shared/supabase';

export const Route = createFileRoute('/_auth/Board/_boardlayout/$boardName/')({
  loader: async ({ context: { queryClient }, params: { boardName } }) => {
    const channel = await client.channel.getChannelId(boardName);

    if (!channel) throw new Error('채널을 찾을 수 없습니다.');

    const postList = await queryClient.ensureQueryData({
      ...channelQueries.postList(channel.id),
    });
    return postList;
  },
  pendingComponent: () => <div>로드중입니다</div>,
  errorComponent: () => <div>에러가 발생했습니다</div>,
});
