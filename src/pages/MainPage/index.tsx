import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { authQueries } from 'entities/auth/api/auth.queries';
import { Suspense } from 'react';
import { DEFAULT_PAGE_PADDING } from 'shared/constants/style';

import TimerCalender from './LoginGrassBox';
import Dday from './ui/Dday/Dday';
import UserProfile from './ui/Profile/UserProfile';

const MainPage = () => {
  const {
    data: {
      username,
      image,
      fullName: { timerChannelId },
    },
  } = useSuspenseQuery({
    ...authQueries.auth(),
  });

  const isLoggedIn = !!username;

  return (
    <Flex
      position="relative"
      w="100%"
      flex="1"
      margin="0 auto"
      direction="column"
    >
      <MainPageBody>
        {isLoggedIn ? (
          <>
            <UserProfile username={username} src={image || ''} />
            <Dday />
            <Suspense>
              <TimerCalender channelId={timerChannelId} />
            </Suspense>
          </>
        ) : null}
      </MainPageBody>
    </Flex>
  );
};

const MainPageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 20px ${DEFAULT_PAGE_PADDING};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MainPage;
