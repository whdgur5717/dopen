import { useRouter } from '@tanstack/react-router';
import { useSession } from 'entities/auth/SessionContext';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import { Button } from '~/components/ui/button';

import GrassSection from './ui/Grass/GrassSection';
import BoardListPreview from './ui/Preview/BoardListPreview';
import GuestProfile from './ui/Profile/GuestProfile';
import UserProfile from './ui/Profile/UserProfile';

const MainPage = () => {
  const { navigate } = useRouter();
  const { session: userInfo, signOut } = useSession();

  return (
    <div className={flex({ direction: 'column', gap: '10px' })}>
      {userInfo == null ? (
        <GuestProfile />
      ) : (
        <UserProfile
          username={userInfo.user.user_metadata.user_name}
          src={userInfo.user.user_metadata.avatar_url}
        />
      )}

      <div className={css({ height: '200px', minHeight: '200px' })}>
        <BoardListPreview />
      </div>

      <GrassSection id={userInfo?.user.id} />
      {userInfo != null && (
        <Button
          variant="outline"
          onClick={() => {
            signOut();
            navigate({ to: '/', replace: true });
          }}
        >
          로그아웃
        </Button>
      )}
    </div>
  );
};

export default MainPage;
