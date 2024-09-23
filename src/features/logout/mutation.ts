import { useMutation } from '@tanstack/react-query';
import { api } from 'shared/openapi';

export const useLogOutMutation = () => {
  return useMutation({
    mutationFn: () => api.logout(),
  });
};
