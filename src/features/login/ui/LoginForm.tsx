import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { useLoginMutation } from 'features/login/api/login.mutation';
import { LoginFormData } from 'features/login/model/type';
import { SubmitHandler } from 'react-hook-form';
import { Button, Input } from 'shared/ui/FormControl';

import { loginInputFields } from '../lib/loginInputFields';
import { useLoginForm } from '../lib/useLoginForm';
import { loginStorageModel } from '../model/LoginStorageModel';

const LoginForm = () => {
  const {
    navigate,
    state: { location },
    history,
  } = useRouter();

  const { registerField, errors, setError, handleSubmit, isValid } =
    useLoginForm();

  const navigateLocation = () => {
    alert('로그인 성공');
    const searchParams = new URLSearchParams(location.href);
    const redirectUrl = searchParams.get('redirect') || '/';
    navigate({ to: redirectUrl });
  };

  const { mutate } = useLoginMutation();

  const onLogin: SubmitHandler<LoginFormData> = async (data) => {
    mutate(
      { loginRequest: { email: data.email, password: data.password } },
      {
        onSuccess: (res) => {
          loginStorageModel.setEmail(data.email);
          loginStorageModel.setToken(res.token);
          navigateLocation();
        },
        onError: (error) => {
          if (error.response?.status === 400) {
            setError(
              'password',
              { message: '비밀번호를 확인해주세요.' },
              { shouldFocus: true },
            );
          }
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <ul style={{ marginBottom: '0px' }}>
        {loginInputFields.map(({ name, type, placeholder }) => (
          <li key={name}>
            <label htmlFor={name}>{name}</label>
            <Input
              bgColor="grey.200"
              type={type}
              id={name}
              placeholder={placeholder}
              {...registerField(name)}
            />

            <Text
              mt={2}
              color="pink.300"
              fontSize="sm"
              textAlign="left"
              data-testid={name + 'errormessage'}
            >
              {errors && errors[name] && errors[name]?.message}
            </Text>
          </li>
        ))}
      </ul>

      <Flex alignItems="center" m="10px 0 25px">
        <Checkbox
          size="lg"
          colorScheme="red"
          id="emailRemember"
          iconSize="lg"
          {...registerField('keepLoggedIn')}
        >
          <Text as="span" fontSize="sm" color="#666">
            아이디 저장하기
          </Text>
        </Checkbox>
      </Flex>
      <button
        data-action="login"
        disabled={!isValid}
        name="login"
        role="button"
      >
        로그인
      </button>
      <Button
        data-action="signin"
        name="signin"
        style={{ backgroundColor: '#F5C6C2', marginTop: '18px' }}
        onClick={() => history.back()}
      >
        회원가입 하기
      </Button>
    </form>
  );
};

export default LoginForm;
