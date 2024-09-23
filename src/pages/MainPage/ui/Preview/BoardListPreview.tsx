import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { postQueries } from 'entities/post/post.queries';

import BoardListPreviewItem from './BoardListPreviewItem';

const BoardListPreview = () => {
  const { data: channelListData } = useSuspenseQuery({
    ...channelQueries.channelList(),
  });

  const postThumbnailLists = useSuspenseQueries({
    queries:
      channelListData?.map(({ _id }) => ({
        ...postQueries.postList({ channelId: _id }),
      })) || [],
    combine: (results) => {
      return results
        .map((result) => result.data)
        .map((post) => post[0].title.title);
    },
  });

  const navigate = useNavigate();

  return (
    <Flex w="100%" marginTop="30px" direction="column">
      <Flex
        borderBottom="1px"
        borderColor="gray.450"
        paddingBottom="23px"
        justifyContent="space-between"
      >
        <Text fontSize="3xl" fontWeight="medium" cursor="default">
          게시판
        </Text>
        <Button
          fontSize="md"
          bg="transparent"
          onClick={() => navigate({ to: '/Board' })}
        >
          더 보기 <ChevronRightIcon />
        </Button>
      </Flex>
      <Flex paddingTop="23px" gap="10px" direction="column">
        {postThumbnailLists?.map((title) => (
          <BoardListPreviewItem
            key={title}
            boardName={title}
            title={title}
            onClick={() => navigate({ to: '/Board' })}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default BoardListPreview;
