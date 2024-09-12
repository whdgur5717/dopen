import { checkAuthenticated } from '@/apis/authentication';
import { TComment } from '@/apis/type';
import { getUserInfo } from '@/apis/userInfo';
import { MY_COMMENT_LIST } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useMyComment = () => {
  return useQuery<TComment[]>({
    queryKey: [MY_COMMENT_LIST],
    queryFn: async () => {
      const { _id } = await checkAuthenticated();
      const userInfo = await getUserInfo(_id);

      const isCommentArray = (
        array: string[] | TComment[],
      ): array is TComment[] => {
        return array.length === 0 || typeof array[0] !== 'string';
      };

      if (!isCommentArray(userInfo.comments)) {
        throw new Error('반환 값이 일치하지 않습니다.');
      }

      return userInfo.comments;
    },
  });
};
