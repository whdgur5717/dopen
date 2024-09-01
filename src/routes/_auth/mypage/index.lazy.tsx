import MyPage from '@/pages/MyPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/mypage/')({
  component: () => <MyPage />,
});
