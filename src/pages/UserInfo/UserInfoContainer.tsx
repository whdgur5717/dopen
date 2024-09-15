import { Box } from '@chakra-ui/react';

import UserFollowInfo from './UserFollowInfo';
import UserGrass from './UserGrass';
import UserProfile from './UserProfile';

interface UserInfoContainerProps {
  userList: User[];
  myInfo: User;
  isSameUser: boolean;
  username: string;
}

const UserInfoContainer = ({
  userList,
  myInfo,
  isSameUser,
  username,
}: UserInfoContainerProps) => {
  return <Box padding="25px 0"></Box>;
};

export default UserInfoContainer;
