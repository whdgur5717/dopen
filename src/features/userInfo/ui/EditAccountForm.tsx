import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useLoaderData, useRouter } from '@tanstack/react-router';
import { authQueries } from 'entities/auth/api/auth.queries';
import { useEditAccountMutation } from 'features/userInfo/api/userInfo.mutation';
import { useEditAccountForm } from 'features/userInfo/lib/useEditAccountForm';
import { Button, Form, Input } from 'shared/ui/FormControl';
import { editAccountInputFields } from 'src/features/userInfo/model/editAccountInputFields';

import type { EditAccountFormData } from '../model/type';

const EditAccountForm = () => {
  const { _email, _fullName, _username, _image } = useLoaderData({
    from: '/_auth',
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const { registerField, errors, handleSubmit, watch } = useEditAccountForm({
    email: _email,
    username: _username,
    image: null,
  });

  const imageState = watch('image');

  const imagePreview =
    imageState === null ? _image : URL.createObjectURL(imageState[0]);

  const { mutate } = useEditAccountMutation();

  const onSubmitHandler = (data: EditAccountFormData) => {
    mutate(
      { ...data, ..._fullName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(authQueries.auth());
          router.history.back();
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <UnorderedList ml="0">
        <ListItem mb="30px" listStyleType="none">
          <Flex alignItems="center">
            <Box w="118px" h="118px" mr="32px">
              <Avatar w="118px" h="118px" src={imagePreview} />
            </Box>
            <Box w="calc(100% - 150px)">
              <ProfileUploadFileBox>
                <label htmlFor="file">프로필 이미지 업로드</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  {...registerField('image')}
                />
              </ProfileUploadFileBox>
              <Text
                fontSize="sm"
                color="gray.600"
                wordBreak="keep-all"
                mt="15px"
              >
                이미지 사이즈는 300x300 JPG, PNG, GIF 파일로 업로드 해주세요.
              </Text>
            </Box>
          </Flex>
        </ListItem>
        {editAccountInputFields.map(({ name, label, type }) => (
          <ListItem listStyleType="none" mb="15px" key={name}>
            <FormLabel htmlFor={name} fontSize="14px">
              {label}
            </FormLabel>
            <Input type={type} id={name} {...registerField(name)} />
            <Text mt={2} color="pink.300" fontSize="sm">
              {errors?.[name]?.message}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
      <Button>회원정보 수정</Button>
    </Form>
  );
};

const ProfileUploadFileBox = styled.div`
  display: inline-block;
  height: 42px;
  vertical-align: middle;
  width: 100%;
  border-radius: 20px;
  color: #999999;

  & > label {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    background-color: #f88585;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    cursor: pointer;
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

export default EditAccountForm;
