import { useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/apis/follow';
import { CREATE_FOLLOW, DELETE_FOLLOW } from '@/constants/queryKeys';

interface FollowProps {
  id: string;
  onSuccessFn?: () => void;
}

export const useCreateFollow = ({ id, onSuccessFn }: FollowProps) => {
  return useMutation({
    mutationKey: [CREATE_FOLLOW],
    mutationFn: async () => {
      await followUser(id);
    },

    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
};

export const useDeleteFollow = ({ id, onSuccessFn }: FollowProps) => {
  return useMutation({
    mutationKey: [DELETE_FOLLOW],
    mutationFn: async () => {
      await unfollowUser(id);
    },

    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
};
