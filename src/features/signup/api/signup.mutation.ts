import { useMutation } from '@tanstack/react-query';
import supabaseClient from 'shared/supabase';

import type { SignupFormData } from '../model/type';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password, username }: SignupFormData) => {
      return await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            user_name: username,
            avatar_url: '',
          },
        },
      });
    },
  });
};
