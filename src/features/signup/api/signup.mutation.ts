import { useMutation } from '@tanstack/react-query';
import { api } from 'shared/openapi';
import supabase from 'shared/supabase';

import type { SignupFormData } from '../model/type';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: supabase.auth.signUp,
    meta: {
      errorMessage: '회원가입 과정에서 오류가 발생했습니다.',
    },
  });
};
