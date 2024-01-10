import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import {
  changePassword,
  changeProfileImage,
  changeUserName,
} from '@/apis/userInfo';
import {
  checkAuthenticated,
  logIn,
  logOut,
  signUp,
} from '@/apis/authentication';

import { setItem } from '@/utils/storage';

import { MY_INFO } from '@/constants/queryKeys';
import { LOGIN_TOKEN } from '@/constants/user';

import { saveLoginId } from '@/pages/Login/saveLoginId';
import { UserInfoInput, UserResponse } from '@/types/user';

interface AuthProps {
  onSuccessFn?: () => void;
  onErrorFn?: (error: AxiosError) => void;
}

interface LogInPayload {
  email: string;
  password: string;
}

interface LoginProps extends AuthProps {
  isSavedId: boolean;
}
interface UpdateUserInfoProps extends AuthProps {
  profileImageFile: File | null;
  newUserInfo: UserInfoInput;
}

interface SignUpProps extends AuthProps {
  userInfo: UserInfoInput;
}

export const useLogin = ({ onSuccessFn, onErrorFn, isSavedId }: LoginProps) => {
  return useMutation<UserResponse, AxiosError, LogInPayload, unknown>(logIn, {
    onSuccess: (result) => {
      if (onSuccessFn) {
        saveLoginId(isSavedId, result.user?.email);
        setItem(LOGIN_TOKEN, result.token);
        onSuccessFn();
      }
    },
    onError: (error) => {
      if (onErrorFn) {
        onErrorFn(error);
      }
    },
  });
};

export const useLogOut = ({ onSuccessFn }: AuthProps) => {
  return useMutation(logOut, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
};

export const useSignUp = ({
  onSuccessFn,
  onErrorFn,
  userInfo,
}: SignUpProps) => {
  return useMutation(
    async () => {
      const { token } = await signUp({ ...userInfo });
      setItem(LOGIN_TOKEN, token);
    },
    {
      onSuccess: () => {
        if (onSuccessFn) {
          onSuccessFn();
        }
      },
      onError: (error: AxiosError) => {
        if (onErrorFn) {
          onErrorFn(error);
        }
      },
    },
  );
};

export const useUpdateInfo = ({
  onSuccessFn,
  profileImageFile,
  newUserInfo,
}: UpdateUserInfoProps) => {
  return useMutation(
    async () => {
      const { fullName, username, password } = newUserInfo;

      // 1차 내 정보 변경
      await changeUserName({ fullName, username });
      // // 2차 비밀번호 변경
      await changePassword(password);

      // 3차 프로필 이미지 변경
      if (profileImageFile && !(profileImageFile instanceof String)) {
        await changeProfileImage({
          image: profileImageFile,
          isCover: false,
        });
      }
    },
    {
      onSuccess: () => {
        if (onSuccessFn) {
          onSuccessFn();
        }
      },
    },
  );
};

export const useMyInfo = ({ onSuccessFn }: AuthProps = {}) => {
  return useQuery(MY_INFO, checkAuthenticated, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
  });
};