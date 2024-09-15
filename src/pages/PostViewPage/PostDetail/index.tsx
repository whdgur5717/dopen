// import Comments from 'components/Comment';
// import { useConfirmModal } from 'hooks/useConfirmModal';
// import { usePushNotification } from 'hooks/useNotificationList';
// import { useMyPostList, usePostDetail } from 'hooks/usePost';
// import { deletePost } from 'shared/api/post/api';
import { ArrowDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Image, Portal, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useRouter } from '@tanstack/react-router';
import { authQueries } from 'entities/auth/api/auth.queries';
import { postQueries } from 'entities/post/post.queries';
import { useLikeMutation } from 'features/like/api/like.mutation';
import { useDeletePostMutation } from 'features/post/api/post.mutation';
import { useRef, useState } from 'react';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import { useConfirmModal } from 'shared/hook/useConfirmModal';
import Confirm from 'shared/ui/Confirm';
import TextIconButton from 'shared/ui/TextIconButton';
import UserContentBlock from 'shared/ui/UserContentBlock';
import { calculateTimeDiff } from 'shared/utils/calculateTimeDiff';
import { convertDateToString } from 'shared/utils/convertDateToString';
import CommentList from 'src/components/Comment';

import Post from './Container';
import Settings from './Settings';

const PostDetail = () => {
  const { boardName, postId = '' } = useParams({
    from: '/_auth/Board/_boardlayout/$boardName/$postId',
  });
  const navigate = useNavigate();
  const { history } = useRouter();

  const [isFold, setIsFold] = useState<boolean>(false);

  const { data: myInfo } = useSuspenseQuery(authQueries.auth());

  const {
    data: { title, author, createdAt, comments, likes, image },
  } = useSuspenseQuery({
    ...postQueries.postDetail(postId),
  });

  const { date, time } = convertDateToString(new Date(createdAt));

  const { mutate } = useLikeMutation();
  const { mutateAsync: deletePost } = useDeletePostMutation();

  const { isOpen, open, close, handleConfirm, message } = useConfirmModal();

  const settingsOption = [
    {
      text: '수정하기',
      show: true,
      confirmText: '수정하시겠습니까?',
      icon: <EditIcon />,
      onClick: () => {
        navigate({ to: `/board/${boardName}/post?id=${postId}` });
      },
    },
    {
      text: '삭제하기',
      show: true,
      confirmText: '삭제하시겠습니까?',
      icon: <DeleteIcon />,
      onClick: async () => {
        await deletePost(postId!);
        history.back();
      },
    },
  ];

  const pageEndRef = useRef<HTMLDivElement | null>(null);

  const isMyPost = myInfo.posts?.some((post) => post._id === postId);
  const isLiked = likes.some((like) => like.user === myInfo._id);

  return (
    <>
      <Post gap="10px" pos="relative">
        <Flex flexDir="column" gap="10px">
          <Post.Header minH="30px">
            <Flex pos="relative" justifyContent="space-between">
              <Box>{title.title}</Box>
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
          </Post.Header>
          <UserContentBlock
            username={author.username}
            userImage={author.image}
            content={`${date} ${time}`}
            onImageClick={() => navigate({ to: `/${author.username}` })}
          />
          <Post.Content paddingTop="10px" paddingBottom="10px">
            <Image
              src={image}
              objectFit="cover"
              maxH="100%"
              // fallbackSrc="https://via.placeholder.com/150"
            />
            <Text fontSize="1.5rem">{title.content}</Text>
          </Post.Content>
          <Post.Footer justifyContent="space-between">
            <Flex>
              <TextIconButton
                TheIcon={MdFavoriteBorder}
                textContent={String(comments.length)}
                boxSize="18px"
                iconColor={isLiked ? 'pink' : 'gray.400'}
                fontSize="1.2rem"
                fontWeight="normal"
                textColor="gray.800"
                textLocation="right"
                onClick={() => mutate({ likePostRequest: { postId } })}
              />
              <TextIconButton
                TheIcon={MdArticle}
                textContent={String(comments.length)}
                boxSize="18px"
                iconColor="gray.400"
                fontSize="1.2rem"
                fontWeight="normal"
                textColor="gray.800"
                textLocation="right"
              />
            </Flex>
            <Box>{calculateTimeDiff(createdAt)}</Box>
          </Post.Footer>
        </Flex>
        <Button onClick={() => setIsFold(!isFold)} m="0 20px">
          {isFold ? '댓글 펼치기' : '댓글 접기'}
        </Button>
        {!isFold && <CommentList comments={comments} />}
      </Post>
      <div ref={pageEndRef} />
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

export default PostDetail;
