import { Box, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useSession } from 'entities/auth/SessionContext';
import { Suspense } from 'react';
import { timerQueries } from 'src/entities/timer/api/timer.queries';

import Dday from './ui/Dday/Dday';
import BoardListPreview from './ui/Preview/BoardListPreview';
import GuestProfile from './ui/Profile/GuestProfile';
import UserProfile from './ui/Profile/UserProfile';

const fallbackComponent = (
  <Box
    pos="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    textAlign="center"
  >
    게시판 정보 불러오는 중
  </Box>
);

const MainPage = () => {
  const { navigate } = useRouter();
  const { session: userInfo, signOut } = useSession();

  const { data, isLoading } = useQuery({
    ...timerQueries.getUserTimerList(userInfo?.user.id || ''),
    enabled: !!userInfo?.user.id,
    select: (data) => {
      if (data) {
        return data.reduce((sum, v) => {
          return sum + v.duration;
        }, 0);
      }
    },
  });

  return (
    <Box pos="relative">
      {userInfo == null ? (
        <GuestProfile />
      ) : (
        <UserProfile
          username={userInfo?.user.user_metadata.user_name}
          src={userInfo?.user.user_metadata.avatar_url}
        />
      )}
      {!isLoading && <div>현재까지 총 {data}초 동안 공부했습니다</div>}

      <div style={{ position: 'relative', height: '400px' }}>
        <Suspense fallback={fallbackComponent}>
          <BoardListPreview />
        </Suspense>
        <Button
          onClick={() => {
            signOut();
            navigate({ to: '/', replace: true });
          }}
        >
          로그아웃
        </Button>
      </div>
    </Box>
  );

  return (
    <>
      <GuestProfile />
      <Dday />
    </>
  );
};

//   return (
//     <Flex
//       position="relative"
//       w="100%"
//       flex="1"
//       margin="0 auto"
//       direction="column"
//     >
//       <MainPageBody>
//         {isLoggedIn ? (
//           <>
//             <UserProfile
//               username={data.user_name}
//               src={data.avatar_url || ''}
//             />
//             <Button onClick={async () => mutate()}>로그아웃</Button>
//             <Dday />
//             <Suspense fallback={<div>로딩중</div>}>
//               {/* <TimerCalender channelId={data._fullName.timerChannelId} /> */}
//               <BoardListPreview />
//             </Suspense>
//           </>
//         ) : (
//           <>
//             <GuestProfile />
//             <Dday />
//           </>
//         )}
//       </MainPageBody>
//     </Flex>
//   );
// };

// const MainPageBody = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   flex: 1;
//   padding: 20px ${DEFAULT_PAGE_PADDING};

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

export default MainPage;
