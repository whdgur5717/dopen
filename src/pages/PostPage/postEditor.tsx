import { Button } from 'shared/ui/button';
import { Field } from 'shared/ui/field';
import { flex } from 'styled-system/patterns';

import { usePostForm } from './usePostForm';

const PostEditor = () => {
  const {
    form: { handleSubmit },
    register,
  } = usePostForm({
    defaultValues: { title: 'gd', content: '' },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div className={flex({ flexDir: 'column', gap: '5' })}>
        <Field.Root display="flex" gap="5">
          <Field.Label fontSize="3xl">컨텐츠</Field.Label>
          <Field.Input {...register('title')} />
        </Field.Root>
        <Field.Root display="flex" gap="5">
          <Field.Label fontSize="2xl">Post Content</Field.Label>
          <Field.Textarea {...register('content')} size="lg" />
        </Field.Root>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default PostEditor;
