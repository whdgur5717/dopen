import type { CommentFormModel } from 'features/post/model/postModel';
import { useForm } from 'react-hook-form';

export const useCommentForm = (postId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormModel>({
    defaultValues: {
      postId,
      comment: '',
    },
  });

  const comment = register('comment', {
    required: true,
    maxLength: {
      value: 100,
      message: '최대 100자까지 작성 가능합니다',
    },
  });

  return { comment, handleSubmit, errors };
};
