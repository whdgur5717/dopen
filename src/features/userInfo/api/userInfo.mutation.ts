import { type MutationOptions, useMutation } from '@tanstack/react-query';
import {
  changePassword,
  changeProfileImage,
  changeUserName,
} from 'shared/api/user';

import type { UserInfo } from '../type';

type Props = {
  onSuccess: MutationOptions['onSuccess'];
  profileImageFile: File | null;
  newUserInfo: UserInfo;
};
export const useUpdateUserInfoMutation = ({
  onSuccess,
  profileImageFile,
  newUserInfo,
}: Props) => {
  return useMutation({
    mutationFn: async () => {
      const { fullName, username, password } = newUserInfo;

      const { name, timerChannelId } = JSON.parse(fullName);

      // 1차 내 정보 변경
      await changeUserName({
        fullName: JSON.stringify({
          name,
          timerChannelId,
        }),
        username,
      });
      // // 2차 비밀번호 변경
      await changePassword(password);

      // 3차 프로필 이미지 변경
      if (profileImageFile && !(profileImageFile instanceof File)) {
        await changeProfileImage({
          image: profileImageFile,
          isCover: false,
        });
      }
    },
    onSuccess,
  });
};
