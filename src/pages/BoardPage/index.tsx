// import { StackDivider, VStack } from '@chakra-ui/react';
// import { useSuspenseQuery } from '@tanstack/react-query';
// import { postQueries } from 'entities/post/post.queries';
// import PostListItem from 'entities/post/ui/PostListItem';

const BoardPage = () => {
  return <div>준비중입니다</div>;
  // const { data } = useSuspenseQuery({
  //   ...postQueries.postList({}),
  // });

  // return (
  //   <VStack w="100%" spacing={0} divider={<StackDivider />}>
  //     {data.map((post) => {
  //       return (
  //         <PostListItem
  //           key={post.title.content + post.createdAt}
  //           title={post.title.title}
  //           author={post.author._fullName.name}
  //           timeAgo={post.createdAt}
  //           likeCount={post.likes?.length || 0}
  //           commentCount={post.comments?.length || 0}
  //         />
  //       );
  //     })}
  //   </VStack>
  // );
};
export default BoardPage;
