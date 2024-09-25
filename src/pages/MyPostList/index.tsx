import { Box, Flex } from '@chakra-ui/react';
import { useLoaderData } from '@tanstack/react-router';
import PostListItem from 'entities/post/ui/PostListItem';
import { calculateTimeDiff } from 'shared/utils/calculateTimeDiff';

const MyPostList = () => {
  const { _posts } = useLoaderData({ from: '/_auth' });

  // const onPostDetail = (id: string, channel) => {
  //   switch (channel) {
  //     case FREE:
  //       navigate({ to: `/board/free/${id}` });
  //       break;
  //     case REFLECTION:
  //       navigate({ to: `/board/reflection/${id}` });
  //       break;
  //     case INFOSHARE:
  //       navigate({ to: `/board/infoshare/${id}` });
  //       break;
  //   }
  // };

  return (
    <Flex flex="1" flexDir="column">
      <Box flex="1" padding="0 0 20px">
        {_posts.length === 0 && (
          <Box textAlign="center" fontSize="14px" p="50px 0">
            작성한 게시글이 없습니다.
          </Box>
        )}
        {_posts?.map(({ _id: id, title, createdAt, likes, comments }) => (
          <PostListItem
            key={id}
            title={JSON.parse(title).title}
            timeAgo={calculateTimeDiff(createdAt) || ''}
            likeCount={likes.length}
            commentCount={comments.length}
            style={{ borderBottom: '1px solid' }}
            // onClick={() => onPostDetail(id, channel as unknown as Channel)}
          />
        ))}
      </Box>
    </Flex>
  );
};

export default MyPostList;
