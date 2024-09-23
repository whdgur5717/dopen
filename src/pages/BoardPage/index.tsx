import { StackDivider, VStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData } from '@tanstack/react-router';
import { postQueries } from 'entities/post/post.queries';
import PostListItem from 'src/components/PostList/PostListItem';

const BoardPage = () => {
  const channelId = useLoaderData({
    from: '/_auth/Board/_boardlayout/$boardName/',
  });

  const { data } = useSuspenseQuery({
    ...postQueries.postList({ channelId }),
  });

  return (
    <VStack w="100%" spacing={0} divider={<StackDivider />}>
      {data.map((post) => {
        return (
          <PostListItem
            key={post.title.content + post.createdAt}
            title={post.title.title}
            author={post.author.fullName}
            timeAgo={post.createdAt}
            likeCount={post.likes?.length || 0}
            commentCount={post.comments?.length || 0}
          />
        );
      })}
    </VStack>
  );
};
export default BoardPage;
