import { SIGNUP_VALIDATION } from 'entities/form/lib/signup_validation';
import type { Path, RegisterOptions } from 'react-hook-form';

import type { SignupFormData } from '../model/type';

export interface SignUpInputProperty {
  name: Path<SignupFormData>;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  validate?: RegisterOptions<SignupFormData>;
}

export const USER_INPUT_LIST: SignUpInputProperty[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'text',
    required: true,
    placeholder: '이메일',
    validate: { ...SIGNUP_VALIDATION.email },
  },
  {
    name: 'fullName',
    label: '이름',
    type: 'text',
    required: true,
    placeholder: '이름',
    validate: { ...SIGNUP_VALIDATION.fullName },
  },
  {
    name: 'username',
    label: '닉네임',
    type: 'text',
    required: true,
    placeholder: '닉네임',
    validate: { ...SIGNUP_VALIDATION.username },
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    required: true,
    placeholder: '비밀번호',
    validate: { ...SIGNUP_VALIDATION.password },
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    required: true,
    placeholder: '비밀번호 확인',
  },
] as const;
