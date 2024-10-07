import { Box, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { Link, useRouter } from '@tanstack/react-router';
import { useSignupMutation } from 'features/signup/api/signup.mutation';
import { useSignupForm } from 'features/signup/lib/useSignupForm';
import { signupInputFields } from 'features/signup/lib/userInputList';
import type { SignupFormData } from 'features/signup/model/type';
import { Button, Form, Input } from 'shared/ui/FormControl';

const SignUp = () => {
  const { navigate } = useRouter();
  const inputBgColor = useColorModeValue('#F0F0F0F0', '#141414');
  const dopenLogo = useColorModeValue(
    '/assets/dopenLogo.svg',
    '/assets/dopenWhiteLogo.svg',
  );

  const { registerField, errors, handleSubmit, setError } = useSignupForm();

  const { mutate } = useSignupMutation();

  const onSignupHandler = (data: SignupFormData) => {
    mutate(data, {
      onSuccess() {
        alert('회원가입 성공');
        navigate({ to: '/' });
      },
      onError(error) {
        setError('email', { message: error.message }, { shouldFocus: true });
      },
    });
  };

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
      <Form onSubmit={handleSubmit((data) => onSignupHandler(data))}>
        <ul>
          {signupInputFields.map(({ name, type, placeholder }) => (
            <li key={name}>
              <Input
                bgColor={inputBgColor}
                type={type}
                placeholder={placeholder}
                {...registerField(name)}
              />
              <Text mt={2} color="pink.300" fontSize="sm">
                {errors && errors[name] && errors[name]?.message}
              </Text>
            </li>
          ))}
        </ul>
        <Button style={{ backgroundColor: '#A8A8A8' }}>가입하기</Button>
      </Form>
    </Box>
  );
};

export default SignUp;
