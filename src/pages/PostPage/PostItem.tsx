import { Heart, MessageSquareText } from 'lucide-react';

// PostMeta.tsx
const PostMeta = ({ author, time }: { author: string; time: string }) => (
  <>
    <div className="mt-1.5 text-stone-500">{author}</div>
    <div className="text-neutral-400">{time}</div>
  </>
);

// PostTitle.tsx
const PostTitle = ({ title }: { title: string }) => (
  <h2 className="self-stretch text-sm text-black">{title}</h2>
);

// PostStats.tsx
const PostStats = ({
  likes,
  comments,
}: {
  likes?: number;
  comments?: number;
}) => {
  return (
    <div className="my-auto flex flex-col text-stone-500">
      {likes && (
        <div className="flex items-center gap-0.5">
          <Heart className="aspect-square w-[18px] shrink-0 object-contain" />
          <span>{likes || 0}</span>
        </div>
      )}
      {comments && (
        <div className="flex items-center gap-0.5">
          <MessageSquareText className="aspect-square w-[18px] shrink-0 object-contain" />
          <span>{comments || 0}</span>
        </div>
      )}
    </div>
  );
};

interface PostItemProps {
  title: string;
  author: string;
  time: string;
  content?: string;
  likes?: number;
  comments?: number;
}

const PostItem = ({
  title,
  author,
  time,
  content,
  likes,
  comments,
}: PostItemProps) => {
  return (
    <article className="flex w-full max-w-[378px] justify-between gap-5 text-xs font-medium">
      <div className="flex flex-col items-start">
        <PostTitle title={title} />
        <p className="mt-1 self-stretch text-stone-500">{content}</p>
        <PostMeta author={author} time={time} />
      </div>
      <PostStats likes={likes} comments={comments} />
    </article>
  );
};

export default PostItem;
