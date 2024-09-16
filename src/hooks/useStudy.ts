import { useQuery } from '@tanstack/react-query';
import { STUDY_POST } from 'constants/queryKeys';
import { getPostListByChannel } from 'shared/api/post/api';

interface StudyProps {
  channelId: string;
}

export const useStudyPost = ({ channelId }: StudyProps) => {
  const { data } = useQuery({
    queryKey: [STUDY_POST],
    queryFn: async () => {
      if (!channelId) {
        return [];
      }
      return await getPostListByChannel({ channelId });
    },
  });

  return {
    studyPost: data,
  };
};
