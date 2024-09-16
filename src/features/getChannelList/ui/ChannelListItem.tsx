import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { MdArrowForwardIos } from 'react-icons/md';

interface ChannelListItemProps extends FlexProps {
  name?: string;
}

const ChannelListItem = ({ name, ...props }: ChannelListItemProps) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      {...props}
    >
      <Text>{name}</Text>
      <MdArrowForwardIos />
    </Flex>
  );
};

export default ChannelListItem;
