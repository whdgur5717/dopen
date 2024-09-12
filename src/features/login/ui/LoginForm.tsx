import { Checkbox, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useRouter } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { userListQuery } from 'entities/userList/api/userList.queries';
import { useLoginMutation } from 'features/login/api/login.mutation';
import { LoginFormData } from 'features/login/model/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LOGINID_SAVEKEY } from 'shared/constants/user';
import { Button, Form, Input } from 'shared/ui/FormControl';
import { isValueUniqueInArray } from 'shared/utils/isValueUniqueInArray';
import { getItem } from 'shared/utils/storage';

import { LOGIN_INPUT_LIST } from '../lib/loginInputList';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const router = useRouter();
  const inputBgColor = useColorModeValue('#F0F0F0F0', '#141414');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: getItem(LOGINID_SAVEKEY, ''),
      isSavedId: getItem(LOGINID_SAVEKEY, false) ? true : false,
    },
  });

  const onSuccessFn = () => {
    alert('로그인 성공');
    navigate({ to: (location.search as { redirect: string }).redirect || '/' });
  };

  const onErrorFn = (error: AxiosError) => {
    if (error.response?.status === 400) {
      setError(
        'password',
        { message: '비밀번호를 확인해주세요.' },
        { shouldFocus: true },
      );
    }
  };

  const { mutate } = useLoginMutation({
    onSuccessFn,
    onErrorFn,
    isSavedId: watch('isSavedId') ?? false,
  });

  const { data: userList } = useQuery({
    ...userListQuery.userList(),
    initialData: [],
  });

  const onLoginValid: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }) => {
    const isUserEmailCheck = isValueUniqueInArray(userList, 'email', email);
    if (isUserEmailCheck) {
      mutate({ loginRequest: { email, password } });
    } else {
      setError(
        'email',
        { message: '등록되지 않은 아이디입니다.' },
        { shouldFocus: true },
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onLoginValid)}>
      <ul style={{ marginBottom: '0px' }}>
        {LOGIN_INPUT_LIST.map(
          ({ name, type, required, placeholder, validate }) => (
            <li key={name}>
              <Input
                bgColor={inputBgColor}
                type={type}
                placeholder={placeholder}
                {...register(name, {
                  required,
                  ...validate,
                })}
              />
              <Text mt={2} color="pink.300" fontSize="sm" textAlign="left">
                {errors && errors[name] && errors[name]?.message}
              </Text>
            </li>
          ),
        )}
      </ul>

      <Flex alignItems="center" m="10px 0 25px">
        <Checkbox
          size="lg"
          colorScheme="red"
          id="emailRemember"
          iconSize="lg"
          {...register('isSavedId')}
        >
          <Text as="span" fontSize="sm" color="#666">
            아이디 저장하기
          </Text>
        </Checkbox>
      </Flex>
      <Button>로그인</Button>
      <Button
        type="button"
        style={{ backgroundColor: '#F5C6C2', marginTop: '18px' }}
        onClick={() => router.history.back()}
      >
        회원가입 하기
      </Button>
    </Form>
  );
};

export default LoginForm;
