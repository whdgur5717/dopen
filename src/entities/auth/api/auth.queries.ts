import { queryOptions } from '@tanstack/react-query';
import { plainToInstance } from 'class-transformer';
import { UserModel } from 'entities/auth/model/user.dto';
import { api } from 'shared/openapi';
import supabaseClient from 'shared/supabase';
import type { Database } from 'shared/supabase/database';

export const authQueries = {
  keys: {
    root: ['users'] as const,
    userInfo: (userId: string) => [...authQueries.keys.root, userId] as const,
    myInfo: () => [...authQueries.keys.root, 'me'] as const,
  },

  auth() {
    return queryOptions({
      queryKey: [...this.keys.myInfo()],
      queryFn: () => supabaseClient.auth.getUser(),
      select: ({ data }) =>
        data.user
          ?.user_metadata as Database['public']['Tables']['profiles']['Row'],
    });
  },

  userInfo(userId: string) {
    return queryOptions({
      queryKey: authQueries.keys.userInfo(userId),
      queryFn: () => api.getUserInfo({ userId }),
      select: (data) => plainToInstance(UserModel, data),
    });
  },
};
