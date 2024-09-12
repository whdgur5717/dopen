import { getRequest } from 'shared/axios/instance';
import type { Post, User } from 'shared/types/domain';

export const searchByUser = async (user: string) =>
  await getRequest<User>(`/search/users/${user}`);

export const searchByAllType = async (type: string) => {
  await getRequest<(User | Post)[]>(`/search/all/${type}`);
};
