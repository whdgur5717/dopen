import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MYPOST_LIST, POST_DETAIL } from 'constants/queryKeys';
import { checkAuthenticated } from 'shared/api/auth/api';
import {
  ChannelPayload,
  createPost,
  editPost,
  getPostDetail,
  getPostListByChannel,
} from 'shared/api/post/api';
import { api } from 'shared/generated/test';
import { Post } from 'shared/types/domain';

interface PostDetailProps {
  id: string;
  enabled?: boolean;
}

interface PostingProps {
  onSuccessFn?: () => void;
}

export const useMyPostList = () => {
  return useQuery({
    queryKey: [MYPOST_LIST],
    queryFn: async () => {
      const { posts } = await checkAuthenticated();
      return posts;
    },
  });
};

export const usePostDetail = ({ id }: PostDetailProps) => {
  const { data, isSuccess } = useSuspenseQuery({
    queryKey: [POST_DETAIL, id],
    queryFn: async () => await getPostDetail(id),
    select: (data) => {
      if (!data) {
        throw new Error('해당하는 포스트가 존재하지 않습니다');
      } else {
        return data;
      }
    },
  });
  return { data: data!, isSuccess };
};

export const usePosting = ({ onSuccessFn }: PostingProps) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
    onError: () => {
      alert('글 등록 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};

export const useEditPost = ({ onSuccessFn }: PostingProps) => {
  return useMutation({
    mutationFn: editPost,
    onSuccess: () => onSuccessFn?.(),
    //인증관련 에러일때만 useBoundaryTrue로
  });
};

export const useFirstPost = ({
  channelId,
  offset = 0,
  limit = 1,
}: ChannelPayload) => {
  const {
    data = [],
    isError,
    isLoading,
  } = useQuery<Post[], AxiosError>({
    queryKey: [`${channelId}`],
    queryFn: async () => {
      return await getPostListByChannel({ channelId, offset, limit });
    },
  });

  const firstPost = data[0];
  const firstPostTitle = firstPost
    ? JSON.parse(firstPost.title).title
    : '등록된 글이 없습니다.';

  return { firstPostTitle, isError, isLoading };
};
