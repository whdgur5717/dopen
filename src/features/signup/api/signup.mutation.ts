import { useMutation } from '@tanstack/react-query';
import { api } from 'shared/openapi';

import type { SignupFormData } from '../model/type';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (signupFormData: SignupFormData) => {
      const { username, fullName } = signupFormData;

      const { _id: id } = await api.createChannel({
        createChannelRequest: {
          authRequired: false,
          description: `${username} 님의 타이머입니다`,
          name: username,
        },
      });

      const data = await api.signup({
        signupRequest: {
          ...signupFormData,
          fullName: JSON.stringify({ name: fullName, timerChannelId: id }),
        },
      });

      return data;
    },
    meta: {
      errorMessage: '회원가입 과정에서 오류가 발생했습니다.',
    },
  });
};
