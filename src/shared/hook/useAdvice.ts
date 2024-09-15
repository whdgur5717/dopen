import { queryOptions } from '@tanstack/react-query';
import { getAdvice } from 'shared/api/getAdvice';

export const useAdvice = () => {
  return queryOptions({
    queryKey: ['advice'],
    queryFn: getAdvice,
    refetchOnWindowFocus: true,
  });
};
