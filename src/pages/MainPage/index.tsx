import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { authQueries } from 'entities/auth/api/auth.queries';
import { Suspense } from 'react';
import { DEFAULT_PAGE_PADDING } from 'shared/constants/style';

import TimerCalender from './LoginGrassBox';
import Dday from './ui/Dday/Dday';
import GuestProfile from './ui/Profile/GuestProfile';
import UserProfile from './ui/Profile/UserProfile';

//여기는 현재 유저정보가 있냐없냐에 따라 나뉘어야됨
const MainPage = () => {
  const { data } = useQuery({
    ...authQueries.auth(),
  });

  const isLoggedIn = !!data;

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
            <UserProfile username={data._username} src={data._image || ''} />
            <Dday />
            <Suspense>
              <TimerCalender channelId={data._fullName.timerChannelId} />
            </Suspense>
          </>
        ) : (
          <>
            <GuestProfile />
            <Dday />
          </>
        )}
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
