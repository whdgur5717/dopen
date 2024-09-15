import { AbsoluteCenter, Flex, FlexProps, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { notificationQueries } from 'entities/nofitication/api/notification.queries';
import { useCheckNotificationMutation } from 'features/notify/api/mutation';
import {
  messageByTypes,
  useCheckNotification,
  useNotificationList,
} from 'hooks/useNotificationList';
import UserContentBlock from 'shared/ui/UserContentBlock';
import { calculateTimeDiff } from 'shared/utils/calculateTimeDiff';

interface NotificationListProps extends FlexProps {}

const NotificationList = ({ ...props }: NotificationListProps) => {
  const { data: myNotificationList } = useSuspenseQuery(
    notificationQueries.list_my(),
  );

  const { mutate } = useCheckNotificationMutation();

  return (
    <Flex flexDir="column" overflowY="auto" {...props}>
      {myNotificationList.length ? (
        myNotificationList.map(({ _id, type, author, date }) => {
          return (
            <UserContentBlock
              key={_id}
              username={author.username}
              content={messageByTypes[type]}
              subContent={calculateTimeDiff(date)}
              onClick={async () => {
                readNotificationMutate(author._id);
              }}
            ></UserContentBlock>
          );
        })
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

export default NotificationList;
