import { useMutation } from '@tanstack/react-query';
import supabaseClient from 'shared/supabase';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      supabaseClient.auth.signInWithPassword({ email, password }),
  });
};
