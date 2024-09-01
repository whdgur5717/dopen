import { Flex } from '@chakra-ui/react';

import LoginLogoTitle from './LoginLogoTitle';
import LoginForm from './LoginForm';
import LoginDivider from './LoginDivider';

const Login = () => {
  // useEffect(() => {
  //   if (getItem(LOGIN_TOKEN, '')) {
  //     removeItem(LOGIN_TOKEN);
  //   }
  // }, []);

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
