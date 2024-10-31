import { useNavigate } from '@tanstack/react-router';
import { Button } from 'shared/ui/button';

import { MainProfile } from './MainProfile';

const GuestProfile = () => {
  const navigate = useNavigate();

  return (
    <MainProfile>
      <Button
        backgroundColor="accent.4"
        size="xl"
        onClick={() => navigate({ to: '/Login' })}
      >
        로그인
      </Button>
      <MainProfile.SubHeader>
        당신의 시간관리를 도와드립니다
      </MainProfile.SubHeader>
    </MainProfile>
  );
};

export default GuestProfile;
