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
import { PostFormModel } from 'features/post/api/model/postModel';
import { useCreatePostMutation } from 'features/post/api/post.mutation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DEFAULT_PAGE_PADDING } from 'shared/constants/style';

//여기는 정말 작성만 하는 페이지로
const PostEditPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const channelInfo = pathname.split('/')[2];

  const { data: channel } = useSuspenseQuery(
    channelQueries.channelInfo(channelInfo),
  );
  //채널이름을 가지고 채널 id를 불러오는듯?

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormModel>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      image: null,
      content: '',
    },
  });

  const { mutate } = useCreatePostMutation();
  const [model] = useState(new PostFormModel());
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
          mutate(model.submitFormData(data, channel._id), {
            onSuccess: () => {
              navigate({ to: '/' });
            },
          });
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
            {...register('title', {
              required: '글의 제목은 필수입니다.',
              validate: (value) =>
                value.trim() !== '' ||
                '제목은 1글자 ~ 30글자까지 작성 가능합니다.',
              minLength: {
                value: 1,
                message: '최소 1글자 이상 입력 해주세요.',
              },
              maxLength: {
                value: 30,
                message: '최대 30글자까지 입력 가능합니다.',
              },
            })}
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
            {...register('image')}
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
            {...register('content', {
              required: '글의 내용은 필수 입니다.',
              validate: (value) =>
                value.trim() !== '' || '글의 내용은 필수 입니다.',
              minLength: {
                value: 1,
                message: '최소 1글자 이상 입력 해주세요.',
              },
              maxLength: {
                value: 500,
                message: '최대 500글자까지 입력 가능합니다.',
              },
            })}
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
