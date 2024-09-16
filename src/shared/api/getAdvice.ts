import { getRequest } from 'shared/axios/instance';

type Advice = {
  slip: {
    id: string;
    advice: string;
  };
};

export const getAdvice = async () =>
  await getRequest<Advice>('https://api.adviceslip.com/advice');
