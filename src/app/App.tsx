import { RouterProvider } from 'react-router-dom';
import '@fontsource/noto-sans-kr';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/pages/PostViewPage/ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
import { routes } from '@/routes/private';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  // const { channelListData } = useChannelList();

  const queryClient = new QueryClient({});
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      {/* <Suspense fallback={<Spinner />}> */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={routes(queryClient)} />
        </Suspense>
      </QueryClientProvider>
      {/* </Suspense> */}
    </ErrorBoundary>
  );
};

export default App;
