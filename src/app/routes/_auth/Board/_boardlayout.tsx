import { Outlet, createFileRoute } from '@tanstack/react-router';
import WriteButton from 'pages/BoardPage/WriteButton';
import PageHeader from 'shared/ui/PageHeader/index';

export const Route = createFileRoute('/_auth/Board/_boardlayout')({
  component: () => (
    <div style={{ height: 'inherit' }}>
      <PageHeader pageName="test" />
      <Outlet />
      <WriteButton />
    </div>
  ),
});
