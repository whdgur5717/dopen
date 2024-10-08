import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ContentProps extends BoxProps {
  children?: ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <Box {...props} p="0 20px">
      {children}
    </Box>
  );
};

export default Content;
