import { queryOptions } from '@tanstack/react-query';
import { plainToClass } from 'class-transformer';
import { UserDTO } from 'entities/auth/model/user.dto';
import { checkUserAuthentication } from 'shared/openapi';

export const authQueries = {
  keys: {
    root: ['my_info'] as const,
  },

  auth() {
    return queryOptions({
      queryKey: [...this.keys.root],
      queryFn: checkUserAuthentication,
      select: (data) => plainToClass(UserDTO, data),
    });
  },
};
