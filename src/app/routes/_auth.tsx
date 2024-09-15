import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { plainToInstance } from 'class-transformer';
import { authQueries } from 'entities/auth/api/auth.queries';
import { UserModel } from 'entities/auth/model/user.dto';

export const Route = createFileRoute('/_auth')({
  component: () => <Outlet />,
  loader: async ({ context, location }) => {
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
    return plainToInstance(UserModel, data);
  },
});
