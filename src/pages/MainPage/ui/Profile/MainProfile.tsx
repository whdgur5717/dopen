import { type FlexProps, type TextProps } from '@chakra-ui/react';
import type { MouseEventHandler, PropsWithChildren } from 'react';
import { Avatar } from 'shared/ui/avatar';

type RootProps = PropsWithChildren<FlexProps>;
const MainProfileRoot = ({ children }: RootProps) => {
  return <div>{children}</div>;
};

type ThumbnailProps = {
  src?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const MainThumbnail = ({ src, onClick }: ThumbnailProps) => {
  return <Avatar src={src} onClick={onClick} color="gray.10" size="2xl" />;
};

type HeaderProps = PropsWithChildren<TextProps>;
const MainHeander = ({ children }: HeaderProps) => {
  return <div>{children}</div>;
};

type SubHeaderProps = PropsWithChildren<TextProps>;
const MainSubHeader = ({ children }: SubHeaderProps) => {
  return <div>{children}</div>;
};

export const MainProfile = Object.assign(MainProfileRoot, {
  Thumbnail: MainThumbnail,
  Header: MainHeander,
  SubHeader: MainSubHeader,
});
