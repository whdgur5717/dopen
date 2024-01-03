import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { Flex, FlexProps, HStack, Text, VStack } from '@chakra-ui/react';
import TextIconButton from '../common/TextIconButton';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';

interface PostListItemProps extends FlexProps {
  title: string;
  username: string;
  timeAgo: string;
  likeCount: number;
  commentCount: number;
}

const PostListItem = ({
  title,
  username,
  timeAgo,
  likeCount = 0,
  commentCount = 0,
  ...props
}: PostListItemProps) => {
  return (
    <Flex
      w={DEFAULT_WIDTH}
      h="67px"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      align="center"
      justify="space-between"
      cursor="pointer"
      {...props}
    >
      <VStack spacing="0" align="left">
        <Text
          color="black"
          fontSize="1.4rem"
          fontWeight="semibold"
          textOverflow="ellipsis"
          overflow="hidden"
          w="200px"
          whiteSpace="nowrap"
        >
          {title}
        </Text>
        <Text color="gray.800" fontSize="1.2rem" fontWeight="medium">
          {username}
        </Text>
        <HStack>
          <Text color="gray.600" fontSize="1.2rem">
            {timeAgo}
          </Text>
        </HStack>
      </VStack>
      <Flex flexDir="column" align="flex-start">
        <TextIconButton
          TheIcon={MdFavoriteBorder}
          textContent={likeCount.toString()}
          boxSize="18px"
          iconColor="pink.400"
          fontSize="1.2rem"
          fontWeight="normal"
          textColor="gray.800"
          textLocation="right"
        />
        <TextIconButton
          TheIcon={MdArticle}
          textContent={commentCount.toString()}
          boxSize="18px"
          iconColor="gray.800"
          fontSize="1.2rem"
          fontWeight="normal"
          textColor="gray.800"
          textLocation="right"
        />
      </Flex>
    </Flex>
  );
};

export default PostListItem;