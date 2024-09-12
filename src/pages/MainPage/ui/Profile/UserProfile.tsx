import { Flex } from '@chakra-ui/react';

import { MainProfile } from './MainProfile';

const UserProfile = ({
  src,
  username,
  text,
}: {
  src?: string;
  username: string;
  text?: string;
}) => {
  return (
    <MainProfile>
      <MainProfile.Thumbnail src={src} />
      <Flex direction="column" marginLeft="20px">
        <MainProfile.Header>안녕하세요 {username}님!</MainProfile.Header>
        <MainProfile.SubHeader>{text}</MainProfile.SubHeader>
      </Flex>
    </MainProfile>
  );
};

export default UserProfile;
