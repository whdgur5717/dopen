import type { SignupFormPath } from '../model/type';

export interface SignUpInputProperty {
  name: SignupFormPath;
  label: string;
  type: string;
  placeholder: string;
}

export const signupInputFields: SignUpInputProperty[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'text',
    placeholder: '이메일',
  },
  {
    name: 'fullName',
    label: '이름',
    type: 'text',
    placeholder: '이름',
  },
  {
    name: 'username',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임',
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호',
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호 확인',
  },
] as const;
