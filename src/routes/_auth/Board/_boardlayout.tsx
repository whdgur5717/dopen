import PageHeader from '@/components/PageHeader';
import WriteButton from '@/pages/BoardPage/WriteButton';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/Board/_boardlayout')({
  component: () => (
    <div style={{ height: 'inherit' }}>
      <PageHeader pageName="test" />
      <Outlet />
      <WriteButton />
    </div>
  ),
});
