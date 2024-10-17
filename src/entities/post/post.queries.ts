/* eslint-disable @tanstack/query/exhaustive-deps */
import { queryOptions } from '@tanstack/react-query';
import { plainToInstance } from 'class-transformer';
import {
  PostModel,
  PostViewModel,
  ReflectionPostViewModel,
} from 'features/post/model/postModel';
import { api } from 'shared/openapi';

export const postQueries = {
  keys: {
    root: ['post'] as const,
    list: (channelId: string) =>
      [...postQueries.keys.root, 'list', channelId] as const,
    detail: (postId: string) =>
      [...postQueries.keys.root, 'detail', postId] as const,
    reflection: (postId: string) =>
      [...postQueries.keys.root, 'reflection', postId] as const,
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
      queryFn: async () => {
        return await api.getPostListByChannel({ channelId, offset, limit });
      },
      select: (data) => {
        return plainToInstance(PostViewModel, plainToInstance(PostModel, data));
      },
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    }),

  postDetail: (postId: string) =>
    queryOptions({
      queryKey: [...postQueries.keys.detail(postId)],
      queryFn: () => api.getPostByPostId({ postId }),
      select: (data) => {
        return plainToInstance(PostViewModel, plainToInstance(PostModel, data));
      },
    }),

  reflectionDetail: (postId: string) =>
    queryOptions({
      queryKey: [...postQueries.keys.reflection(postId)],
      queryFn: () => api.getPostByPostId({ postId }),
      select: (data) => {
        return plainToInstance(
          ReflectionPostViewModel,
          plainToInstance(PostModel, data),
        );
      },
    }),

  // getLatestPosts: () =>
  //   queryOptions({
  //     queryKey: ['latest'],
  //     queryFn: () => client.post.getPost(),
  //   }),
};
