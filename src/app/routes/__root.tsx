import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { SessionProvider } from 'entities/auth/SessionContext';
import { ErrorBoundary } from 'react-error-boundary';
import RootLayout from 'shared/layout/RootLayout';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => {
    return (
      <RootLayout>
        <ErrorBoundary fallbackRender={() => <div>에러임?</div>}>
          <SessionProvider>
            <Outlet />
          </SessionProvider>
        </ErrorBoundary>
      </RootLayout>
    );
  },
  pendingComponent: () => {
    return <div>로딩중</div>;
  },

  notFoundComponent: () => {
    return (
      <div>
        <p>페이지를 찾을 수 없습니다</p>
      </div>
    );
  },
});
