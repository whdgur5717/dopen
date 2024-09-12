import { getRequest, postRequest } from 'shared/axios/instance';
import type { Channel } from 'shared/types/domain';

export const getChannelList = async () =>
  await getRequest<Channel[]>('/channels');

/**channelName 값이 한글일 경우, 인코딩 필요**/
export const getChannel = async (channelName: string) =>
  await getRequest<Channel[]>(`/channels/${channelName}`);

type CreateChannelRequestBody = Pick<
  Channel,
  'authRequired' | 'description' | 'name'
>;
export const createChannel = async (username: string) =>
  await postRequest<Channel, CreateChannelRequestBody>('/channels/create', {
    authRequired: true,
    description: `${username}님의 타이머 채널입니다.`,
    name: `${username}`,
  });
