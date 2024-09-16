import { Box } from '@chakra-ui/react';
import type { CommentViewModel } from 'features/post/model/postModel';
import UserContentBlock from 'shared/ui/UserContentBlock';

const CommentListItem = ({ image, comment, author }: CommentViewModel) => {
  return (
    <Box p="10px 0" borderBottom="1px solid #D4D4D4">
      <UserContentBlock
        userImage={image}
        userImageSize="40px"
        username={author}
        content={comment}
        subContent={author ? '삭제' : ''}
        contentFontSize="1.4rem"
        ellipsis={0}
        padding={0}
        alignItems="none"
        cursor="default"
      />
    </Box>
  );
};

export default CommentListItem;
