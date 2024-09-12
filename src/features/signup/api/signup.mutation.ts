import { type MutationOptions, useMutation } from '@tanstack/react-query';
import { signup } from 'shared/api/auth';
import { createChannel } from 'shared/api/channel';

import { SignupResponse } from '../model/type';
import type { SignupFormData } from '../model/type';

type SignupMutationOptions = MutationOptions<SignupResponse>;
export const useSignupMutation = ({
  onSuccess,
  onError,
  signupFormData,
}: {
  onSuccess: SignupMutationOptions['onSuccess'];
  onError: SignupMutationOptions['onError'];
  signupFormData: SignupFormData;
}) => {
  return useMutation({
    mutationFn: async () => {
      const { username, fullName } = signupFormData;

      const { _id: id } = await createChannel(username);

      const data = await signup({
        ...signupFormData,
        fullName: JSON.stringify({ name: fullName, timerChannelId: id }),
      });

      return data;
    },
    onSuccess,
    onError,
    meta: {
      errorMessage: '회원가입 과정에서 오류가 발생했습니다.',
    },
  });
};
