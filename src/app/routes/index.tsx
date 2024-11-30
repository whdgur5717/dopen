import { createFileRoute } from '@tanstack/react-router';
import MainPage from 'pages/MainPage';
import MainLayout from 'pages/MainPage/Layout';

export const Route = createFileRoute('/')({
  component: () => (
    <MainLayout>
      <MainPage />
    </MainLayout>
  ),
});
