import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { DEFAULT_WIDTH } from 'shared/constants/style';
import Footer from 'shared/ui/Footer';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      position="relative"
      direction="column"
      justify="center"
      w="100vw"
      h="100vh"
      maxW={DEFAULT_WIDTH}
      margin="0 auto"
      overflowY="auto"
      sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
    >
      {children}
      <Footer />
    </Flex>
  );
};
export default RootLayout;
