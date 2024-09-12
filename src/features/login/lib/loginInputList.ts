import type { Path, RegisterOptions } from 'react-hook-form';
import { REGEXP } from 'shared/constants/regexp';

import { LoginFormData } from '../model/type';

export interface LoginInputProperty {
  name: Path<LoginFormData>;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  validate?: RegisterOptions<LoginFormData>;
}
const LOGIN_INPUT_VALIDATE = {
  email: {
    pattern: {
      value: REGEXP.email,
      message: '아이디를 이메일 형식으로 입력해주세요.',
    },
  },
  password: {},
};

export const LOGIN_INPUT_LIST: LoginInputProperty[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'text',
    required: true,
    placeholder: '이메일을 입력해주세요',
    validate: { ...LOGIN_INPUT_VALIDATE.email },
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 입력해주세요',
  },
];
