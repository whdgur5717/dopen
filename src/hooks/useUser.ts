import { useQuery } from '@tanstack/react-query';
import { getUserList } from '@/apis/userInfo';
import { USER_LIST } from '@/constants/queryKeys';

interface UserListProps {
  offset?: number;
  limit?: number;
}

export const useGetUsersList = ({ offset, limit }: UserListProps = {}) => {
  return useQuery({
    queryKey: [USER_LIST],
    queryFn: async () => {
      if (offset && limit) {
        return await getUserList({ offset, limit });
      }
      return await getUserList({});
    },
  });
};
