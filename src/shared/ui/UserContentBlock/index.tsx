import {
  Avatar,
  AvatarBadge,
  Flex,
  FlexProps,
  Text,
  VStack,
} from '@chakra-ui/react';

interface UserContentBlockProps extends FlexProps {
  href?: string;
  userImage?: string;
  userImageSize?: string | number;
  username: string;
  usernameFontSize?: string | number;
  isOnline?: boolean;
  content: string;
  ellipsis?: number | number[];
  subContent?: string;
  contentFontSize?: string | number;
  onImageClick?: () => void;
  onSubContentClick?: () => void;
}

const UserContentBlock = ({
  userImage = '',
  userImageSize = '50px',
  username = '테스트용',
  usernameFontSize = '1.4rem',
  isOnline,
  content,
  ellipsis = 1,
  subContent,
  contentFontSize = '1.2rem',
  onSubContentClick,
  onImageClick,
  ...props
}: UserContentBlockProps) => {
  return (
    <Flex align="center" gap="17px" cursor="pointer" {...props}>
      <Avatar
        src={userImage}
        boxSize={
          userImageSize && typeof userImageSize === 'string'
            ? userImageSize
            : `${userImageSize}px`
        }
        boxShadow="0px 5px 15px -5px gray"
        cursor={onImageClick && 'pointer'}
        onClick={() => onImageClick && onImageClick()}
      >
        {isOnline && (
          <AvatarBadge
            boxSize="14px"
            border="2px solid white"
            bg="green.100"
            right="5%"
            bottom="5%"
          />
        )}
      </Avatar>
      <VStack flex="1" align="left">
        <Flex w="100%" position="relative">
          <Text
            fontWeight="semibold"
            fontSize={
              typeof usernameFontSize === 'string'
                ? usernameFontSize
                : `${usernameFontSize}px`
            }
          >
            {username}
          </Text>
          <Text
            fontSize="1.2rem"
            position="absolute"
            right="0"
            zIndex="normal"
            cursor={onSubContentClick && 'pointer'}
            onClick={(event) => {
              event.stopPropagation();
              onSubContentClick && onSubContentClick();
            }}
          >
            {subContent}
          </Text>
        </Flex>
        <Text
          fontSize={
            typeof contentFontSize === 'string'
              ? contentFontSize
              : `${contentFontSize}px`
          }
          wordBreak="break-all"
          noOfLines={ellipsis}
        >
          {content}
        </Text>
      </VStack>
    </Flex>
  );
};

export default UserContentBlock;
