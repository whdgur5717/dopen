import { type RegisterOptions, useForm } from 'react-hook-form';
import { REGEXP } from 'shared/constants/regexp';

import type { EditAccountFormData, EditAccountInputPath } from '../model/type';

export const useEditAccountForm = (
  defaultValues: Partial<EditAccountFormData>,
) => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EditAccountFormData>({ defaultValues });

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
      validate: {
        isEqual: (value) => {
          const { passwordConfirm } = getValues();
          return passwordConfirm === value;
        },
      },
    },
    username: {
      required: '닉네임을 입력해주세요',
      pattern: {
        value: REGEXP.username,
        message: '닉네임 형식에 맞지 않습니다',
      },
    },
    image: {},
  } satisfies Record<EditAccountInputPath, RegisterOptions>;

  const registerField = (name: EditAccountInputPath) =>
    register(name, registerOptions[name]);

  return { registerField, errors, handleSubmit, watch };
};
