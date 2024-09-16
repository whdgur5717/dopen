import { Box } from '@chakra-ui/react';

//TODO : localStorage에 데이터 저장해서 불러오기
const Dday = () => {
  return (
    <Box
      w="100%"
      margin="25px 0"
      bg="pink.300"
      borderRadius="5px"
      _hover={{ cursor: 'pointer', bg: '#eb7e7e' }}
    ></Box>
  );
};

export default Dday;
