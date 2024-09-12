import { useSuspenseQuery } from '@tanstack/react-query';
import { authQueries } from 'entities/auth/api/auth.queries';

import MyMessageList from './ui/MyMessageList';

const MessageListPage = () => {
  const {
    data: { _id },
  } = useSuspenseQuery(authQueries.auth());

  return <MyMessageList myId={_id} />;
};

export default MessageListPage;
