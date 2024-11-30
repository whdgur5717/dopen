import { type FieldPath, type RegisterOptions, useForm } from 'react-hook-form';
import { REGEXP } from 'shared/constants/regexp';

import type { LoginFormData } from '../model/type';

const registerOptions = {
  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value: REGEXP.email,
      message: '이메일 형식을 확인해주세요',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요',
    pattern: {
      value: REGEXP.password,
      message: '이메일 형식을 확인해주세요',
    },
  },
  keepLoggedIn: {},
} satisfies Record<keyof LoginFormData, RegisterOptions>;

export const useLoginForm = () => {
  const {
    formState: { errors, isSubmitting },
    reset,
    setError,
    handleSubmit,
    register,
  } = useForm<LoginFormData>();

  const registerField = (name: FieldPath<LoginFormData>) =>
    register(name, registerOptions[name]);

  return {
    errors,
    isSubmitting,
    reset,
    setError,
    handleSubmit,
    registerField,
  };
};
