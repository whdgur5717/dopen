import { Box, Divider, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from '@tanstack/react-router';
import OnlineUserProfile from 'components/OnlineUserProfile';
import { DEFAULT_PAGE_PADDING } from 'constants/style';
import { useOnlineUserList } from 'hooks/useOnlineUserList';

const OnlineUsers = () => {
  const navigate = useNavigate();
  const { onlineUsersListData = [] } = useOnlineUserList();

  return (
    <Box w="100%" padding={`10px ${DEFAULT_PAGE_PADDING}`} overflow-x="auto">
      <Text fontSize="1.6rem" fontWeight="semibold" color="black" mb="10px">
        실시간 접속자
      </Text>
      {!onlineUsersListData.length ? (
        <Text fontSize="1.2rem" fontWeight="medium" cursor="default" mb="10px">
          접속 중인 사용자가 없습니다.
        </Text>
      ) : (
        <OnlineUsersBox>
          {onlineUsersListData.map((onlineUser) => (
            <OnlineUserProfile
              key={onlineUser._id}
              username={onlineUser.username}
              image={onlineUser.image}
              onClick={() => navigate({ to: `/${onlineUser.username}` })}
            />
          ))}
        </OnlineUsersBox>
      )}
      <Divider mt="13px" color="gray.450" />
    </Box>
  );
};

const OnlineUsersBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default OnlineUsers;
