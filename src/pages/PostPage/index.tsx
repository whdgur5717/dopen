import { useLoaderData } from '@tanstack/react-router';
import Card from 'shared/ui/Card';

const PostPage = () => {
  const data = useLoaderData({
    from: '/_auth/Board/_boardlayout/$boardName/$postId',
  });
  return (
    <Card>
      <Card.Header
        src={data.profiles?.avatar_url || ''}
        main={data.profiles?.user_name || ''}
        sub={data.created_at}
      />
      <Card.Content
        src="https://avatars.githubusercontent.com/u/30559508?v=4"
        content={data.content}
      />
    </Card>
  );
};

export default PostPage;
