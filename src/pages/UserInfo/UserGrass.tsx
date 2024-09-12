import { User } from '@/apis/type';
import Grass from '@/components/Grass';
import { useStudyPost } from '@/hooks/useStudy';
import { Box } from '@chakra-ui/react';

interface UserGrassProps {
  userInfo: User;
}

const UserGrass = ({ userInfo }: UserGrassProps) => {
  const { fullName: studyTimeData } = userInfo;
  const { timerChannelId } = JSON.parse(studyTimeData);
  const { studyPost = [] } = useStudyPost({ channelId: timerChannelId });

  const studyPosts = studyPost.map(({ title, createdAt }) => ({
    time: title,
    createdAt,
  }));

  return (
    <Box display="grid" placeItems="center" mt="40px" p="0 20px">
      <Grass timerPosts={studyPosts} />
    </Box>
  );
};

export default UserGrass;
