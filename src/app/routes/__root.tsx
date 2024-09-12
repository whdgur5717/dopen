import PageLayout from '@/components/PageLayout';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
      <PageLayout>
        <ErrorBoundary fallbackRender={() => <div>에러임?</div>}>
          <TanStackRouterDevtools />
          <Outlet />
        </ErrorBoundary>
      </PageLayout>
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
