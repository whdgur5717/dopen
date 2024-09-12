import { useSuspenseQuery } from '@tanstack/react-query';
import { postQueries } from 'entities/post/post.queries';
import GrassCalender from 'shared/ui/GrassCalender/GrassCalender';

interface LoginGrassBoxProps {
  channelId: string;
}

const TimerCalender = ({ channelId }: LoginGrassBoxProps) => {
  const { data } = useSuspenseQuery({
    ...postQueries.postList({ channelId }),
    select: (data) => {
      return data.map(({ title, createdAt }) => ({
        time: title,
        createdAt,
      }));
    },
  });

  return <GrassCalender data={data} />;
};

export default TimerCalender;
