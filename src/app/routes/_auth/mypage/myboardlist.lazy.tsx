import { createLazyFileRoute } from '@tanstack/react-router';
import MyBoardList from 'pages/MyPage/MyBoardList';

export const Route = createLazyFileRoute('/_auth/mypage/myboardlist')({
  component: () => <MyBoardList />,
});
