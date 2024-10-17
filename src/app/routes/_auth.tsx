import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import supabaseClient from 'shared/supabase';

export const Route = createFileRoute('/_auth')({
  component: () => {
    return <Outlet />;
  },
  loader: async () => {
    const { data } = await supabaseClient.auth.getSession();

    if (!data.session) {
      throw redirect({
        to: '/Login',
      });
    }
    return data.session.user;
  },
});
