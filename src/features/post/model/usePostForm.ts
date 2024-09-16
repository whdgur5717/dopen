import { type Path, type RegisterOptions, useForm } from 'react-hook-form';

import type { PostFormModel } from './postModel';

export const registerOptions = {
  content: {
    required: '글의 내용은 필수 입니다.',
    setValueAs(value: string) {
      value.trim();
    },
    validate: (value) => value.trim() !== '' || '글의 내용은 필수 입니다.',
    minLength: {
      value: 1,
      message: '최소 1글자 이상 입력 해주세요.',
    },
    maxLength: {
      value: 500,
      message: '최대 500글자까지 입력 가능합니다.',
    },
  },
  title: {
    required: '글의 제목은 필수입니다.',
    validate: (value) =>
      value.trim() !== '' || '제목은 1글자 ~ 30글자까지 작성 가능합니다.',
    minLength: {
      value: 1,
      message: '최소 1글자 이상 입력 해주세요.',
    },
    maxLength: {
      value: 30,
      message: '최대 30글자까지 입력 가능합니다.',
    },
  },
  image: {},
} satisfies Record<Path<PostFormModel>, RegisterOptions>;

export const usePostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormModel>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      image: null,
      content: '',
    },
  });

  const registerField = (name: Path<PostFormModel>) =>
    register(name, registerOptions[name]);

  return { register, handleSubmit, errors, registerField };
};
