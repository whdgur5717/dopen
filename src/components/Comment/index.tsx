import { CommentViewModel } from 'features/post/model/postModel';

import CommentListItem from './CommentListItem';

interface CommentListProps {
  comments: CommentViewModel[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments.map(({ comment, createdAt, author, image }, index) => {
        return (
          <CommentListItem
            key={comment + index}
            comment={comment}
            author={author}
            image={image}
            createdAt={createdAt}
          />
        );
      })}
    </>
  );
};

export default CommentList;
