import { Box, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useSignupMutation } from 'features/signup/api/signup.mutation';
import type { SignupFormData } from 'features/signup/model/type';
import { SignupResponse } from 'features/signup/model/type';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LOGIN_TOKEN } from 'shared/constants/user';
import { Button, Form, Input } from 'shared/ui/FormControl';
import { removeItem, setItem } from 'shared/utils/storage';

import { validateUserInfo } from '../../entities/form/lib/validateUserInfo';
import { USER_INPUT_LIST } from '../../features/signup/lib/userInputList';

const SignUp = () => {
  const navigate = useNavigate();
  const isSignedUp = useRef(false);

  const inputBgColor = useColorModeValue('#F0F0F0F0', '#141414');
  const dopenLogo = useColorModeValue(
    '/assets/dopenLogo.svg',
    '/assets/dopenWhiteLogo.svg',
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setError,
  } = useForm<SignupFormData>();

  const onSuccess = (data: SignupResponse) => {
    setItem(LOGIN_TOKEN, data.token);
    isSignedUp.current = true;
    alert('회원가입 성공');
    setTimeout(() => navigate({ to: '/' }));
  };

  const onError = (error: AxiosError) => {
    if (!error.response) {
      // response가 없는 에러의 경우
      alert(error.message);
    }
    if (error.response?.status === 400) {
      setError(
        'email',
        { message: '동일한 이메일이 존재합니다.' },
        { shouldFocus: true },
      );
    }
  };

  const { mutate } = useSignupMutation({
    onSuccess,
    onError,
    signupFormData: getValues(),
  });

  const onValid: SubmitHandler<SignupFormData> = async (data) =>
    await validateUserInfo({ userData: data, setError, onSuccess: mutate });

  useEffect(() => {
    const onBeforeUnload = () => {
      if (!isSignedUp.current) {
        removeItem(LOGIN_TOKEN);
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return (
    <Box w="100%" m="0 auto" textAlign="center" p="130px 20px">
      <Box mb={30}>
        <Heading mb={6}>
          <Image m="0 auto" w="198px" src={dopenLogo} alt="Dopen Logo" />
        </Heading>
        <Text fontSize="md">
          <Text as="span" mr={5}>
            이미 회원이신가요?
          </Text>
          <Link to="/Login" title="로그인하기" style={{ color: '#f88585' }}>
            로그인하기
          </Link>
        </Text>
      </Box>
      <Form onSubmit={handleSubmit((data) => onValid(data))}>
        <ul>
          {USER_INPUT_LIST.map(
            ({ name, type, required, placeholder, validate }) => (
              <li key={name}>
                <Input
                  bgColor={inputBgColor}
                  type={type}
                  placeholder={placeholder}
                  {...register(name, { required, ...validate })}
                />
                <Text mt={2} color="pink.300" fontSize="sm">
                  {errors && errors[name] && errors[name]?.message}
                </Text>
              </li>
            ),
          )}
        </ul>

        {isValid ? (
          <Button>가입하기</Button>
        ) : (
          <Button style={{ backgroundColor: '#A8A8A8' }}>가입하기</Button>
        )}
      </Form>
    </Box>
  );
};

export default SignUp;
