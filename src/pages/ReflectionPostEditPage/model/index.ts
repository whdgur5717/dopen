// import { ReflectionFormModel } from 'features/post/model/postModel';
// import { type FieldPath, type RegisterOptions, useForm } from 'react-hook-form';

// type Path = FieldPath<ReflectionFormModel>;

// const registerOptions = {
//   title: {
//     required: '제목은 필수입니다',
//     maxLength: {
//       value: 30,
//       message: '최대 20글자까지 입력 가능합니다',
//     },
//   },
//   favorite: {
//     required: '잘한 점을 입력해주세요',
//     maxLength: {
//       value: 300,
//       message: '최대 300글자까지 입력 가능합니다',
//     },
//   },
//   shame: {
//     required: '아쉬웠던 점을 입력해주세요',
//     maxLength: {
//       value: 300,
//       message: '최대 300글자까지 입력 가능합니다',
//     },
//   },
//   sayToMe: {
//     required: '나에게 한 마디를 남겨주세요',
//     maxLength: {
//       value: 50,
//       message: '최대 300글자까지 입력 가능합니다',
//     },
//   },
// } satisfies Record<Path, RegisterOptions>;

// export const useReflectionForm = (defaultValues?: ReflectionFormModel) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ReflectionFormModel>({
//     defaultValues,
//   });

//   const registerField = (name: FieldPath<ReflectionFormModel>) =>
//     register(name, registerOptions[name]);

//   return { registerField, handleSubmit, errors };
// };
