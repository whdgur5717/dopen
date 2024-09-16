import { createFileRoute } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import BoardPage from 'pages/BoardPage';

export const Route = createFileRoute('/_auth/Board/_boardlayout/$boardName/')({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      ...channelQueries.channelList(),
    });
    return data;
  },
  pendingComponent: () => {
    return <div>로딩중</div>;
  },
  component: () => <BoardPage />,
});
