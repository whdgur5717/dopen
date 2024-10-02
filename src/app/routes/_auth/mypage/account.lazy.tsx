import { createLazyFileRoute } from '@tanstack/react-router';
import AccountPage from 'pages/AccountPage';

export const Route = createLazyFileRoute('/_auth/mypage/account')({
  component: () => <AccountPage />,
});
