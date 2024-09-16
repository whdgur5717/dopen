import { Spinner } from '@chakra-ui/react';
import PageHeader from 'components/PageHeader';
import { Suspense } from 'react';

import NotificationList from './NotificationList';

const NotificationPage = () => {
  return (
    <>
      <PageHeader pageName="알림" />
      <Suspense fallback={<Spinner />}>
        <NotificationList gap="10px" h="100vh" overflowY="auto" />
      </Suspense>
    </>
  );
};

export default NotificationPage;
