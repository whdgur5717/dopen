import { useSuspenseQuery } from '@tanstack/react-query';
import { AuthQueries } from 'entities/auth/api/queries';

import UpdateUserInfo from '../UpdateUserInfo';

const Account = () => {
  const { data: myInfo } = useSuspenseQuery(AuthQueries.option());

  const { image, email, fullName, username } = myInfo;

  // const { name, timerChannelId } = JSON.parse(fullName);
  return (
    <UpdateUserInfo
      image={image}
      email={email}
      fullName={fullName}
      username={username}
    />
  );
};

export default Account;
