import type { RegisterOptions } from 'react-hook-form';

export interface ReflectionField {
  title: string;
  favorite: string;
  shame: string;
  sayToMe: string;
}

export interface ReflectionFieldProps {
  name: keyof ReflectionField;
  label: string;
  type: string;
  required: boolean | string;
  placeholder: string;
}

const ReflectionInputList: (ReflectionFieldProps | RegisterOptions)[] = [
  {
    name: 'title',
    label: '한 줄 회고',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '오늘 하루는 어땠나요?',
    validate: {
      maxLength: {
        value: 20,
        message: '최대 20글자까지 입력 가능합니다',
      },
    },
  },
  {
    name: 'favorite',
    label: '오늘 가장 좋았던 일',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '오늘 가장 좋았던 일은 무엇인가요?',
    validate: {
      minLength: {
        value: 1,
        message: '최소 1글자 이상 입력해주세요',
      },
      maxLength: {
        value: 300,
        message: '최대 300글자까지 입력 가능합니다',
      },
    },
  },
  {
    name: 'shame',
    label: '오늘 아쉬웠던 일',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '오늘 아쉬웠던 일은 무엇인가요?',
    validate: {
      minLength: {
        value: 1,
        message: '최소 1글자 이상 입력해주세요',
      },
      maxLength: {
        value: 300,
        message: '최대 300글자까지 입력 가능합니다',
      },
    },
  },
  {
    name: 'sayToMe',
    label: '나에게 한마디',
    type: 'text',
    required: '이 칸을 채워주세요',
    placeholder: '나에게 하고 싶은 말을 적어주세요',
    validate: {
      minLength: {
        value: 2,
        message: '최소 2글자 이상 입력해주세요',
      },
      maxLength: {
        value: 40,
        message: '최대 40글자까지 입력 가능합니다',
      },
    },
  },
];
