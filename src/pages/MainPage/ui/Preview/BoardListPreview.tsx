import { ChevronRightIcon } from '@chakra-ui/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { Button } from 'shared/ui/button';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import BoardListPreviewItem from './BoardListPreviewItem';

const BoardListPreview = () => {
  const { navigate } = useRouter();

  const { data: channelList } = useQuery({
    ...channelQueries.channelList(),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={flex({ flexDirection: 'column', gap: '5px' })}>
      <div className={flex({ justifyContent: 'space-between' })}>
        <span className={css({ textStyle: 'body' })}>게시판</span>
        <Button
          variant="outline"
          onClick={() => navigate({ to: '/Board' })}
          textAlign="center"
          width="auto"
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div className={flex({ flexDirection: 'column', gap: '5px' })}>
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
