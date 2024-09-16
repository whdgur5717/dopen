import type { User } from 'shared/types/domain';

export interface SignupFormData {
  email: string;
  username: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
}

export interface SignupResponse {
  user: User;
  token: string;
}
