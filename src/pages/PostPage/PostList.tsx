import React from 'react';

import PostItem from './PostItem';

interface Post {
  category: string;
  title: string;
  author: string;
  time: string;
  likes?: number;
  comments?: number;
  content?: string;
}

const PostList: React.FC = () => {
  const posts: Post[] = [
    {
      category: '고민상담',
      title: '제목입니다.',
      author: '리자몽',
      time: '2일전',
      likes: 10,
      comments: 10,
    },
    {
      category: '',
      title: '제목입니다.',
      author: '리자몽',
      time: '2일전',
      content: '내용이에요 화면의 절반까지만 가능 합니다 멋지...',
    },
    {
      category: '고민상담',
      title: '제목입니다.',
      author: '리자몽',
      time: '2일전',
    },
    {
      category: '고민상담',
      title: '제목입니다.',
      author: '리자몽',
      time: '2일전',
    },
    {
      category: '고민상담',
      title: '제목입니다.',
      author: '리자몽',
      time: '2일전',
    },
    {
      category: '고민상담',
      title: '제목입니다.',
      author: '리자몽',
      time: '2일전',
    },
    {
      category: '고민상담',
      title: '제목입니다.',
      author: '리자몽',
      time: '2일전',
    },
  ];

  return (
    <section className="w-full max-w-[388px]">
      {posts.map((post, index) => (
        <React.Fragment key={index}>
          <PostItem post={post} />
          <div className="mt-1.5 flex h-px w-[388px] max-w-full shrink-0 bg-zinc-300" />
        </React.Fragment>
      ))}
      <div className="flex w-full max-w-[378px] gap-10 font-medium">
        <div className="flex w-fit shrink-0 grow basis-0 flex-col items-start">
          <div className="text-sm text-black">
            <span className="font-medium text-rose-400">[고민상담]</span>{' '}
            <span className="font-medium text-neutral-800">제목입니다.</span>
          </div>
          <div className="mt-1.5 text-xs text-stone-500">리자몽</div>
          <div className="flex w-full justify-between gap-5 self-stretch whitespace-nowrap">
            <div className="self-start text-xs text-neutral-400">2일전</div>
            <button className="flex gap-1.5 rounded-[100px] border border-solid border-red-200 bg-rose-400 px-8 py-3.5 text-base text-white">
              <span>글쓰기</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/ea334ec4275f4a1a8fbf2e9743064d37/7635e4639bead46b2f4d166a597359164ae3e24b0e21b2a48cbf1f3c81d12385?apiKey=ea334ec4275f4a1a8fbf2e9743064d37&"
                alt=""
                className="my-auto aspect-square w-5 shrink-0 rounded-none object-contain shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              />
            </button>
          </div>
        </div>
        <div className="mt-3 flex size-11 flex-col self-start whitespace-nowrap rounded-md bg-red-100 px-2.5 py-1.5 text-xs text-stone-500">
          <div className="self-center">0</div>
          <div>댓글</div>
        </div>
      </div>
    </section>
  );
};

export default PostList;
