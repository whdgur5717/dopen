import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';

import BoardListPreviewItem from './BoardListPreviewItem';

const BoardListPreview = () => {
  const { navigate } = useRouter();

  const { data: channelList } = useSuspenseQuery({
    ...channelQueries.channelList(),
    select: ({ data }) => data,
  });

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
        {channelList?.map((data) => (
          <BoardListPreviewItem
            key={data.id}
            boardName={data.name!}
            title={data.posts[0].title!}
            onClick={() => navigate({ to: '/Board' })}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default BoardListPreview;
