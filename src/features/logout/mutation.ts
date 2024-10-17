import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabaseClient from 'shared/supabase';
import { authQueries } from 'src/entities/auth/api/auth.queries';

export const useLogOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => supabaseClient.auth.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueries.auth().queryKey });
    },
  });
};
