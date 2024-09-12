import { getRequest, postRequest } from 'shared/axios/instance';
import type { User } from 'shared/types/domain';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const login = async ({ email, password }: LoginPayload) =>
  await postRequest<LoginResponse, LoginPayload>('/login', {
    email,
    password,
  });

interface SignupPayload extends LoginPayload {
  fullName: string;
  username: string;
}
//가입
export const signup = async ({
  email,
  password,
  fullName,
  username,
}: SignupPayload) =>
  await postRequest<LoginResponse, SignupPayload>('/signup', {
    email,
    password,
    fullName,
    username,
  });

//로그아웃
export const logout = async () => await postRequest('/logout');

//권한확인
export const checkAuthenticated = async (): Promise<User> =>
  await getRequest('/auth-user');
