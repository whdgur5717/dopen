import { flex } from 'styled-system/patterns';

import { MainProfile } from './MainProfile';

const UserProfile = ({
  src,
  username,
}: {
  src?: string;
  username: string;
  text?: string;
}) => {
  return (
    <MainProfile>
      <MainProfile.Thumbnail src={src} />
      <div className={flex({ flexDir: 'column', gap: '5' })}>
        <MainProfile.Header>{username}님 안녕하세요</MainProfile.Header>
        <MainProfile.SubHeader>당신의 성장을 응원합니다</MainProfile.SubHeader>
      </div>
    </MainProfile>
  );
};

export default UserProfile;
