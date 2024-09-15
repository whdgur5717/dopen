import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { useCreatePostMutation } from 'features/post/api/post.mutation';
import { usePostForm } from 'features/post/model/usePostForm';
import { useState } from 'react';
import { DEFAULT_PAGE_PADDING } from 'shared/constants/style';

//여기는 정말 작성만 하는 페이지로
const PostEditPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const channelInfo = pathname.split('/')[2];

  const { data: channel } = useSuspenseQuery({
    ...channelQueries.channelInfo(channelInfo),
    staleTime: Infinity,
  });
  //현재 채널명을 통해 channelId를 불러와서 submit에 사용
  //채널의 데이터중에 id만 필요 -  id는 안바뀌는데 굳이 매번?
  //내부적으로 캐싱해놓는게 낫지않나?

  const { handleSubmit, errors, registerField } = usePostForm();

  const { mutate } = useCreatePostMutation();

  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="100vh"
      p={`10px ${DEFAULT_PAGE_PADDING}`}
      bg="gray100"
    >
      <form
        onSubmit={handleSubmit((data) => {
          mutate(
            { ...data, channelId: channel._id },
            {
              onSuccess: () => {
                navigate({ to: '/' });
              },
            },
          );
        })}
      >
        <FormControl isInvalid={!!errors?.title?.message}>
          <Input
            fontSize="1.8rem"
            fontWeight="bold"
            p="15px 5px"
            variant="flushed"
            focusBorderColor="black"
            placeholder="제목을 입력해주세요."
            _placeholder={{ color: 'gray800' }}
            {...registerField('title')}
          />
          <FormErrorMessage>
            {errors?.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <PostingImageFileBox>
          <label htmlFor="file">
            {image ? '이미지가 정상적으로 첨부되었습니다.' : '이미지 첨부하기'}
          </label>
          <Input
            type="file"
            id="file"
            accept="image/*"
            {...registerField('image')}
          />
        </PostingImageFileBox>
        <FormControl isInvalid={!!errors?.content?.message}>
          <Textarea
            h="388px"
            p="10px"
            fontSize="1.3rem"
            bg="customWhite"
            focusBorderColor="black"
            placeholder="내용을 입력하세요."
            {...registerField('content')}
            _placeholder={{ color: 'gray800' }}
          ></Textarea>
          <FormErrorMessage>
            {errors?.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          h="50px"
          mt="20px"
          borderRadius="100px"
          fontSize="1.6rem"
          fontWeight="medium"
          color="white"
          bg="pink.300"
          _hover={{ bg: 'pink.400' }}
        >
          <EditIcon ml="5px" />
        </Button>
      </form>
    </Flex>
  );
};

const PostingImageFileBox = styled.div`
  display: inline-block;
  height: 30px;
  margin: 20px 0;
  vertical-align: middle;
  width: 100%;
  border-radius: 20px;
  color: #999999;

  & > label {
    display: inline-block;
    padding: 5px;
    color: #000;
    font-size: 14px;
    font-weight: medium;
    text-align: center;
    vertical-align: middle;
    background-color: #ececec;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #c5c3c3;
    }
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

export default PostEditPage;
