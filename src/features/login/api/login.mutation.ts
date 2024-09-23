import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authQueries } from 'entities/auth/api/auth.queries';
import { api } from 'shared/openapi';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.login(),
    onSuccess: (result) => {
      queryClient.setQueryData(authQueries.auth().queryKey, result.user);
    },
  });
};
