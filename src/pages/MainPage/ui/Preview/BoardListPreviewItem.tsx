import { Box, Flex } from '@chakra-ui/react';

interface BoardListPreviewItemProps {
  boardName: string;
  onClick: () => void;
  title: string;
}

const BoardListPreviewItem = ({
  boardName,
  onClick,
  title,
}: BoardListPreviewItemProps) => {
  return (
    <Flex alignItems="center" cursor="pointer" gap="5px" onClick={onClick}>
      <Box width="140px" fontSize="xl" fontWeight="medium">
        {boardName}
      </Box>
      <Box
        width="200px"
        fontSize="xl"
        fontWeight="medium"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {title}
      </Box>
    </Flex>
  );
};

export default BoardListPreviewItem;
