/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HTMLInputTypeAttribute } from 'react';

import type { EditAccountInputPath } from './type';

export const editAccountInputFields = [
  {
    name: 'email',
    label: '이메일',
    type: 'text',
  },
  {
    name: 'username',
    label: '닉네임',
    type: 'text',
  },
  {
    name: 'image',
    label: '이미지',
    type: 'file',
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
  },
] as const satisfies {
  name: EditAccountInputPath;
  label: string;
  type: HTMLInputTypeAttribute;
}[];
