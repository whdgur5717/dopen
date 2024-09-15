import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';

import BoardListPreviewItem from './BoardListPreviewItem';

const BoardListPreview = () => {
  const { data: channelListData } = useSuspenseQuery({
    ...channelQueries.channelList(),
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
        {channelListData?.map((item) => (
          <BoardListPreviewItem
            key={item._id}
            channel={item.name}
            channelId={item._id}
            boardName={item.description}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default BoardListPreview;
