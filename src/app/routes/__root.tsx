import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RootLayout from 'shared/layout/RootLayout';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

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
