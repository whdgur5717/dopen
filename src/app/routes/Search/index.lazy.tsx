import { createLazyFileRoute } from '@tanstack/react-router';
import SearchPage from 'pages/SearchPage';

export const Route = createLazyFileRoute('/Search/')({
  component: () => <SearchPage />,
});
