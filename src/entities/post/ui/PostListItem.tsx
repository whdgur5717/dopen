import {
  Flex,
  FlexProps,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdArticle, MdFavoriteBorder } from 'react-icons/md';
import { DEFAULT_PAGE_PADDING } from 'shared/constants/style';
import TextIconButton from 'shared/ui/TextIconButton';

interface PostListItemProps extends FlexProps {
  title?: string;
  author?: string;
  timeAgo?: string;
  likeCount?: number;
  commentCount?: number;
}

const PostListItem = ({
  title,
  author,
  timeAgo,
  likeCount = 0,
  commentCount = 0,
  ...props
}: PostListItemProps) => {
  const darModeColorGray800 = useColorModeValue('gray.800', 'gray.white.800');

  return (
    <Flex
      w="100%"
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
          fontSize="1.4rem"
          fontWeight="semibold"
          textOverflow="ellipsis"
          overflow="hidden"
          w="200px"
          whiteSpace="nowrap"
        >
          {title}
        </Text>
        <Text color={darModeColorGray800} fontSize="1.2rem" fontWeight="medium">
          {author}
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
          textLocation="right"
        />
        <TextIconButton
          TheIcon={MdArticle}
          textContent={commentCount.toString()}
          boxSize="18px"
          iconColor={darModeColorGray800}
          fontSize="1.2rem"
          fontWeight="normal"
          textLocation="right"
        />
      </Flex>
    </Flex>
  );
};

export default PostListItem;
