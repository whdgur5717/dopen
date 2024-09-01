import { Flex } from '@chakra-ui/react';
import { DEFAULT_WIDTH } from '@/constants/style';
import { ReactNode } from 'react';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      position="relative"
      direction="column"
      justify="center"
      w="100vw"
      maxW={DEFAULT_WIDTH}
      height="100dvh"
      margin="0 auto"
      overflowY="auto"
      sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
    >
      {children}
    </Flex>
  );
};
export default PageLayout;
