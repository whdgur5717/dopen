import { createFileRoute } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { postQueries } from 'entities/post/post.queries';
import BoardPage from 'pages/BoardPage';

export const Route = createFileRoute('/_auth/Board/_boardlayout/$boardName/')({
  loader: async ({ context, location }) => {
    const data = await context.queryClient.ensureQueryData({
      ...channelQueries.channelList(),
      revalidateIfStale: true,
    });
    const channelId = data.filter(
      (channel) =>
        channel.authRequired === false &&
        channel.name === location.href.split('/').at(-1),
    )[0]._id;
    context.queryClient.prefetchQuery({
      ...postQueries.postList({ channelId }),
    });
    return channelId;
  },
  pendingMs: 0,
  pendingMinMs: 0,
  component: () => <BoardPage />,
});
