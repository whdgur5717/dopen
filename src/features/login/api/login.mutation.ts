import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { authQueries } from 'entities/auth/api/auth.queries';
import { LOGINID_SAVEKEY, LOGIN_TOKEN } from 'shared/constants/user';
import { login } from 'shared/openapi';
import { removeItem, setItem } from 'shared/utils/storage';

export const saveId = <T, U>(isSavedId: T, loginId: U) => {
  if (isSavedId) {
    // 체크박스 체크 시 - 아이디 로컬 스토리지에 저장
    setItem(LOGINID_SAVEKEY, loginId);
  } else {
    // 체크박스 미체크 시 - 아이디 로컬 스토리지에서 삭제
    removeItem(LOGINID_SAVEKEY);
  }
};
export const useLoginMutation = ({
  onSuccessFn,
  isSavedId,
}: {
  onSuccessFn?: () => void;
  onErrorFn?: (Error: AxiosError) => void;
  isSavedId: boolean;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      if (onSuccessFn) {
        saveId(isSavedId, result.user?.email);
        setItem(LOGIN_TOKEN, result.token);
        queryClient.setQueryData(authQueries.auth().queryKey, result.user);
        onSuccessFn();
      }
    },
  });
};
