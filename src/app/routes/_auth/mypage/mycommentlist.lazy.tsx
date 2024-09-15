import { createLazyFileRoute } from '@tanstack/react-router';
import MyCommentList from 'pages/MyPage/MyCommentList';

export const Route = createLazyFileRoute('/_auth/mypage/mycommentlist')({
  component: () => <MyCommentList />,
});
