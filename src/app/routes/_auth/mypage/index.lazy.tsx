import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/mypage/')({
  component: () => <div>준비중입니다</div>,
});
