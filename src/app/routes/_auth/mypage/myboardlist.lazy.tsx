import { createLazyFileRoute } from '@tanstack/react-router';
import MyPostList from 'pages/MyPostList';

export const Route = createLazyFileRoute('/_auth/mypage/myboardlist')({
  component: () => <MyPostList />,
});
