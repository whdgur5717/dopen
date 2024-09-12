import PageHeader from '@/components/PageHeader';
import { useMyInfo } from '@/hooks/useAuth';
import { useGetUsersList } from '@/hooks/useUser';
import ErrorPage from '@/pages/404Page';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';
import { isValueUniqueInArray } from 'shared/utils/isValueUniqueInArray';

import UserInfoContainer from './UserInfoContainer';

const UserInfo = () => {
  const { username = '' } = useParams();
  const { data: myInfo } = useMyInfo();
  const { data: userList = [], isLoading } = useGetUsersList({});

  const isUserExist = isValueUniqueInArray(userList, 'username', username);
  const isSameUser = username === myInfo?.username;

  if (isLoading) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="118px" />
        <SkeletonText
          mt="30px"
          noOfLines={1}
          spacing="4"
          skeletonHeight="60px"
        />
      </Box>
    );
  }

  if (isUserExist === false && isSameUser === false) {
    return <ErrorPage />;
  }

  if (!myInfo) {
    return null;
  }

  return (
    <Box height="100vh">
      <PageHeader pageName={username} />
      <UserInfoContainer
        userList={userList}
        myInfo={myInfo}
        isSameUser={isSameUser}
        username={username}
      />
    </Box>
  );
};

export default UserInfo;
