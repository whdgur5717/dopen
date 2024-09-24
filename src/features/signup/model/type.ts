import type { FieldPath } from 'react-hook-form';

export interface SignupFormData {
  email: string;
  username: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
}

export type SignupFormPath = FieldPath<SignupFormData>;
