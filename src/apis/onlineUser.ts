import { getRequest } from '../shared/axios/instance';
import { User } from '../shared/types/domain';

export const getOnlineUsers = async () =>
  await getRequest<User[]>('/users/online-users');
