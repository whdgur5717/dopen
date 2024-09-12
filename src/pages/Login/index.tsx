import { Flex } from '@chakra-ui/react';
import LoginDivider from 'features/login/ui/LoginDivider';
import LoginForm from 'features/login/ui/LoginForm';
import LoginLogoTitle from 'features/login/ui/LoginLogoTitle';

const Login = () => {
  return (
    <Flex flexDir="column" w="100%" textAlign="center" p="0 20px">
      <div>로그인</div>
      <LoginLogoTitle />
      <LoginForm />
      <LoginDivider />
    </Flex>
  );
};

export default Login;
