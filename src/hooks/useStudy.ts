import { useQuery } from '@tanstack/react-query';
import { getPostListByChannel } from '@/apis/post';
import { STUDY_POST } from '@/constants/queryKeys';

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
