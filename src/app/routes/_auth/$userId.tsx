import { createFileRoute, redirect } from '@tanstack/react-router';
import { authQueries } from 'entities/auth/api/auth.queries';

export const Route = createFileRoute('/_auth/$userId')({
  component: () => <div>Hello /_auth/$username!</div>,
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData({
      ...authQueries.userInfo(params.userId),
    });
    if (!data) {
      throw redirect({
        to: '/',
      });
    }
    return authQueries.userInfo(params.userId).select?.(data); //TODO : 데이터 빈값 내려올때 처리 필요
  },
});
