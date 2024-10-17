import { createFileRoute } from '@tanstack/react-router';

// import BoardPage from 'pages/BoardPage';

export const Route = createFileRoute('/_auth/Board/_boardlayout/$boardName/')({
  pendingMs: 0,
  pendingMinMs: 0,
  component: () => <div>준비중입니다</div>,
});
