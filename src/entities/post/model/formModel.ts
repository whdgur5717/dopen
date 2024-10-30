import { type Path, type RegisterOptions } from 'react-hook-form';

export type PostFormModel = {
  title: string;
  content: string;
};

export const validation = {
  title: {
    required: 'Title is required',
  },
  content: {
    required: 'Content is required',
  },
} satisfies Record<Path<PostFormModel>, RegisterOptions<PostFormModel>>;
