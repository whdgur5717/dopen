import { StackDivider, VStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { postQueries } from 'entities/post/post.queries';
import PostListItem from 'src/components/PostList/PostListItem';

const BoardPage = () => {
  const { data } = useSuspenseQuery(
    channelQueries.channelInfo(location.pathname.split('/')[2]),
  );

  const { data: posts } = useSuspenseQuery(
    postQueries.postList({ channelId: data._id, offset: 0, limit: 0 }),
  );

  return (
    <VStack w="100%" spacing={0} divider={<StackDivider />}>
      {posts.map((post) => {
        return (
          <PostListItem
            key={post._id}
            title={post.title}
            author={post.author.username}
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
