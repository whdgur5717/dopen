import { type PostFormModel, validation } from 'entities/post/model/formModel';
import { type Path, type UseFormProps, useForm } from 'react-hook-form';

export const usePostForm = (options: UseFormProps<PostFormModel>) => {
  const form = useForm<PostFormModel>({
    defaultValues: {
      title: '',
      content: '',
    },
    ...options,
  });
  const register = (name: Path<PostFormModel>) => {
    return form.register(name, validation[name]);
  };
  return { form, register };
};
