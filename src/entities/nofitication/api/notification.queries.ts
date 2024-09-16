import { queryOptions } from '@tanstack/react-query';
import { getNotification } from 'shared/openapi';

import { NotificationModel } from '../model/notificationModel';

export const notificationQueries = {
  keys: {
    root: ['notification'] as const,
  },
  list_my: () => {
    return queryOptions({
      queryKey: [...notificationQueries.keys.root],
      queryFn: getNotification,
      select: (notifications) => {
        return notifications.map(
          (notification) => new NotificationModel(notification),
        );
      },
    });
  },
};
