import { getRequest, putRequest, postRequest } from './instance';
import { User } from './type';

export const getUserList = async ({
  offset,
  limit,
}: {
  offset?: number;
  limit?: number;
}) =>
  await getRequest<User[]>('users/get-users', {
    params: {
      offset,
      limit,
    },
  });

export const getOnlineUserList = async () =>
  await getRequest<User[]>('users/online-users');

export const getUserInfo = async (userId: string) =>
  await getRequest<User>(`users/${userId}`);

interface ChangeImagePayload {
  isCover?: boolean;
  image: BinaryData;
}

export const changeProfileImage = async (image: BinaryData) =>
  await postRequest<User, ChangeImagePayload>('/users/upload-photo', {
    isCover: false,
    image,
  });

export const changeCoverImage = async (image: BinaryData) =>
  await postRequest<User, ChangeImagePayload>('users/upload-photo', {
    isCover: true,
    image,
  });

interface Name {
  fullName: string;
  username: string;
}

//이름 이외의 데이터는 삽입할 수 없음
export const changeUserName = async ({ fullName, username }: Name) => {
  return await putRequest('/settings/update-user', { fullName, username });
};

//suc - Password updated successfully.
//기존 비밀번호와 같아도 감지하지는 못함
export const changePassword = async (password: string) => {
  return await putRequest('/settings/update-password', { password });
};
