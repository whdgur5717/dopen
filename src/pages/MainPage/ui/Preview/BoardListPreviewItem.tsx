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
  const { data, isLoading } = useSuspenseQuery({
    ...postQueries.postList({ channelId }),
    select: (data) => {
      const firstPost = data[0];
      const firstPostTitle = firstPost
        ? (JSON.parse(firstPost.title).title as string)
        : '등록된 글이 없습니다.';
      return firstPostTitle;
    },
  });

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      onClick={() => navigate({ to: `/board/${channel}` })}
    >
      <Box width="140px" fontSize="1.5rem" fontWeight="medium">
        {boardName}
      </Box>
      <Box
        width="200px"
        fontSize="1.2rem"
        fontWeight="medium"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {!isLoading && data}
      </Box>
    </Flex>
  );
};

export default BoardListPreviewItem;
