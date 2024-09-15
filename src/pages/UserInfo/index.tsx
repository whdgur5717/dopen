import { useLoaderData, useParams } from '@tanstack/react-router';

import UserFollowInfo from './UserFollowInfo';
import UserGrass from './UserGrass';
import UserInfoContainer from './UserInfoContainer';
import UserProfile from './UserProfile';

const UserInfo = () => {
  const { username, image } = useLoaderData({
    from: '/_auth/$userId',
    select: (data) => ({
      username: data._username,
      image: data._image,
    }),
  });
  //현재 유저정보 페이지는 parmas로 닉네임을 넘김 - 이러면 찾기 힘드니까 userId로 넘기기

  return (
    <div>
      <UserProfile username={username} image={image} />
      <UserFollowInfo followInfo={userInfo ?? myInfo} />
      <UserGrass userInfo={userInfo ?? myInfo} />
    </div>
  );
};

export default UserInfo;
