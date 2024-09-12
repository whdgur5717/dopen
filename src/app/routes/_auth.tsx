import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { authQueries } from 'entities/auth/api/auth.queries';

export const Route = createFileRoute('/_auth')({
  component: () => <Outlet />,
  beforeLoad: async ({ context, location }) => {
    const data = await context.queryClient.ensureQueryData({
      ...authQueries.auth(),
      revalidateIfStale: true,
    });
    if (!data) {
      context.queryClient.cancelQueries({
        queryKey: authQueries.auth().queryKey,
      });
      throw redirect({
        to: '/Login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
