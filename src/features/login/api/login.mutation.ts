import { useMutation } from '@tanstack/react-query';
import supabaseClient from 'shared/supabase';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
