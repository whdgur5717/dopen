import { authOptions } from '@/hooks/useAuth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: () => <Outlet />,

  beforeLoad: async ({ context, location }) => {
    const data = await context.queryClient.ensureQueryData({
      ...authOptions(),
      revalidateIfStale: true,
    });
    context.queryClient.fetchQuery({
      queryKey: ['test'],
      queryFn: () => {
        throw new Error();
      },
    });
    if (!data) {
      context.queryClient.cancelQueries({ queryKey: authOptions().queryKey });
      throw redirect({
        to: '/Login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
