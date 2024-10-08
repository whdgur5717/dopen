import {
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import MyModal, { MyModalProps } from 'shared/ui/common/MyModal';
import { setItem } from 'shared/utils/storage';

interface DdayModalInputTypes {
  dDayTitle: string;
  dDayDate: string;
}

interface DdayModalProps extends Pick<MyModalProps, 'isOpen' | 'onClose'> {
  setDday: Dispatch<SetStateAction<{ dDayTitle: string; dDayDate: string }>>;
}

const DdayModal = ({ isOpen, onClose, setDday }: DdayModalProps) => {
  const {
    register,
    resetField,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<DdayModalInputTypes>();

  const onSubmit = () => {
    setDday({
      dDayTitle: getValues('dDayTitle'),
      dDayDate: getValues('dDayDate'),
    });
    setItem('d-day', {
      dDayTitle: getValues('dDayTitle'),
      dDayDate: getValues('dDayDate'),
    });
    onClose();
  };

  const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <MyModal
      onClose={onClose}
      isOpen={isOpen}
      title="D-DAY"
      buttonText="D-day 등록하기"
      onButtonClick={handleSubmit(onSubmit)}
      isCentered
    >
      <form style={{ padding: '0 20px' }}>
        <FormControl isInvalid={!!errors.dDayTitle?.message}>
          <FormLabel htmlFor="dDayTitle" fontSize="1.4rem" pt="10px">
            D-Day 명을 작성해주세요.
          </FormLabel>
          <InputGroup>
            <Input
              id="dDayTitle"
              h="40px"
              p="0 18px"
              {...register('dDayTitle', {
                required: 'd-day 명을 작성해주세요!',
                minLength: {
                  value: 2,
                  message: '최소 2글자 이상 입력해주세요',
                },
                maxLength: {
                  value: 20,
                  message: '최대 20글자까지 가능합니다',
                },
              })}
            />
            <InputRightElement h="100%" right="18px">
              <CloseButton
                bg="gray.700"
                borderRadius="50%"
                color="white"
                onClick={() => resetField('dDayTitle')}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.dDayTitle?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.dDayDate?.message}>
          <FormLabel htmlFor="dDayDate" fontSize="1.4rem" pt="10px">
            날짜를 선택해주세요.
          </FormLabel>
          <Input
            id="dDayDate"
            type="date"
            p="0 18px"
            h="40px"
            w="150px"
            min={getTomorrow()}
            {...register('dDayDate', {
              required: 'd-day날짜를 기입해주세요',
            })}
          />
          <FormErrorMessage>{errors.dDayDate?.message}</FormErrorMessage>
        </FormControl>
      </form>
    </MyModal>
  );
};

export default DdayModal;
