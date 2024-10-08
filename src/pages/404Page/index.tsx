import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import MainHeader from 'shared/ui/MainHeader';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainHeader />
      <Flex w="100%" h="100vh" flexDirection="column" alignItems="center">
        <Image m="100px 0 30px 0" src="/assets/404.svg" alt="404 Error" />
        <Text cursor="default" fontSize="1.6rem" fontWeight="regular">
          죄송합니다. 해당 페이지를 찾을 수 없습니다.
        </Text>
        <Button
          w="100%"
          h="50px"
          fontSize="1.6rem"
          fontWeight="bold"
          color="white"
          bg="pink.300"
          mt="28px"
          borderRadius="50px"
          _hover={{ bg: 'pink.400' }}
          onClick={() => navigate({ to: '/' })}
        >
          메인으로 돌아가기
        </Button>
      </Flex>
    </>
  );
};

export default ErrorPage;
