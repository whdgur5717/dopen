import { Box, Flex } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { postQueries } from 'entities/post/post.queries';

interface BoardListPreviewItemProps {
  boardName: string;
  channel: string;
  channelId: string;
}

const BoardListPreviewItem = ({
  boardName,
  channel,
  channelId,
}: BoardListPreviewItemProps) => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery({
    ...postQueries.postList({ channelId }),
  });

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      gap="5px"
      onClick={() => navigate({ to: `/board/${channel}` })}
    >
      <Box width="140px" fontSize="xl" fontWeight="medium">
        {boardName}
      </Box>
      <Box
        width="200px"
        fontSize="xl"
        fontWeight="medium"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {data[0]._title.title}
      </Box>
    </Flex>
  );
};

export default BoardListPreviewItem;
