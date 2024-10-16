import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import {
  AbsoluteCenter,
  Flex,
  FlexProps,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import {
  MdArrowBackIos,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineNotifications,
  MdOutlineSearch,
} from 'react-icons/md';
import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
} from 'shared/constants/style';

interface PageHeaderProps extends FlexProps {
  pageName: string;
}

const PageHeader = ({ pageName, ...props }: PageHeaderProps) => {
  const router = useRouter();
  const goBack = () => router.history.back();

  const DarkModeIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);
  const { toggleColorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      h={DEFAULT_HEADER_HEIGHT}
      shrink="0"
      align="center"
      pl={DEFAULT_PAGE_PADDING}
      pr={DEFAULT_PAGE_PADDING}
      justify="space-between"
      top="0"
      bg="customBgWhite"
      position="sticky"
      zIndex="10"
      {...props}
    >
      <Flex w="69px" align="center" cursor="pointer" onClick={goBack}>
        <Icon as={MdArrowBackIos} boxSize="icon" />
        <Text fontSize="sm">뒤로가기</Text>
      </Flex>

      <AbsoluteCenter fontSize="lg" fontWeight="medium" axis="both">
        {pageName}
      </AbsoluteCenter>

      <Flex w="100px" justify="space-between">
        <IconButton
          color="inherit"
          aria-label="search"
          bg="transparent"
          onClick={toggleColorMode}
          icon={<Icon as={DarkModeIcon} boxSize="icon" />}
        />
        <IconButton
          color="inherit"
          aria-label="search"
          bg="transparent"
          icon={<Icon as={MdOutlineSearch} boxSize="icon" />}
        />
        <IconButton
          color="inherit"
          aria-label="notify"
          bg="transparent"
          icon={<Icon as={MdOutlineNotifications} boxSize="icon" />}
        />
      </Flex>
    </Flex>
  );
};

export default PageHeader;
