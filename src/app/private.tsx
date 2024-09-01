import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import Account from '@/pages/MyPage/Account';
import MyCommentList from '@/pages/MyPage/MyCommentList';
import MyBoardList from '@/pages/MyPage/MyBoardList';
import MessagePage from '@/pages/MessagePage';
import MessageListPage from '@/pages/MessageListPage';
import PageLayout from '@/components/PageLayout';
import TimerPage from '@/pages/TimerPage';
import ErrorPage from '@/pages/404Page';
import SearchPage from '@/pages/SearchPage';
import BoardEnterPage from '@/pages/BoardEnterPage';
import NotificationPage from '@/pages/NotificationPage';
import PostViewPage from '@/pages/PostViewPage';
import UserInfo from '@/pages/UserInfo';
import PrivateRoute from '@/components/common/PrivateRoute';
import ReflectionViewPage from '@/pages/ReflectionViewPage';
import ReflectionPostEditPage from '@/pages/ReflectionPostEditPage';
import { QueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from '@/pages/PostViewPage/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

const Loading = () => {
  console.log('suspense');
  return <div></div>;
};

export const routes = (queryClient: QueryClient, reset) => {
  return createBrowserRouter([
    {
      element: <PageLayout />,

      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <SignUp /> },
        {
          path: '/mypage',
          element: <MyPage />,
        },
        {
          element: (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Loading />}>
                <PrivateRoute />
              </Suspense>
            </ErrorBoundary>
          ),
          children: [
            {
              path: '/mypage/account',
              element: <Account />,
            },
            { path: '/mypage/mycommentlist', element: <MyCommentList /> },
            { path: '/mypage/myboardlist', element: <MyBoardList /> },
            { path: '/message', element: <MessageListPage /> },
            { path: '/message/:userId', element: <MessagePage /> },
            {
              path: '/board/reflection/:postId',
              element: <ReflectionViewPage />,
            },
            { path: '/board/:boardName/:postId', element: <PostViewPage /> },
            { path: '/notification', element: <NotificationPage /> },
            { path: '/timer', element: <TimerPage /> },
          ],
        },
        { path: '/:username', element: <UserInfo /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/board', element: <BoardEnterPage /> },
        { path: '/board/reflection/post', element: <ReflectionPostEditPage /> },
        { path: '*', element: <ErrorPage /> },
        //   ...(channelListData?.map((board) => [
        //     { path: `/board/${board.name}`, element: <BoardPage /> },
        //     { path: `/board/${board.name}/post`, element: <PostEditPage /> },
        //   ]).flat() || []),
        // ],
      ],
    },
  ]);
};
export default routes;
