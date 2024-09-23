import { queryOptions } from '@tanstack/react-query';
import { api } from 'shared/openapi';

import { NotificationModel } from '../model/notificationModel';

export const notificationQueries = {
  keys: {
    root: ['notification'] as const,
  },
  list_my: () => {
    return queryOptions({
      queryKey: [...notificationQueries.keys.root],
      queryFn: api.getNotification,
      select: (notifications) => {
        return notifications.map(
          (notification) => new NotificationModel(notification),
        );
      },
    });
  },
};
