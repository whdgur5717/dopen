import { Flex } from '@chakra-ui/react';
import { useRouterState } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { DEFAULT_WIDTH } from 'shared/constants/style';
import Footer from 'shared/ui/Footer';
import MainHeader from 'shared/ui/MainHeader';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const a = useRouterState({ select: (state) => state.location });
  console.log(a);
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
      <MainHeader />
      {children}
      <Footer pos="absolute" />
    </Flex>
  );
};
export default RootLayout;
