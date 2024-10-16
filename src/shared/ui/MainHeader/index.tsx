import {
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdMailOutline,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineNotifications,
  MdOutlineSearch,
} from 'react-icons/md';
import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_PAGE_PADDING,
} from 'shared/constants/style';

const MainHeader = ({ ...props }: FlexProps) => {
  const { toggleColorMode } = useColorMode();
  const DarkModeIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);
  const DarkModeLogo = useColorModeValue(
    '/assets/dopenLogo.svg',
    '/assets/dopenWhiteLogo.svg',
  );

  // const navigate = useNavigate();

  const mainHeaderIconPath = [
    {
      icon: DarkModeIcon,
      description: 'toggleDarkMode',
      onClick: () => toggleColorMode(),
    },
    {
      icon: MdMailOutline,
      description: 'message',
      // onClick: () => navigate({ to: '/message' }),
    },
    {
      icon: MdOutlineSearch,
      description: 'search',
      // onClick: () => navigate({ to: '/Search' }),
    },
    {
      icon: MdOutlineNotifications,
      description: 'notification',
      // onClick: () => navigate({ to: '/notification' }),
    },
  ];

  return (
    <Flex
      w="100%"
      h={DEFAULT_HEADER_HEIGHT}
      justify="space-between"
      align="center"
      pr={DEFAULT_PAGE_PADDING}
      pl={DEFAULT_PAGE_PADDING}
      bg="customBgWhite"
      position="sticky"
      top="0"
      zIndex="10"
      {...props}
    >
      {/* 로고 들어갈 자리입니다. 로고 사이즈에 맞춰서 사용해주세요*/}
      <Image
        alt="dopen logo"
        w="130px"
        h={DEFAULT_HEADER_HEIGHT}
        src={DarkModeLogo}
      />
      <Flex gap="20px">
        {mainHeaderIconPath.map(({ icon, onClick, description }) => (
          <IconButton
            key={description}
            bg="transparent"
            size="md"
            aria-label={description}
            onClick={onClick}
            color="inherit"
            icon={<Icon as={icon} boxSize="icon" />}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default MainHeader;
