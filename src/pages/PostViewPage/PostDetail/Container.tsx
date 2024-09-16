import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Content from './Content';
import Footer from './Footer';
import Header from './Header';

interface PostProps extends FlexProps {
  children: ReactNode;
}

const PostContainer = ({ children, ...props }: PostProps) => {
  return (
    <Flex flexDir="column" gap="20px" {...props} flex={1}>
      {children}
    </Flex>
  );
};

const Post = Object.assign(PostContainer, { Header, Content, Footer });

export default Post;
