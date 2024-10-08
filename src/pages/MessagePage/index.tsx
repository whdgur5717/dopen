import { Flex } from '@chakra-ui/react';
import Message from 'pages/MessagePage/Message';

const MessagePage = () => {
  return (
    <Flex flexDir="column" h="100%">
      <Message
        flexGrow="1"
        bgColor="gray300"
        overflowY="auto"
        paddingLeft="20px"
        paddingRight="20px"
      />
    </Flex>
  );
};

export default MessagePage;
