import type { FieldPath } from 'react-hook-form';

export type EditAccountFormData = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  image: FileList | null;
};

export type EditAccountInputPath = FieldPath<EditAccountFormData>;
