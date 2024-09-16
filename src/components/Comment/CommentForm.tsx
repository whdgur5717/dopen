import { Box, Image, Input, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCreateCommentMutation } from 'features/post/api/comment.mutation';

import { useCommentForm } from './useCommentForm';

interface CommentFormProps {
  postId: string;
}

export interface CommentInput {
  comment: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const { comment, handleSubmit, errors } = useCommentForm(postId);

  const { mutate } = useCreateCommentMutation();

  // useEffect(() => {
  //   if (!isSuccess) {
  //     return;
  //   }

  //   const scrollPosition = document.body.scrollHeight + 300;
  //   setTimeout(() => window.scrollTo(0, scrollPosition), 100);
  // }, [isSuccess]);

  return (
    <Box>
      <Form
        onSubmit={handleSubmit((data) =>
          mutate({ createCommentRequest: data }),
        )}
      >
        <Input
          resize="none"
          bgColor="gray200"
          w="100%"
          h="50px"
          mr="10px"
          borderRadius="5px"
          placeholder="댓글을 입력해주세요."
          id="comment"
          {...comment}
        />
        <Button>
          <Image src="/assets/send.svg" alt="comment send" />
        </Button>
      </Form>
      <Text mt="5px" fontSize="1.2rem" color="pink.300">
        {errors && errors['comment'] && errors['comment']?.message}
      </Text>
    </Box>
  );
};

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Button = styled.button``;

export default CommentForm;
