import { AbsoluteCenter, Flex, FlexProps, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { messageQueries } from 'entities/message/api/messsage.queries';
import UserContentBlock from 'shared/ui/UserContentBlock';

interface MessageListProps extends FlexProps {
  myId: string;
}

const MyMessageList = ({ myId }: MessageListProps) => {
  const navigate = useNavigate();
  const { data: messageLogList } = useSuspenseQuery({
    ...messageQueries.list_my(myId),
  });

  return (
    <Flex flexDir="column" overflowY="auto">
      {messageLogList.length ? (
        messageLogList.map(
          ({ key, userImage, username, content, date, userId }) => {
            return (
              <UserContentBlock
                key={key}
                userImage={userImage}
                username={username}
                content={content}
                subContent={date}
                onClick={() => navigate({ to: `./${userId}` })}
                ellipsis={2}
              />
            );
          },
        )
      ) : (
        <AbsoluteCenter>
          <Text fontSize="1.5rem" as="b">
            표시할 알림이 없습니다
          </Text>
        </AbsoluteCenter>
      )}
    </Flex>
  );
};
export default MyMessageList;
