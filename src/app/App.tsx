import { RouterProvider } from 'react-router-dom';
import '@fontsource/noto-sans-kr';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/pages/PostViewPage/ErrorFallback';
import { useQueryErrorResetBoundary } from 'react-query';
import { Spinner } from '@chakra-ui/react';
import { routes } from '@/routes/private';

const App = () => {
  // const { channelListData } = useChannelList();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={routes} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
