import { createLazyFileRoute } from '@tanstack/react-router';
import PostEditor from 'pages/PostPage/postEditor';

export const Route = createLazyFileRoute('/_auth/post/')({
  component: () => <PostEditor />,
});
