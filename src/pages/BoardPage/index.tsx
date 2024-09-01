import OnlineUsers from '@/pages/BoardPage/OnlineUsers';
import BoardPostList from '@/pages/BoardPage/BoardPostList';
import { channelInfoQuery } from '@/hooks/useChannels';
import { useSuspenseQuery } from '@tanstack/react-query';

const BoardPage = () => {
  const { data: pathInfo } = useSuspenseQuery(
    channelInfoQuery(location.pathname.split('/')[2]),
  );

  return (
    <>
      <OnlineUsers />
      <BoardPostList channelId={pathInfo._id} />
    </>
  );
};
export default BoardPage;
