import { deleteRequest, postRequest } from 'shared/axios/instance';
import type { Follow } from 'shared/types/domain';

export const followUser = async (userId: string) =>
  await postRequest<Follow, { userId: string }>('/follow/create', {
    userId,
  });

export const unfollowUser = async (id: string) =>
  await deleteRequest<Follow, { id: string }>('/follow/delete', { id });
