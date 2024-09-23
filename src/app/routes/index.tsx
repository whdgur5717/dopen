import { createFileRoute } from '@tanstack/react-router';
import { authQueries } from 'entities/auth/api/auth.queries';
import { channelQueries } from 'entities/channel/api/channel.queries';
import MainPage from 'pages/MainPage';

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    return await Promise.all([
      queryClient.prefetchQuery({ ...authQueries.auth() }),
      queryClient.prefetchQuery({ ...channelQueries.channelList() }),
    ]);
  },
  pendingComponent: () => <div>로딩중입니다</div>,
  component: () => <MainPage />,
});
//채널 리스트와, 유저 정보 prefetch
