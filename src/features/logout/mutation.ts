import { useMutation } from '@tanstack/react-query';
import { logout } from 'shared/api/auth';

export const useLogOutMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
