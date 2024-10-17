import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authQueries } from 'entities/auth/api/auth.queries';
import supabaseClient from 'shared/supabase';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      supabaseClient.auth.signInWithPassword({ email, password }),
    onSuccess: (result) => {
      queryClient.setQueryData(authQueries.auth().queryKey, result);
    },
  });
};
