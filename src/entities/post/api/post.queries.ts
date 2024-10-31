import { queryOptions } from '@tanstack/react-query';
import { client } from 'shared/supabase';

export const postQueries = {
  keys: {
    root: ['post'] as const,
    detail: (id: string) => ['post', id] as const,
  },

  post(id: string) {
    return queryOptions({
      queryKey: [...postQueries.keys.detail(id)],
      queryFn: async () => await client.post.getPost(id),
    });
  },
};
