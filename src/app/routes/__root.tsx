import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import RootLayout from 'shared/layout/RootLayout';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => {
    return (
      <RootLayout>
        <ErrorBoundary fallbackRender={() => <div>에러임?</div>}>
          <Outlet />
        </ErrorBoundary>
      </RootLayout>
    );
  },
  notFoundComponent: () => {
    return (
      <div>
        <p>페이지를 찾을 수 없습니다</p>
      </div>
    );
  },
});
