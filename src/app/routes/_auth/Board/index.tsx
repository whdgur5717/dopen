import { channelListquery } from '@/hooks/useChannels';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/Board/')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(channelListquery);
  },
});
