// import { EditIcon } from '@chakra-ui/icons';
// import {
//   Button,
//   Flex,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Text,
//   Textarea,
//   VStack,
// } from '@chakra-ui/react';
// import { useSuspenseQuery } from '@tanstack/react-query';
// import { useNavigate, useParams } from '@tanstack/react-router';
// import { plainToInstance } from 'class-transformer';
// import { postQueries } from 'entities/post/post.queries';
// import { ReflectionFormModel } from 'features/post/model/postModel';
// import { getRecentEightDates } from 'shared/utils/getRecentEightDates';
// import { channelQueries } from 'src/entities/channel/api/channel.queries';

// import { useReflectionForm } from './model';

// const inputList = [
//   {
//     label: '한 줄 회고',
//     placeholder: '오늘 하루는 어땠나요?',
//     name: 'title',
//   },
//   {
//     label: '가장 좋았던 일',
//     placeholder: '오늘 가장 좋았던 일은 무엇인가요?',
//     name: 'favorite',
//   },
//   {
//     label: '아쉬웠던 일',
//     placeholder: '오늘 아쉬웠던 일은 무엇인가요?',
//     name: 'shame',
//   },
//   {
//     label: '나에게 한 마디',
//     placeholder: '수고한 나에게 하고싶은 말을 적어주세요',
//     name: 'sayToMe',
//   },
// ] as const;

const ReflectionPostEditPage = () => {
  return <div>준비중입니다</div>;
  // const { postId } = useParams({
  //   from: '/_auth/Board/_boardlayout/Reflection/$postId',
  // });
  // const { data } = useSuspenseQuery({
  //   ...postQueries.reflectionDetail(postId),
  // });
  // const { channel: reflectionChannel } = useSuspenseQuery({
  //   ...channelQueries.channelInfo('reflection'),
  // }); //TODO : 해당 로직 제거필요
  // const { registerField, handleSubmit, errors } = useReflectionForm(
  //   plainToInstance(ReflectionFormModel, data),
  // );
  // const navigate = useNavigate();
  // const onSuccessFn = () => {
  //   alert('글 등록 성공!');
  //   navigate({ to: '/Board/$boardName', params: { boardName: 'reflection' } });
  // };
  // const onSubmit = () => {};
  // return (
  //   <>
  //     <Flex flexDir="column" align="center" w="100%" flex={1}>
  //       {getRecentEightDates().map(({ date, day }, index) => (
  //         <Flex
  //           key={index}
  //           flexDir="column"
  //           justify="center"
  //           align="center"
  //           w="53px"
  //           h="70px"
  //           borderRadius="16px"
  //           bg={date === new Date().getDate() ? 'pink.100' : 'transparent'}
  //           color={date === new Date().getDate() ? 'pink.300' : 'inherit'}
  //           position="relative"
  //         >
  //           {date === new Date().getDate() && (
  //             <Text
  //               bg="pink.300"
  //               boxSize="6px"
  //               borderRadius="50%"
  //               position="absolute"
  //               top="8px"
  //             />
  //           )}
  //           <Text fontSize="1.8rem" fontWeight="bold">
  //             {date}
  //           </Text>
  //           <Text
  //             fontSize="1.2rem"
  //             color={date === new Date().getDate() ? 'pink.300' : 'gray800'}
  //           >
  //             {day}
  //           </Text>
  //         </Flex>
  //       ))}
  //     </Flex>
  //     <form
  //       style={{ width: '100%', flex: 1 }}
  //       onSubmit={handleSubmit(onSubmit)}
  //     >
  //       <VStack w="100%" bg="gray100" p="0 20px" spacing="14px" pt="47px">
  //         {inputList.map(({ label, name, placeholder }) => (
  //           <FormControl key={name} isInvalid={!!errors?.[name]?.message}>
  //             <FormLabel fontSize="1.6rem" fontWeight="bold">
  //               {label}
  //             </FormLabel>
  //             <Textarea
  //               id={name}
  //               p="10px"
  //               placeholder={placeholder}
  //               _placeholder={{ color: 'gray800' }}
  //               borderRadius="5px"
  //               bg="customWhite"
  //               wordBreak="break-all"
  //               h={name === 'title' ? '50px' : '100px'}
  //               resize="none"
  //               {...registerField(name)}
  //             />
  //             <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
  //           </FormControl>
  //         ))}
  //         <Button
  //           h="50px"
  //           mt="27px"
  //           mb="128px"
  //           w="100%"
  //           borderRadius="50px"
  //           fontSize="1.6rem"
  //           fontWeight="medium"
  //           color="white"
  //           bg="pink.300"
  //           _hover={{ bg: 'pink.400' }}
  //           type="submit"
  //         >
  //           글쓰기
  //           <EditIcon ml="5px" />
  //         </Button>
  //       </VStack>
  //     </form>
  //   </>
  // );
};

export default ReflectionPostEditPage;
