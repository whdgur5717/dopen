import * as React from 'react';

import { IconButton } from './ui/IconButton';

const PostEditor = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col overflow-hidden border border-solid border-black bg-white pt-6">
      <div className="ml-3 flex w-full max-w-[363px] justify-between gap-5 self-center">
        <button className="my-auto text-xs text-neutral-800" tabIndex={0}>
          뒤로가기
        </button>
        <div className="text-base font-medium text-neutral-800">글쓰기</div>
        <div className="flex gap-5 self-start">
          <IconButton
            src="https://cdn.builder.io/api/v1/image/assets/ea334ec4275f4a1a8fbf2e9743064d37/8a00675c67e95181b8674a54a027382103a79254d611480d7ff970c650bf1393?apiKey=ea334ec4275f4a1a8fbf2e9743064d37&"
            alt="Action 1"
          />
          <IconButton
            src="https://cdn.builder.io/api/v1/image/assets/ea334ec4275f4a1a8fbf2e9743064d37/988aa2f60bbbea0bd4ebcc93d04e28f9ed13ee6fe2bfab312fc9cd8090738906?apiKey=ea334ec4275f4a1a8fbf2e9743064d37&"
            alt="Action 2"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex w-full flex-col bg-gray-100 px-5 pb-72 pt-5 font-bold text-neutral-300"
      >
        <label htmlFor="title" className="sr-only">
          제목
        </label>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력해주세요."
          className="ml-2.5 self-start border-none bg-transparent text-lg outline-none"
        />

        <div className="mt-1.5 flex h-px shrink-0 bg-neutral-800" />

        <button
          type="button"
          className="mt-4 rounded-[50px] bg-gray-200 px-16 py-1.5 text-center text-sm font-medium text-neutral-800"
          tabIndex={0}
        >
          이미지 첨부하기
        </button>

        <label htmlFor="content" className="sr-only">
          내용
        </label>
        <textarea
          id="content"
          placeholder="내용을 입력해주세요."
          className="mt-5 aspect-square resize-none rounded-md border border-solid border-neutral-800 bg-white px-2.5 pb-72 pt-3 text-sm"
        />
      </form>
    </div>
  );
};

export default PostEditor;
