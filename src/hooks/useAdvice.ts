import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useAdvice = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['advice'],
    queryFn: async () => {
      return await axios
        .get('https://api.adviceslip.com/advice')
        .then((res) => res.data.slip.advice);
    },
  });

  return { data, isError, isLoading };
};
