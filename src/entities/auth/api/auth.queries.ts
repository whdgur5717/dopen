import { queryOptions } from '@tanstack/react-query';
import supabaseClient from 'shared/supabase';

export const authQueries = {
  keys: {
    root: ['users'] as const,
    userInfo: (userId: string) => [...authQueries.keys.root, userId] as const,
    myInfo: () => [...authQueries.keys.root, 'me'] as const,
  },

  auth() {
    return queryOptions({
      queryKey: ['user'],
      queryFn: async () => {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error) {
          throw new Error(error.message);
        }
        if (data.session?.user) {
          const { data: user } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id);
          return user?.[0];
        }
        return null;
      },
    });
  },
};
