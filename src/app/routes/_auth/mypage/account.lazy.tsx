import { createLazyFileRoute } from '@tanstack/react-router';
import Account from 'pages/MyPage/Account';

export const Route = createLazyFileRoute('/_auth/mypage/account')({
  component: () => <Account />,
});
