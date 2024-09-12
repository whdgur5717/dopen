import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Expose, Transform, plainToInstance } from 'class-transformer';
import { MessageModel } from 'entities/message/model/log.ts';
import {
  CommentModel,
  CommentViewModel,
  PostModel,
  PostViewModel,
} from 'features/post/api/model/postModel.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MessageDTO } from 'src/entities/message/model/log';

import { routeTree } from './routeTree.gen.ts';
import { theme } from './theme/index.ts';

const queryClient = new QueryClient({});

// const router = createRouter({
//   routeTree,
//   context: { queryClient },
//   defaultPreload: 'intent',
//   defaultPreloadStaleTime: 0,
// });

// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router;
//   }
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {/* <RouterProvider router={router} /> */}
        <Test />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

export class PostFormModel {
  title: string;
  content: string;
  image: File | null;

  get defaultValue() {
    return { title: this.title };
  }

  submitFormData({ title, content, image }: PostFormModel, channelId: string) {
    return {
      title: JSON.stringify({ title, content }),
      image,
      channelId,
    };
  }
}

const dummyUser1 = {
  _id: 'user123',
  username: 'johndoe',
  image: 'https://example.com/avatar1.jpg',
};

const dummyUser2 = {
  _id: 'user456',
  username: 'janedoe',
  image: 'https://example.com/avatar2.jpg',
};

// 더미 Comment 데이터
const dummyComments = [
  {
    _id: 'comment1',
    comment: '이것은 첫 번째 댓글입니다.',
    author: dummyUser1,
    post: 'post123',
    createdAt: '2023-09-10T10:00:00Z',
    updatedAt: '2023-09-10T10:00:00Z',
  },
  {
    _id: 'comment2',
    comment: '좋은 글이네요!',
    author: dummyUser2,
    post: 'post123',
    createdAt: '2023-09-10T11:30:00Z',
    updatedAt: '2023-09-10T11:30:00Z',
  },
];

// 더미 Like 데이터
const dummyLikes = [
  {
    _id: 'like1',
    user: 'user123',
    post: 'post123',
    createdAt: '2023-09-10T12:00:00Z',
    updatedAt: '2023-09-10T12:00:00Z',
  },
  {
    _id: 'like2',
    user: 'user456',
    post: 'post123',
    createdAt: '2023-09-10T13:15:00Z',
    updatedAt: '2023-09-10T13:15:00Z',
  },
];

// 더미 Channel 데이터
const dummyChannel = {
  _id: 'channel1',
  name: '일반',
};

// 더미 Post 데이터
const dummyPost = {
  likes: dummyLikes,
  comments: dummyComments,
  _id: 'post123',
  image: 'https://example.com/image1.jpg',
  imagePublicId: 'public_id_123',
  title: JSON.stringify({
    title: '더미 포스트 제목',
    content:
      '이것은 더미 포스트의 내용입니다. 실제 콘텐츠는 여기에 들어갑니다.',
  }),
  channel: dummyChannel,
  author: dummyUser1,
  createdAt: '2023-09-10T09:00:00Z',
  updatedAt: '2023-09-10T14:00:00Z',
};

const postModel = plainToInstance(PostModel, dummyPost);
const postViewModel = plainToInstance(PostViewModel, postModel);
console.log(postViewModel);
// const commentModel = plainToInstance(CommentModel, dummyComments[0]);
// const commentViewModel = plainToInstance(CommentViewModel, commentModel);
// console.log(commentViewModel);
function Test() {
  return <div></div>;
}
