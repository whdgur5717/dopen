import { queryOptions } from '@tanstack/react-query';
import { api } from 'shared/openapi';

export const userListQuery = {
  keys: {
    root: ['user_list'] as const,
  },

  userList({ offset, limit }: { offset?: number; limit?: number } = {}) {
    return queryOptions({
      queryKey: [...this.keys.root],
      queryFn: () => api.getUserList({ offset, limit }),
    });
  },
};
