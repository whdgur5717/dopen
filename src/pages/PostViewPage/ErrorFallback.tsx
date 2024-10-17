import { Box, Button } from '@chakra-ui/react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { AxiosError } from 'axios';

interface ErrorFallbackProps {
  error: AxiosError;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const router = useRouter();

  if (error?.response?.status === 401) {
    return (
      <Box
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        textAlign="center"
        p="200px 0"
      >
        <Box width="100%" fontSize="2rem" mb="20px">
          권한이 없습니다
        </Box>
        <Button ml="20px" onClick={() => navigate({ to: '/Login' })}>
          로그인 화면으로 이동하기
        </Button>
      </Box>
    );
  }

  if (!error?.response) {
    return (
      <Box
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        textAlign="center"
        p="200px 0"
      >
        <Box width="100%" fontSize="2rem" mb="20px">
          에러가 발생했습니다
        </Box>
        <Button onClick={() => resetErrorBoundary()}>다시 시도하기</Button>
        <Button ml="20px" onClick={() => router.history.back()}>
          뒤로가기
        </Button>
      </Box>
    );
  }
};

export default ErrorFallback;
