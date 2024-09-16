import { Box } from '@chakra-ui/react';
import ChannelList from 'features/getChannelList/ui/ChannelList';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from 'shared/constants/style';

const BoardEnterPage = () => {
  return (
    <Box w={DEFAULT_WIDTH} h="100vh" p={`0 ${DEFAULT_PAGE_PADDING}`}>
      <ChannelList />
    </Box>
  );
};

export default BoardEnterPage;
