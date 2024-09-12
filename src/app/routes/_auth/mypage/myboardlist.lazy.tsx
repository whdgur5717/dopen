import MyBoardList from '@/pages/MyPage/MyBoardList';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/mypage/myboardlist')({
  component: () => <MyBoardList />,
});
