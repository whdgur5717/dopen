import { createFileRoute } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';

export const Route = createFileRoute('/_auth/Board/')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(channelQueries.channelList());
  },
});
