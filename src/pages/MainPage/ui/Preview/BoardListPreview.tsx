import { ChevronRightIcon } from '@chakra-ui/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { Button } from 'shared/ui/button';

import BoardListPreviewItem from './BoardListPreviewItem';

const BoardListPreview = () => {
  const { navigate } = useRouter();

  const { data: channelList } = useQuery({
    ...channelQueries.channelList(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div>
        <span>게시판</span>
        <Button
          variant="outline"
          onClick={() => navigate({ to: '/Board' })}
          textAlign="center"
          width="auto"
        ></Button>
        <ChevronRightIcon />
      </div>
      <div>
        {channelList?.map((data) => (
          <BoardListPreviewItem
            key={data.id}
            boardName={data.display}
            title={data.posts[0].title!}
            onClick={() => navigate({ to: '/Board' })}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardListPreview;
