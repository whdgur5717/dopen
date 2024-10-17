import { Box } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { channelQueries } from 'entities/channel/api/channel.queries';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from 'shared/constants/style';

import ChannelListItem from './ChannelListItem';

const ChannelList = () => {
  const navigate = useNavigate();
  const { data: channelListData } = useSuspenseQuery(
    channelQueries.channelList(),
  );

  return (
    <Box w={DEFAULT_WIDTH} h="100vh" p={`0 ${DEFAULT_PAGE_PADDING}`}>
      {channelListData?.map((board) => (
        <ChannelListItem
          key={board.id}
          name={board.name!}
          fontSize="2rem"
          fontWeight="midium"
          p="10px"
          onClick={() => navigate({ to: `./${board.name}` })}
        />
      ))}
    </Box>
  );
};

export default ChannelList;
