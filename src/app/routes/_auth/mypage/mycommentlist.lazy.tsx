import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/mypage/mycommentlist')({
  component: () => <div></div>,
});
