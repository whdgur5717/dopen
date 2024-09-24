import { useMutation } from '@tanstack/react-query';
import type { UserModel } from 'entities/auth/model/user.dto';
import { api } from 'shared/openapi';

import type { EditAccountFormData } from '../model/type';

export const useEditAccountMutation = () => {
  return useMutation({
    mutationFn: async (
      formData: EditAccountFormData & UserModel['_fullName'],
    ) => {
      const { name, username, password, image, timerChannelId } = formData;

      // 1차 내 정보 변경
      await api.updateUserInfo({
        updateUserInfoRequest: {
          fullName: JSON.stringify({
            name,
            timerChannelId,
          }),
          username,
        },
      });
      // // 2차 비밀번호 변경
      await api.updateUserPassword({ updateUserPasswordRequest: { password } });

      // 3차 프로필 이미지 변경
      if (image) {
        await api.postUserProfileImg({
          image: image[0],
          isCover: false,
        });
      }
    },
  });
};
