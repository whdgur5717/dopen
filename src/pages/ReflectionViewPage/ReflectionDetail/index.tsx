import { ArrowDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Portal, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData, useParams, useRouter } from '@tanstack/react-router';
import Comments from 'components/Comment';
import { postQueries } from 'entities/post/post.queries';
import { useDeleteCommentMutation } from 'features/post/api/comment.mutation';
import { useLike } from 'hooks/useLike';
import { usePushNotification } from 'hooks/useNotificationList';
import { usePostDetail } from 'hooks/usePost';
import Post from 'pages/PostViewPage/PostDetail/Container';
import Settings from 'pages/PostViewPage/PostDetail/Settings';
import { useRef, useState } from 'react';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import { useConfirmModal } from 'shared/hook/useConfirmModal';
import Confirm from 'shared/ui/Confirm';
import TextIconButton from 'shared/ui/TextIconButton';
import UserContentBlock from 'shared/ui/UserContentBlock';
import CommentListItem from 'src/components/Comment/CommentListItem';
import { convertDateToString } from 'src/shared/utils/convertDateToString';

import TextCard from './TextCard';

const ReflectionDetail = () => {
  const { history, navigate } = useRouter();
  const { postId } = useParams({
    from: '/_auth/Board/_boardlayout/Reflection/$postId',
  });

  const { id, isMyPost } = useLoaderData({
    from: '/_auth',
    select: (data) => ({
      id: data._id,
      isMyPost: data._posts.some((post) => post._id === postId), //유저가 작성한 포스트의 id와 현재 보고 있는 postId와 동일한지
    }),
  });

  const {
    data: { title, comments, author, createdAt },
  } = useSuspenseQuery({
    ...postQueries.reflectionDetail(postId),
  });

  const { date, time } = convertDateToString(createdAt);

  const { countLike, mutateAsync: setLike, clicked } = useLike(postId!);

  const [isFold, setIsFold] = useState(false);

  const reflectionLists = [
    {
      title: '좋았던 일',
      content: title.content.favorite,
    },
    {
      title: '아쉬운 일',
      content: title.content.shame,
    },
    {
      title: '나에게 한마디',
      content: title.content.sayToMe,
    },
  ];

  const { isOpen, open, close, handleConfirm, message } = useConfirmModal();

  const { mutate: onDeletePost } = useDeleteCommentMutation();

  const onClickLike = async () => {
    const data = await setLike();
  };

  const settingsOption = [
    {
      text: '수정하기',
      show: isMyPost,
      confirmText: '수정하시겠습니까?',
      icon: <EditIcon />,
      onClick: () => {
        navigate({ to: `/board/reflection/post?id=${postId}` });
      },
    },
    {
      text: '삭제하기',
      show: isMyPost,
      confirmText: '삭제하시겠습니까?',
      icon: <DeleteIcon />,
      onClick: async () => {
        onDeletePost(
          { id: postId },
          {
            onSuccess: () => history.back(),
          },
        );
      },
    },
  ];

  const pageEndRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Post gap="30px">
        <Post.Header>{title.title}</Post.Header>
        <Flex>
          <UserContentBlock
            username={author.username}
            userImage={author.coverImage}
            content={`${date} ${time}`}
            onClick={() => navigate({ to: `/${author.username}` })}
          />
          {isMyPost && (
            <Settings>
              {settingsOption.map(
                ({ text, icon, onClick, confirmText, show }) => {
                  if (!show) {
                    return null;
                  }
                  return (
                    <Button
                      w="100%"
                      fontSize="1.3rem"
                      key={text}
                      onClick={() => open(onClick, confirmText || '')}
                    >
                      {icon}
                      <Text as="span" pl="5px">
                        {text}
                      </Text>
                    </Button>
                  );
                },
              )}
            </Settings>
          )}
        </Flex>
        <Post.Content>
          <Flex flexDir="column" gap="10px">
            {reflectionLists.map(({ title, content }) => {
              return <TextCard key={title} header={title} body={content} />;
            })}
          </Flex>
        </Post.Content>
        <Post.Footer justifyContent="space-between">
          <Flex>
            <TextIconButton
              TheIcon={MdFavoriteBorder}
              textContent={String(countLike)}
              boxSize="18px"
              iconColor={clicked ? 'pink' : 'gray400'}
              fontSize="1.2rem"
              fontWeight="normal"
              textColor="gray.800"
              textLocation="right"
              onClick={onClickLike}
            />
            <TextIconButton
              TheIcon={MdArticle}
              textContent={String(comments.length)}
              boxSize="18px"
              iconColor="gray400"
              fontSize="1.2rem"
              fontWeight="normal"
              textColor="gray.800"
              textLocation="right"
            />
          </Flex>
          {/* <Box>{calculateTimeDiff(createdAt)}</Box> */}
        </Post.Footer>
        <Button onClick={() => setIsFold(!isFold)}>
          {isFold ? '댓글 펼치기' : '댓글 접기'}
        </Button>
        {!!isFold &&
          comments.map((comment) => (
            <CommentListItem {...comment} key={comment.comment + id} />
          ))}
      </Post>
      {isOpen && (
        <Confirm
          onConfirm={handleConfirm}
          onCancel={close}
          comment={message || '진행하시겠습니까?'}
        />
      )}
      <Portal>
        <Box pos="absolute" top="5" left="5">
          <ArrowDownIcon
            color="gray.500"
            w="30"
            h="30"
            onClick={() => {
              pageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          ></ArrowDownIcon>
        </Box>
      </Portal>
    </>
  );
};

export default ReflectionDetail;
