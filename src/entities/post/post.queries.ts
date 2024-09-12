/* eslint-disable @tanstack/query/exhaustive-deps */
import { queryOptions } from '@tanstack/react-query';
import { plainToInstance } from 'class-transformer';
import { PostModel, PostViewModel } from 'features/post/model/postModel';
import { getPostByPostId, getPostListByChannel } from 'shared/openapi';

export const postQueries = {
  keys: {
    root: ['post'] as const,
    list: (channelId: string) =>
      [...postQueries.keys.root, 'list', channelId] as const,
    detail: (postId: string) =>
      [...postQueries.keys.root, 'detail', postId] as const,
  },

  postList: ({
    channelId,
    offset = 0,
    limit = 0,
  }: {
    channelId: string;
    offset?: number;
    limit?: number;
  }) =>
    queryOptions({
      queryKey: [...postQueries.keys.list(channelId)],
      queryFn: () => getPostListByChannel({ channelId, offset, limit }),
      select: (data) => {
        return data.map((v) => plainToInstance(PostModel, v));
      },
      refetchOnWindowFocus: true,
    }),

  postDetail: (postId: string) =>
    queryOptions({
      queryKey: [...postQueries.keys.detail(postId)],
      queryFn: () => getPostByPostId({ postId }),
      select: (data) => {
        return plainToInstance(PostViewModel, plainToInstance(PostModel, data));
      },
    }),
};
