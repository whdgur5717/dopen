import { getRequest, postRequest, putRequest } from 'shared/axios/instance';
import type { Conversation, Message } from 'shared/types/domain';

export const getMessageList = async () =>
  await getRequest<Conversation[]>('/messages/conversations');

export const getMessageListByUser = async (userId: string) =>
  await getRequest<Message[]>('/messages', {
    params: {
      userId,
    },
  });

interface SendMessagePayload {
  message: string;
  receiver: string;
}

export const sendMessage = async ({ message, receiver }: SendMessagePayload) =>
  await postRequest<Message, SendMessagePayload>('/messages/create', {
    message,
    receiver,
  });

export const checkMessage = async (sender: string) =>
  await putRequest('/messages/update-seen', { sender });
