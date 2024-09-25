import { type FieldPath, type RegisterOptions, useForm } from 'react-hook-form';
import { REGEXP } from 'shared/constants/regexp';

import type { SignupFormData, SignupFormPath } from '../model/type';

export const useSignupForm = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    handleSubmit,
  } = useForm<SignupFormData>();

  const registerOptions = {
    email: {
      required: '이메일은 필수입니다',
      pattern: {
        value: REGEXP.email,
        message: '이메일 형식에 맞지 않습니다',
      },
    },
    password: {
      required: '비밀번호는 필수입니다',
      pattern: {
        value: REGEXP.password,
        message: '비밀번호 형식에 맞지 않습니다',
      },
    },
    passwordConfirm: {
      required: '비밀번호를 한번 더 입력해주세요',
      validate: (value: string) => {
        const { passwordConfirm } = getValues();
        return passwordConfirm === value || '비밀번호를 다시 확인해주세요';
      },
    },
    username: {
      required: '이름을 입력해주세요',
      pattern: {
        value: REGEXP.username,
        message: '이름 형식에 맞지 않습니다',
      },
    },
    fullName: {
      pattern: {
        value: REGEXP.fullName,
        message: '닉네임 형식에 맞지 않습니다',
      },
    },
  } satisfies Record<SignupFormPath, RegisterOptions>;

  const registerField = (name: FieldPath<SignupFormData>) =>
    register(name, registerOptions[name]);

  return { registerField, errors, handleSubmit, setError };
};
