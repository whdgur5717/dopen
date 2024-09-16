import {
  Avatar,
  type AvatarProps,
  Flex,
  type FlexProps,
  Text,
  type TextProps,
} from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

type RootProps = PropsWithChildren<FlexProps>;
const MainProfileRoot = ({ children, ...props }: RootProps) => {
  return (
    <Flex cursor="default" alignItems="center" w="100%" {...props}>
      {children}
    </Flex>
  );
};

type ThumbnailProps = PropsWithChildren<AvatarProps>;
const MainThumbnail = ({ children, ...props }: ThumbnailProps) => {
  return (
    <Avatar size="2xl" {...props}>
      {children}
    </Avatar>
  );
};

type HeaderProps = PropsWithChildren<TextProps>;
const MainHeander = ({ children, ...props }: HeaderProps) => {
  return (
    <Text as="h3" {...props}>
      {children}
    </Text>
  );
};

type SubHeaderProps = PropsWithChildren<TextProps>;
const MainSubHeader = ({ children, ...props }: SubHeaderProps) => {
  return <Text {...props}>{children}</Text>;
};

export const MainProfile = Object.assign(MainProfileRoot, {
  Thumbnail: MainThumbnail,
  Header: MainHeander,
  SubHeader: MainSubHeader,
});
