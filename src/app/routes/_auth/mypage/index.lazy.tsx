import { createLazyFileRoute } from '@tanstack/react-router';
import MyPage from 'pages/MyPage';

export const Route = createLazyFileRoute('/_auth/mypage/')({
  component: () => <MyPage />,
});
