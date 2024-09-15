import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from '@tanstack/react-router';
import { validateUserInfo } from 'entities/form/lib/validateUserInfo';
import { USER_INPUT_LIST } from 'features/signup/lib/userInputList';
import { useUpdateUserInfoMutation } from 'features/userInfo/mutation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PROFILE_IMAGE_TYPES } from 'shared/constants/user';
import { Button, Form, Input } from 'shared/ui/FormControl';
import { UserInfoInput } from 'types/user';

//TODO : validate,input 관련 파일 어디에 위치할지 생각하기
interface UserInfoProps {
  image: string;
  email: string;
  fullName: string;
  username: string;
}

const UpdateUserInfo = ({
  image,
  email,
  fullName,
  username,
}: UserInfoProps) => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>(image || '');
  const router = useRouter();
  const inputBgColor = useColorModeValue('#F0F0F0F0', '#141414');

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<UserInfoInput>({
    defaultValues: {
      email,
      fullName,
      username,
    },
  });

  const onSuccess = () => {
    alert('회원정보 수정 완료');
    router.history.back();
  };

  const { mutate } = useUpdateUserInfoMutation({
    onSuccess,
    profileImageFile,
    newUserInfo: getValues(),
  });

  // 프로필 이미지 변경
  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      const fileType = file.type;

      if (PROFILE_IMAGE_TYPES[fileType]) {
        const profileImage = URL.createObjectURL(file);
        setProfilePreview(profileImage);
        setProfileImageFile(file);
      } else {
        alert('파일 형식이 올바르지 않습니다. 이미지 파일을 업로드해 주세요.');
        event.target.value = '';
      }
    }
  };

  const onUpdateUserInfoValid: SubmitHandler<UserInfoInput> = async (data) =>
    await validateUserInfo({ userData: data, setError, onSuccess: mutate });

  return (
    <Form
      style={{
        width: '100%',
        margin: '0 auto',
        height: '100vh',
        padding: '30px 20px',
      }}
      onSubmit={handleSubmit(onUpdateUserInfoValid)}
    >
      <UnorderedList ml="0">
        <ListItem mb="30px" listStyleType="none">
          <Flex alignItems="center">
            <Box w="118px" h="118px" mr="32px">
              <Avatar
                w="118px"
                h="118px"
                src={profilePreview ? profilePreview : ''}
              />
            </Box>
            <Box w="calc(100% - 150px)">
              <ProfileUploadFileBox>
                <label htmlFor="file">프로필 이미지 업로드</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={onProfileImageChange}
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
        {USER_INPUT_LIST.map(({ name, label, type, required, validate }) => (
          <ListItem listStyleType="none" mb="15px" key={name}>
            <FormLabel htmlFor={name} fontSize="14px">
              {label}
            </FormLabel>
            <Input
              bgColor={inputBgColor}
              type={type}
              id={name}
              required={name === 'email' ? false : required}
              disabled={name === 'email' ? true : false}
              {...register(name, {
                ...validate,
              })}
            />
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

export default UpdateUserInfo;
