import Account from '@/pages/MyPage/Account';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/mypage/account')({
  component: () => <Account />,
});
