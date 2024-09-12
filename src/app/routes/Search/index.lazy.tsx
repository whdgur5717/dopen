import SearchPage from '@/pages/SearchPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/Search/')({
  component: () => <SearchPage />,
});
