import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import UserProfileButton from './UserProfileButton';

interface UserProfileProps {
  image: string;
  username: string;
  isSameUser: boolean;
}
//팔로우 하는 로직을 넣어야함 - 여기에 넣어도 괜찮을거같음 - 그럼 이 사람에 대한 정보를 알아야될텐데
//본인일수도 있음
const UserProfile = ({ username, image, isSameUser }: UserProfileProps) => {
  return (
    <Flex alignItems="center" p="0 20px" mb="30px">
      <Box mr="15px">
        <Avatar src={image} w="118px" h="118px" />
      </Box>
      <Box w="calc(100% - 133px)">
        <Text as="h3" display="block" fontSize="3xl" mb="15px">
          {username}
        </Text>
        {!isSameUser && (
          <UserProfileButton
            isFollowing={isFollowing}
            followId={followId}
            userId={userId}
            onupdateFollowing={onupdateFollowing}
          />
        )}
      </Box>
    </Flex>
  );
};

export default UserProfile;
