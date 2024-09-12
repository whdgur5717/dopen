import { Flex, FlexProps } from '@chakra-ui/react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { DEFAULT_HEADER_HEIGHT } from 'shared/constants/style';

import TextIconButton from '../TextIconButton';
import { iconList } from './iconList';

const Footer = ({ ...props }: FlexProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentPageName = pathname?.split('/')[1] || '';

  return (
    <Flex
      pl="31px"
      pr="31px"
      justify="space-around"
      borderTop="1px solid"
      borderColor="gray.450"
      align="center"
      w="100%"
      h={DEFAULT_HEADER_HEIGHT}
      shrink="0"
      position="sticky"
      bottom="0"
      bgColor="gray50"
      {...props}
    >
      {iconList.map(({ icon, text, path }) => (
        <TextIconButton
          key={text}
          TheIcon={icon}
          textContent={text}
          onClick={() => navigate({ to: path })}
          {...(`/${currentPageName}` === path && {
            iconColor: 'pink.300',
            color: 'pink.300',
          })}
        />
      ))}
    </Flex>
  );
};

export default Footer;
