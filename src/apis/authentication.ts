import { getRequest, postRequest } from '@/apis/instance';
import { User } from '@/apis/type';

interface LogInPayload {
  email: string;
  password: string;
}

interface LogInResponse {
  user: User;
  token: string;
}

export const logIn = async ({ email, password }: LogInPayload) =>
  await postRequest<LogInResponse, LogInPayload>('/login', {
    email,
    password,
  });

interface SignUpPayload extends LogInPayload {
  fullName: string;
  username: string;
}

export const signUp = async ({
  email,
  password,
  fullName,
  username,
}: SignUpPayload) =>
  await postRequest<LogInResponse, SignUpPayload>('/signup', {
    email,
    password,
    fullName,
    username,
  });

export const logOut = async () => await postRequest('/logout');

export const checkAuthenticated = async (): Promise<User> =>
  await getRequest('/auth-user');

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const checkUserAuthentication = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const data = await checkAuthenticated();
        // if (!data) {
        //   reject(new AuthError('권한 없음'));
        // }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 5000); // 5초 (5000 밀리초) 지연
  });
};
//FIX : 현재 두 함수를 둘다 사용하는게있음
