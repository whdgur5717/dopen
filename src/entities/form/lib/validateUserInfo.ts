import { UseFormSetError } from 'react-hook-form';
import { getUserList } from 'shared/api/user';
import { isValueUniqueInArray } from 'shared/utils/isValueUniqueInArray';

import { SignupFormData } from '../../../features/signup/model/type';

interface userInfoValidProps {
  userData: SignupFormData;
  setError: UseFormSetError<SignupFormData>;
  onSuccess: () => void;
}

export const validateUserInfo = async ({
  userData,
  setError,
  onSuccess,
}: userInfoValidProps): Promise<void> => {
  const { username, password, passwordConfirm } = userData;
  const userList = await getUserList({});

  // 중복 닉네임 체크
  const isUserNickNameCheck = isValueUniqueInArray(
    userList,
    'username',
    username,
  );

  if (isUserNickNameCheck) {
    setError(
      'username',
      { message: '동일한 닉네임이 존재합니다.' },
      { shouldFocus: true },
    );
    return;
  }

  // 비밀번호 일치 체크
  if (password !== passwordConfirm) {
    setError(
      'passwordConfirm',
      { message: '비밀번호가 일치하지 않습니다.' },
      { shouldFocus: true },
    );
    return;
  }

  // mutate
  onSuccess();
};
